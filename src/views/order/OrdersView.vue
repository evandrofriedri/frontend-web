<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-700">
      Acompanhar Pedidos
    </h1>
    <div v-for="(item, index) in statusPedido" :key="index" class="p-5 bg-white shadow-md rounded mb-3">
      <h1 class="mb-3 text-lg font-semibold text-gray-700">
        Pedido #{{ item.pedido_id }}
      </h1>
      <div class="container">
        <div class="flex flex-col md:grid grid-cols-12 text-gray-50">
          <div v-for="(data, idx) in item.data_status" :key="idx" class="flex md:contents">
            <div class="col-start-1 col-end-3 mr-10 md:mx-auto relative">
              <div class="h-full w-6 flex items-center justify-center">
                <div :class="`h-full w-1 ${data.data_alteracao == '' ? 'bg-gray-300' : 'bg-green-500'}`" />
              </div>
              <div :class="`w-6 h-6 absolute top-1/2 -mt-3 rounded-full ${data.data_alteracao == '' ? 'bg-gray-300' : 'bg-green-500'} text-center`">
                <font-awesome-icon icon="fa-solid fa-check" size="sm" />
              </div>
            </div>
            <div :class="`${data.data_alteracao == '' ? 'bg-gray-300' : 'bg-green-500'} col-start-3 col-end-12 p-4 rounded my-4 mr-auto shadow-md w-full`">
              <h3 class="font-semibold text-base mb-1">
                {{ data.status_nome }}
              </h3>
              <p class="text-sm w-full">
                {{ data.data_alteracao }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const statusPedido = ref(null);

function loadData() {
  const data = [
    {
      pedido_id: 1,
      data_status: [
        {
          status_id: 1,
          data_alteracao: '21-08-2023 15:15',
          status_nome: 'PEDIDO REALIZADO',
        },
        {
          status_id: 2,
          data_alteracao: '',
          status_nome: 'EM PREPARO',
        },
        {
          status_id: 3,
          data_alteracao: '',
          status_nome: 'PRONTO',
        },
        {
          status_id: 4,
          data_alteracao: '',
          status_nome: 'ENTREGUE',
        },
      ],
    },
    {},
  ];

  return data;
}

onMounted(async () => {
  statusPedido.value = await loadData();
});
</script>
