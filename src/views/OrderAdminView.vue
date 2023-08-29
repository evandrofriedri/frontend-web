<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-700">
      Pedidos Recebidos
    </h1>
    <div class="grid grid-cols-12">
      <div class="col-start-6 md:col-start-10 col-end-13 mb-2">
        <SearchInput id="orderAdminSearch" v-model="search" placeholder="Informações do Pedido" />
      </div>
    </div>
    <div class="p-5 bg-white shadow-md rounded-xl mb-3 overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-700">
        <thead class="text-xs text-gray-900 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">
              N° Pedido
            </th>
            <th scope="col" class="px-6 py-3">
              Data Pedido
            </th>
            <th scope="col" class="px-6 py-3">
              Descrição
            </th>
            <th scope="col" class="px-6 py-3">
              Total
            </th>
            <th scope="col" class="px-6 py-3">
              <!-- talvez um status Pago|nao pago pode ser necessario ser criado e retirado
                 botao Ações -->
              Status
            </th>
            <th scope="col" class="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredList()" :key="index" class="bg-white border-b">
            <td class="px-6 py-4">
              {{ item.pedido_id }}
            </td>
            <td class="px-6 py-4">
              {{ item.data_pedido }}
            </td>
            <td class="px-6 py-4">
              {{ item.descricao }}
            </td>
            <td class="px-6 py-4">
              {{ item.total }}
            </td>
            <td class="px-6 py-4 font-medium ">
              {{ item.status_id }}
            </td>
            <td class="px-6 py-4 ">
              <button type="button" title="Cancelar Pedido" @click="orderCancel(index)">
                <font-awesome-icon icon="fa-solid fa-ban" />
              </button>&nbsp;&nbsp;
              <button type="button" title="Dar sequência ao fluxo do pedido" class="underline" @click="orderForward(index)">
                <font-awesome-icon icon="fa-solid fa-forward" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <CardNotFound :found="foundOrder" label="Pedido não encontrado!" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchInput from '../components/SearchInput.vue';
import CardNotFound from '../components/CardNotFound.vue';

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

function thereIsProduct(obj) {
  foundOrder.value = Object.values(obj).length;
}

function filteredList() {
  orders = loadData();
  // eslint-disable-next-line vue/max-len
  const filtData = orders.filter((d) => d.descricao.toLowerCase().includes(search.value.toLowerCase()));
  thereIsProduct(filtData);
  return filtData;
}

</script>
