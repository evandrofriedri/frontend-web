<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
      Pedidos Recebidos
    </h1>
    <div class="grid gap-1 grid-cols-12 items-center mb-2">
      <div class="col-start-1 md:col-end-3 col-end-4">
        <BaseButton icon="fa-solid fa-rotate-right" :description="`${timer}s`" title="Atualiza lista" @click="startTimer(true)" />
      </div>
      <div class="col-start-5 md:col-start-9 col-end-7 md:col-end-10">
        <BaseButton icon="fa-solid fa-file-csv" description="" title="Exportar dados" @click="createCsvFile()" />
      </div>
      <div class="col-start-7 md:col-start-10 col-end-13">
        <SearchInput id="orderAdminSearch" v-model="search" placeholder="Digite a descrição do pedido" @keyup="filter()" />
      </div>
    </div>
    <div v-show="foundOrder !== 0" ref="listEl" class="p-5 max-h-[600px] bg-white shadow-md rounded mb-3 overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-800">
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
            <th scope="col" class="px-2 py-2">
              Observação
            </th>
            <th scope="col" class="px-2 py-2">
              Total
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
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useInfiniteScroll } from '@vueuse/core';
import SearchInput from './SearchInput.vue';
import CardNotFound from './CardNotFound.vue';
import OrderAdminItem from './OrderAdminItem.vue';
import OrderService from '../services/OrderService';
import BaseButton from './BaseButton.vue';

const router = useRouter();
const search = ref('');
const orderList = ref([]);
const filteredList = ref([]);
const foundOrder = ref(0);
const listEl = ref(null);
const itemsToShow = ref(5);
const page = ref(0);
const stopQuery = ref(false);
const timer = ref(60);

function validate_characters(str) {
  if (str) {
    return str.toString().replace(/[\r\n]+/gm, " ").replace(/,/g, ';');
  }
  return str;
}
function createCsvFile() {
  const printableList = JSON.parse(JSON.stringify(orderList.value));
  printableList.forEach(element => {
    delete element.products;
    delete element.statuses;
  });
  const csvContent = convertToCsv(printableList);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'orderList.csv');
  link.click();
}

function convertToCsv(data){
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => headers.map(header => validate_characters(obj[header])));
  const headerRow = headers.join(',');
  const csvRows = [headerRow, ...rows.map(row => row.join(','))];
  return csvRows.join('\n');
}

async function startTimer(resetTimer = false) {
  if (resetTimer) {
    router.go(0);
  }
  const interval = setInterval(() => {
    timer.value--;
    if (timer.value == 0) {
      router.go(0);
    }
  }, 1000);
}

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

const loadData = async () => {
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

const filter = () => {
  if (search.value.trim() !== '') {
    filteredList.value = orderList.value.filter((d) => d.order_id.toString().toLowerCase().includes(search.value.toLowerCase()));
  } else {
    filteredList.value = orderList.value;
  }
  thereIsOrder(filteredList.value);
}

await loadData();
await startTimer();
</script>
