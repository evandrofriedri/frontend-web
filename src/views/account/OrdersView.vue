<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
      Acompanhar Pedidos
    </h1>
    <div class="grid grid-cols-12 items-center mb-2">
      <div class="col-start-6 md:col-start-10 col-end-13">
        <SearchInput id="OrdersSearch" v-model="search" placeholder="Digite o número do pedido" />
      </div>
    </div>
    <div v-show="foundOrder !== 0" ref="listEl" class="p-5 max-h-[600px] bg-white shadow-md rounded mb-3 overflow-x-auto">
      <div v-for="(item, index) in filteredList(orderList)" :key="index" class="p-5 bg-white shadow-md rounded mb-3">
        <OrderDetail :show-label="false" :order="item" />
      </div>
    </div>
    <CardNotFound :found="foundOrder" label="Nenhum pedido encontrado!" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';
import OrderService from '../../services/OrderService';
import CardNotFound from '../../components/CardNotFound.vue';
import SearchInput from '../../components/SearchInput.vue';
import OrderDetail from '../../components/OrderDetail.vue';

const search = ref('');
const orderList = ref([]);
const foundOrder = ref(1);
const listEl = ref(null);
const itemsToShow = ref(10);
const page = ref(0);
const stopQuery = ref(false);

async function loadData() {
  orderList.value = await OrderService.getOrderID(JSON.stringify({
    id: 1, limit: itemsToShow.value, offset: page.value,
  })); // usuario logado

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

  return orderList.value;
}

const getDataOnScroll = async () => {
  if (!stopQuery.value) {
    page.value += itemsToShow.value;
    const newData = ref(await OrderService.getOrderID(JSON.stringify({
      id: 1, limit: itemsToShow.value, offset: page.value,
    })));

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

    if (newData.value.length === 0) {
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

function filteredList(data) {
  // eslint-disable-next-line vue/max-len
  const filtData = data.filter((d) => d.order_id.toString().toLowerCase().includes(search.value.toLowerCase()));
  thereIsOrders(filtData);
  return filtData;
}

onMounted(async () => {
  orderList.value = await loadData();
  orderList.value = await filteredList(orderList.value);
});
</script>
