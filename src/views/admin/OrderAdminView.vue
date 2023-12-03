<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
      Pedidos Recebidos
    </h1>
    <div class="grid grid-cols-12">
      <div class="col-start-6 md:col-start-10 col-end-13 mb-2">
        <SearchInput id="orderAdminSearch" v-model="search" placeholder="Digite a descrição do pedido" />
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
          <tr
            v-for="(item, index) in filteredList(orderList)"
            :key="index"
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
import { onMounted, ref } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import OrderAdminItem from '../../components/OrderAdminItem.vue';
import OrderService from '../../services/OrderService';

const search = ref('');
const orderList = ref([]);
const foundOrder = ref(0);
const listEl = ref(null);
const itemsToShow = ref(10);
const page = ref(0);
const stopQuery = ref(false);

async function loadData() {
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

  return orderList.value;
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
  }
};

useInfiniteScroll(
  listEl,
  async () => {
    await getDataOnScroll();
  },
  { distance: 10 },
);

function thereIsOrder(obj) {
  foundOrder.value = Object.values(obj).length;
}

function filteredList(data) {
  // eslint-disable-next-line vue/max-len
  const filtData = data.filter((d) => d.order_id.toString().toLowerCase().includes(search.value.toLowerCase()));
  thereIsOrder(filtData);
  return filtData;
}

onMounted(async () => {
  orderList.value = await loadData();
  orderList.value = await filteredList(orderList.value);
});

</script>
