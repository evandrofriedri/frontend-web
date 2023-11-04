<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
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
      <table class="w-full text-sm text-left text-gray-800">
        <thead class="text-xs text-gray-900 uppercase bg-gray-200">
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
          <tr v-for="(item, index) in filteredList(addressList)" :key="index" class="bg-white border-b hover:bg-gray-200 duration-300">
            <AddressItem :address="item" />
          </tr>
        </tbody>
      </table>
    </div>
    <CardNotFound :found="foundAddress" label="Endereço não encontrado!" />
    <ModalWrapper :modal-open="isModalAddressOpen" screen="FormAddress-0">
      <FormAddress label-form="Novo Endereço" label-btn="Cadastrar" :address="newAddress" />
    </ModalWrapper>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import AddressItem from '../../components/AddressItem.vue';
import BaseButton from '../../components/BaseButton.vue';
import FormAddress from '../../components/FormAddress.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';
import AddressService from '../../services/AddressService';

const search = ref('');
const addressList = ref([]);
const isModalAddressOpen = ref(false);
const foundAddress = ref(1);
const newAddress = ref({
  description: null,
  number: null,
  neighborhood: null,
  city: null,
  favorite: false,
  account_id: 1, // terá que ser conta da sessão
});

const emitter = inject('emitter');
emitter.on('setModalFalse-FormAddress-0', () => {
  newAddress.value = {
    description: null,
    number: null,
    neighborhood: '',
    city: null,
    favorite: false,
    account_id: 1, // terá que ser conta da sessão
  };
  isModalAddressOpen.value = false;
});

async function loadData() {
  const response = await AddressService.getAddressID(1); // usuário logado
  return response;
}

function thereIsAdress(obj) {
  foundAddress.value = Object.values(obj).length;
}

function filteredList(data) {
  // eslint-disable-next-line vue/max-len
  const filtData = data.filter((d) => d.description.toLowerCase().includes(search.value.toLowerCase()));
  thereIsAdress(filtData);
  return filtData;
}

onMounted(async () => {
  addressList.value = await loadData();
  addressList.value = await filteredList(addressList.value);
});
</script>
