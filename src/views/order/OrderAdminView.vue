<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-700">
      Pedidos Recebidos
    </h1>
    <div class="grid grid-cols-12">
      <div class="col-start-6 md:col-start-10 col-end-13 mb-2">
        <SearchInput id="orderAdminSearch" v-model="search" placeholder="Digite a descrição do pedido" />
      </div>
    </div>
    <div v-show="foundOrder !== 0" class="p-5 bg-white shadow-md rounded-xl mb-3 overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-700">
        <thead class="text-xs text-gray-900 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-2 py-2">
              N° Pedido
            </th>
            <th scope="col" class="px-2 py-2">
              Data Pedido
            </th>
            <th scope="col" class="px-2 py-2">
              Descrição
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
          <tr v-for="(item, index) in filteredList()" :key="index" class="bg-white border-b">
            <ItemOrderAdmin :order="item" />
          </tr>
        </tbody>
      </table>
    </div>
    <CardNotFound :found="foundOrder" label="Pedido não encontrado!" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import ItemOrderAdmin from '../../components/ItemOrderAdmin.vue';

const search = ref('');
let orders = [];
const foundOrder = ref(0);

function loadData() {
  const data = [
    {
      pedido_id: '01',
      data_pedido: '28-08-2023 14:46',
      descricao: '2x Hamburguer da casa',
      total: '68',
      status_id: 1,
    },
    {
      pedido_id: '02',
      data_pedido: '28-08-2023 16:46',
      descricao: '2x Hamburguer da casa heineken asjhasjdhasdhasuidhoishad',
      total: '63',
      status_id: 1,
    },
  ];

  return data;
}

function thereIsOrder(obj) {
  foundOrder.value = Object.values(obj).length;
}

function filteredList() {
  orders = loadData();
  // eslint-disable-next-line vue/max-len
  const filtData = orders.filter((d) => d.descricao.toLowerCase().includes(search.value.toLowerCase()));
  thereIsOrder(filtData);
  return filtData;
}

</script>
