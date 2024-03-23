<template>
  <LogoContainer />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
      Acompanhar Pedidos
    </h1>
    <div class="grid grid-cols-12 items-center mb-2">
      <div class="col-start-6 md:col-start-10 col-end-13">
        <SearchInput id="OrdersSearch" v-model="search" placeholder="Digite o pedido..." @keyup.stop="filter()" />
      </div>
    </div>
    <div v-show="foundOrder !== 0" ref="listEl" class="p-5 max-h-[600px] bg-white shadow-md rounded mb-3 overflow-x-auto">
      <div v-for="(item) in filteredList" :key="item" class="p-5 bg-white shadow-md rounded mb-3">
        <OrderDetail :show-label="false" :order="item" />
      </div>
    </div>
    <CardNotFound :found="foundOrder" label="Nenhum pedido encontrado!" />
  </div>
  <ServiceWorker :user="user" />
</template>

<script setup>
import { ref } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';
import { jwtDecode } from "jwt-decode";
import OrderService from '../services/OrderService';
import CardNotFound from './CardNotFound.vue';
import SearchInput from './SearchInput.vue';
import OrderDetail from './OrderDetail.vue';
import LogoContainer from './LogoContainer.vue';
import ServiceWorker from './ServiceWorker.vue';

const search = ref('');
const orderList = ref([]);
const filteredList = ref([]);
const foundOrder = ref(1);
const listEl = ref(null);
const itemsToShow = ref(10);
const page = ref(0);
const stopQuery = ref(false);
const user = ref(null);

function getUser() {
  let tokenDecoded = null;
  if (localStorage.getItem('jwt') !== null) {
    const token = JSON.parse(localStorage.getItem('jwt')).value;
    tokenDecoded = jwtDecode(token);
  }
  return tokenDecoded;
}

const getDataOnScroll = async () => {
  if (!stopQuery.value) {
    page.value += itemsToShow.value;
    const newData = ref(await OrderService.getOrderID(JSON.stringify({
      account_id: user.value.account_id, limit: itemsToShow.value, offset: page.value,
    })));

    if (newData.value) {
      newData.value.forEach(async (order) => {
        // eslint-disable-next-line no-param-reassign
        order.statuses = [];
        const statusResponse = await OrderService.getOrderStatuses(order.order_id);
        statusResponse.map((element) => order.statuses.push(element));

        // eslint-disable-next-line no-param-reassign
        order.products = [];
        const orderProductResponse = await OrderService.getOrderProducts(order.order_id);
        orderProductResponse.map((element) => order.products.push(element));

        order.products.forEach(async (product) => {
          // eslint-disable-next-line no-param-reassign
          product.additionals = [];
          // eslint-disable-next-line vue/max-len
          const orderProductAdditional = await OrderService.getOrderProductAdditionals(product.order_product_id);
          orderProductAdditional.map((element) => product.additionals.push(element));
        });
      });
    }

    if (newData.value.length === 0 || newData.value === false) {
      stopQuery.value = true;
    }
    orderList.value.push(...newData.value);
    filteredList.value = orderList.value;
  }
};

useInfiniteScroll(
  listEl,
  async () => {
    await getDataOnScroll();
  },
  { distance: 10 },
);

function thereIsOrders(obj) {
  foundOrder.value = Object.values(obj).length;
}

const loadData = async () => {
  user.value = getUser();
  orderList.value = await OrderService.getOrderID(JSON.stringify({
    account_id: user.value.account_id, limit: itemsToShow.value, offset: page.value,
  }));

  orderList.value.forEach(async (order) => {
    // eslint-disable-next-line no-param-reassign
    order.statuses = [];
    const statusResponse = await OrderService.getOrderStatuses(order.order_id);
    statusResponse.map((element) => order.statuses.push(element));

    // eslint-disable-next-line no-param-reassign
    order.products = [];
    const orderProductResponse = await OrderService.getOrderProducts(order.order_id);
    orderProductResponse.map((element) => order.products.push(element));

    order.products.forEach(async (product) => {
      // eslint-disable-next-line no-param-reassign
      product.additionals = [];
      // eslint-disable-next-line vue/max-len
      const orderProductAdditional = await OrderService.getOrderProductAdditionals(product.order_product_id);
      orderProductAdditional.map((element) => product.additionals.push(element));
    });
  });
  thereIsOrders(orderList.value);

  filteredList.value = orderList.value;
}

const filter = async () => {
  if (search.value.trim() !== '') {
    filteredList.value = await OrderService.getOrderName(JSON.stringify({
      account_id: user.value.account_id, name: search.value,
    }));
    filteredList.value.forEach(async (order) => {
      // eslint-disable-next-line no-param-reassign
      order.statuses = [];
      const statusResponse = await OrderService.getOrderStatuses(order.order_id);
      statusResponse.map((element) => order.statuses.push(element));

      // eslint-disable-next-line no-param-reassign
      order.products = [];
      const orderProductResponse = await OrderService.getOrderProducts(order.order_id);
      orderProductResponse.map((element) => order.products.push(element));

      order.products.forEach(async (product) => {
        // eslint-disable-next-line no-param-reassign
        product.additionals = [];
        // eslint-disable-next-line vue/max-len
        const orderProductAdditional = await OrderService.getOrderProductAdditionals(product.order_product_id);
        orderProductAdditional.map((element) => product.additionals.push(element));
      });
    });
    stopQuery.value = true;
  } else {
    filteredList.value = orderList.value;
    stopQuery.value = false;
  }
  thereIsOrders(filteredList.value);
}

await loadData();
</script>
