<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-700">
      Meus Endereços
    </h1>
    <div v-for="(item, index) in addresses" :key="index" class="flex justify-between items-center p-5 bg-white text-gray-700 shadow-md rounded-xl mb-3">
      <div>
        <p>{{ item.address }}</p>
        <p>{{ item.city }}</p>
      </div>
      <div class="flex justify-between w-[85px]">
        <font-awesome-icon :icon="`${ item.favorite == true ? 'fa-solid' : 'fa-regular'} fa-star`" :class="`${ item.favorite == true ? 'text-yellow-500' : ''}`" size="lg" />
        <button type="button">
          <font-awesome-icon icon="fa-regular fa-pen-to-square" size="lg" />
        </button>
        <button type="button">
          <font-awesome-icon icon="fa-regular fa-trash-can" size="lg" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onServerPrefetch, ref } from 'vue';

const addresses = ref(null);

function loadData() {
  const data = [
    {
      address: 'Rua Dona Lucia, 145 Jardim Porto Alegre',
      city: 'Toledo - PR',
      favorite: true,
    },
    {
      address: 'Rua Erechim, 624 Jardim Porto Alegre',
      city: 'Toledo - PR',
      favorite: false,
    },
  ];

  return data;
}

onServerPrefetch(async () => { // talvez usará esse qdo tiver conexão com banco
  // https://vuejs.org/api/composition-api-lifecycle.html#onserverprefetch
  // https://stackoverflow.com/questions/14234646/adding-elements-to-object
  console.log('onServerPrefetch');
  addresses.value = await loadData();
});

onMounted(async () => {
  addresses.value = await loadData();
});
</script>
