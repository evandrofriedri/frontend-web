<template>
  <LogoContainer />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
      Pedidos Recebidos
    </h1>
    <div class="grid gap-1 grid-rows-2 md:grid-rows-1 grid-cols-12 items-center mb-2">
      <div class="col-start-1 col-end-5 md:col-end-3">
        <DateSearchInput id="startDate" v-model="search.startDate" label="Data Inicial"/>
      </div>
      <div class="col-start-5 md:col-start-3 col-end-9 md:col-end-5">
        <DateSearchInput id="endDate" v-model="search.endDate" label="Data final" />
      </div>
      <div class="col-start-9 md:col-start-5 col-end-13 md:col-end-7">
        <SelectSearchInput id="status" v-model="search.status_id" :items="statuses" label="Status" />
      </div>
      <div class="col-start-1 md:col-start-7 col-end-5 md:col-end-9">
        <SearchInput id="orderAdminSearch" type="number" min="0" v-model="search.order_id" label="Nº Pedido" placeholder="Apenas números"  />
      </div>
      <div class="col-start-5 md:col-start-9 col-end-9 md:col-end-11">
        <PrintButton id="exportData" label="Exportar" :data="filteredList" filename="orderList" />
      </div>
      <div class="col-start-9 md:col-start-11 col-end-13">
        <BaseButton id="searchOrder" label="Buscar" icon="fa-solid fa-magnifying-glass" description="" title="Buscar Pedido" @click="filter()" />
      </div>
    </div>
    <div v-show="foundOrder !== 0" ref="listEl" class="p-5 max-h-[600px] bg-white shadow-md rounded mb-3 overflow-x-auto">
      <table id="print-document" class="w-full text-sm text-left text-gray-800">
        <thead class="text-xs text-gray-900 uppercase bg-gray-200">
          <tr>
            <th scope="col" class="px-2 py-2">
              N° Pedido
            </th>
            <th scope="col" class="px-2 py-2">
              Data Pedido
            </th>
            <th scope="col" class="px-2 py-2">
              Conta
            </th>
            <th scope="col" class="px-2 py-2 hidden sm:table-cell break-words">
              Observação
            </th>
            <th scope="col" class="px-2 py-2 hidden sm:table-cell">
              Total
            </th>
            <th scope="col" class="px-2 py-2 hidden sm:table-cell">
              Pagto
            </th>
            <th scope="col" class="px-2 py-2">
              Status
            </th>
            <th scope="col" class="px-2 py-2">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr title="Clique para mais detalhes"
            v-for="(item) in filteredList"
            :key="item"
            :class="`bg-white border-b hover:bg-gray-200 cursor-pointer duration-300 ${item.active == false ? 'text-red-600' : 'text-gray-800'}`"
          >
            <OrderAdminItem :order="item" />
          </tr>
        </tbody>
      </table>
    </div>
    <CardNotFound :found="foundOrder" label="Pedido não encontrado!" />
  </div>
  <ServiceWorker :user="user" />
</template>

<script setup>
import { ref /*, inject*/ } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';
import { jwtDecode } from "jwt-decode";
import SearchInput from './SearchInput.vue';
import CardNotFound from './CardNotFound.vue';
import OrderAdminItem from './OrderAdminItem.vue';
import OrderService from '../services/OrderService';
import BaseButton from './BaseButton.vue';
import LogoContainer from './LogoContainer.vue';
import SelectSearchInput from './SelectSearchInput.vue';
import DateSearchInput from './DateSearchInput.vue';
import StatusService from '../services/StatusService';
import PrintButton from './PrintButton.vue';
import ServiceWorker from './ServiceWorker.vue';

const search = ref({
  startDate: null,
  endDate: null,
  status_id: null,
  order_id: null,
});
const orderList = ref([]);
const filteredList = ref([]);
const foundOrder = ref(0);
const listEl = ref(null);
const itemsToShow = ref(10);
const page = ref(0);
const stopQuery = ref(false);
const statuses = ref([]);
const user = ref(null);

// const emitter = inject('emitter');

// emitter.on('reloadOrders', async () => {
//   page.value = 0;
//   await filter();

//   await useInfiniteScroll(
//     listEl,
//     async () => {
//       await getDataOnScroll();
//     },
//     { distance: 10 },
//   );
// });

const getDataOnScroll = async () => {
  if (!stopQuery.value) {
    page.value += itemsToShow.value;
    const newData = ref(await OrderService.getOrders(JSON.stringify({
      limit: itemsToShow.value, offset: page.value,
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
  { distance: 5 },
);

function thereIsOrder(obj) {
  foundOrder.value = Object.values(obj).length;
}

async function loadStatuses() {
  const response = await StatusService.getStatuses();
  const data = [{id:-1, name:''}];
  response.forEach(element => {
    data.push({
      id: element.status_id,
      name: element.name,
    });
  });
  return data;
}

const loadData = async () => {
  user.value = getUser();
  orderList.value = await OrderService.getOrders(JSON.stringify({
    limit: itemsToShow.value, offset: page.value,
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

  thereIsOrder(orderList.value);

  filteredList.value = orderList.value;
}

const filter = async () => {
  if (( search.value.startDate !== '' &&
        search.value.startDate !== null ) ||
      ( search.value.endDate !== '' &&
        search.value.endDate !== null ) ||
      ( search.value.status_id !== '-1' &&
        search.value.status_id !== null ) ||
      ( search.value.order_id !== '' &&
        search.value.order_id !== null )) {

    filteredList.value = await OrderService.getOrdersName(JSON.stringify(
      search.value));

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
    page.value = 0;
    await loadData();
    await useInfiniteScroll(
      listEl,
      async () => {
        await getDataOnScroll();
      },
      { distance: 5 },
    );
    stopQuery.value = false;
  }
  thereIsOrder(filteredList.value);
}

function getUser() {
  let tokenDecoded = null;
  if (localStorage.getItem('jwt') !== null) {
    const token = JSON.parse(localStorage.getItem('jwt')).value;
    tokenDecoded = jwtDecode(token);
  }
  return tokenDecoded;
}

await loadData();
statuses.value = await loadStatuses();
</script>
