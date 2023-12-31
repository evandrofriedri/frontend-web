<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
      Acompanhar Pedidos
    </h1>
    <!-- <div class="grid grid-cols-12 items-center mb-2">
      <div class="col-start-6 md:col-start-10 col-end-13">
        <SearchInput id="OrdersSearch" v-model="search" placeholder="Digite o número do pedido" @keydown="filter()" />
      </div>
    </div> -->
    <div v-show="foundOrder !== 0" ref="listEl" class="p-5 max-h-[600px] bg-white shadow-md rounded mb-3 overflow-x-auto">
      <div v-for="(item, index) in orderList" :key="index" class="p-5 bg-white shadow-md rounded mb-3">
        <OrderDetail :show-label="false" :order="item" />
      </div>
    </div>
    <CardNotFound :found="foundOrder" label="Nenhum pedido encontrado!" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';
import { jwtDecode } from "jwt-decode";
import OrderService from '../services/OrderService';
import CardNotFound from './CardNotFound.vue';
// import SearchInput from './SearchInput.vue';
import OrderDetail from './OrderDetail.vue';

// const search = ref('');
const orderList = ref([]);
const foundOrder = ref(1);
const listEl = ref(null);
const itemsToShow = ref(10);
const page = ref(0);
const stopQuery = ref(false);
const user = ref(null);

function getUser() {
  const token = localStorage.getItem('jwt');
  let tokenDecoded = null;
  if (token !== null) {
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

  // filter();

  thereIsOrders(orderList.value);
}

// const filter = () => {
//   // let filtData = [];
//   filteredList.value = orderList.value;
//   // eslint-disable-next-line vue/max-len
//   if (search.value.trim() !== '') {
//     filteredList.value = orderList.value.filter((d) => d.order_id.toString().toLowerCase().includes(search.value.toLowerCase()));
//     // orderList.value = filtData;
//   }
//   // else {
//   //   filtData = orderList.value;
//   // }
//   thereIsOrders(filteredList.value);
// }

await loadData();
</script>
