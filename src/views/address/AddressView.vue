<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-700">
      Meus Endereços
    </h1>
    <div class="grid grid-cols-12 items-center mb-2">
      <div class="col-start-1 col-end-2">
        <BaseButton icon="fa-solid fa-file-circle-plus" description="" @click="isModalAddressOpen = true" />
      </div>
      <div class="col-start-6 md:col-start-10 col-end-13">
        <SearchInput id="AddressSearch" v-model="search" placeholder="Digite o endereço" />
      </div>
    </div>
    <div v-show="foundAddress !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-700">
        <thead class="text-xs text-gray-900 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-2 py-2">
              Endereço
            </th>
            <th scope="col" class="px-2 py-2">
              Número
            </th>
            <th scope="col" class="px-2 py-2">
              Bairro
            </th>
            <th scope="col" class="px-2 py-2">
              Cidade
            </th>
            <th scope="col" class="px-2 py-2">
              End. Padrão
            </th>
            <th scope="col" class="px-2 py-2">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredList()" :key="index" class="bg-white border-b">
            <AddressItem :address="item" />
          </tr>
        </tbody>
      </table>
    </div>
    <CardNotFound :found="foundAddress" label="Endereço não encontrado!" />
    <ModalWrapper :modal-open="isModalAddressOpen">
      <FormAddress label-form="Novo Endereço" label-btn="Cadastrar" :address="newAddress" />
    </ModalWrapper>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import AddressItem from '../../components/AddressItem.vue';
import BaseButton from '../../components/BaseButton.vue';
import FormAddress from '../../components/FormAddress.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';

const search = ref('');
let addresses = [];
const isModalAddressOpen = ref(false);
const foundAddress = ref(0);
const newAddress = ref({
  id: '',
  address: '',
  number: '',
  neighborhood: '',
  city: '',
  favorite: false,
});

const emitter = inject('emitter');
emitter.on('setModalFalse', () => {
  newAddress.value = {
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    favorite: false,
  };
  isModalAddressOpen.value = false;
});

function loadData() {
  const data = [
    {
      address: 'Rua Dona Lucia',
      number: 145,
      neighborhood: 'Jardim Porto Alegre',
      city: 'Toledo - PR',
      favorite: true,
    },
    {
      address: 'Rua Erechim',
      number: 624,
      neighborhood: 'Jardim Porto Alegre',
      city: 'Toledo - PR',
      favorite: false,
    },
  ];

  return data;
}
function thereIsAdress(obj) {
  foundAddress.value = Object.values(obj).length;
}

function filteredList() {
  addresses = loadData();
  // eslint-disable-next-line vue/max-len
  const filtData = addresses.filter((d) => d.address.toLowerCase().includes(search.value.toLowerCase()));
  thereIsAdress(filtData);
  return filtData;
}

// onServerPrefetch(async () => { // talvez usará esse qdo tiver conexão com banco
//   // https://vuejs.org/api/composition-api-lifecycle.html#onserverprefetch
//   // https://stackoverflow.com/questions/14234646/adding-elements-to-object
//   console.log('onServerPrefetch');
//   addresses.value = await loadData();
// });

// onMounted(async () => {
//   addresses.value = await loadData();
// });
</script>
