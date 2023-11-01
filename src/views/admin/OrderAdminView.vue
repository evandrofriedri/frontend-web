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
    <div v-show="foundOrder !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-800">
        <thead class="text-xs text-gray-900 uppercase bg-gray-50">
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
              <!-- talvez um status Pago|nao pago pode ser necessario ser criado e retirado
                 botao Ações -->
              Status
            </th>
            <th scope="col" class="px-2 py-2">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredList(orderList)" :key="index" class="bg-white border-b">
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
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import OrderAdminItem from '../../components/OrderAdminItem.vue';
import OrderService from '../../services/OrderService';

const search = ref('');
const orderList = ref([]);
const foundOrder = ref(0);

async function loadData() {
  const params = {
    limit: 10,
    offset: 0,
  };
  orderList.value = await OrderService.getOrders(JSON.stringify(params));
  return orderList.value;
}

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
