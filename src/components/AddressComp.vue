<template>
  <LogoContainer />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
      Meus Endereços
    </h1>
    <div class="grid gap-1 grid-cols-12 items-center mb-2">
      <div class="col-start-1 md:col-end-2 col-end-3">
        <BaseButton id="newAddress" icon="fa-solid fa-file-circle-plus" description="" title="Criar novo endereço" @click="isModalAddressOpen = true" />
      </div>
      <div class="col-start-5 md:col-start-9 col-end-7 md:col-end-10">
        <PrintButton id="exportData" :data="filteredList" filename="addressList" />
      </div>
      <div class="col-start-7 md:col-start-10 col-end-13">
        <SearchInput id="AddressSearch" v-model="search" placeholder="Digite o endereço..." @keyup.stop="filter()" />
      </div>
    </div>
    <div v-show="foundAddress !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
      <table id="print-document" class="w-full text-sm text-left text-gray-800">
        <thead class="text-xs text-gray-900 uppercase bg-gray-200">
          <tr>
            <th scope="col" class="px-2 py-2">
              Endereço
            </th>
            <th scope="col" class="px-2 py-2">
              Número
            </th>
            <th scope="col" class="px-2 py-2 hidden sm:table-cell">
              Bairro
            </th>
            <th scope="col" class="px-2 py-2">
              Cidade
            </th>
            <th scope="col" class="px-2 py-2 hidden sm:table-cell">
              End. Padrão
            </th>
            <th scope="col" class="px-2 py-2">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in filteredList" :key="item" class="bg-white border-b hover:bg-gray-200 duration-300">
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
import { ref, inject } from 'vue';
import { jwtDecode } from "jwt-decode";
import SearchInput from './SearchInput.vue';
import CardNotFound from './CardNotFound.vue';
import AddressItem from './AddressItem.vue';
import BaseButton from './BaseButton.vue';
import FormAddress from './FormAddress.vue';
import ModalWrapper from './ModalWrapper.vue';
import AddressService from '../services/AddressService';
import LogoContainer from './LogoContainer.vue';
import PrintButton from './PrintButton.vue';

const search = ref('');
const addressList = ref([]);
const filteredList = ref([]);
const isModalAddressOpen = ref(false);
const foundAddress = ref(1);
function getUser() {
  let tokenDecoded = null;
  if (localStorage.getItem('jwt') !== null) {
    const token = JSON.parse(localStorage.getItem('jwt')).value;
    tokenDecoded = jwtDecode(token);
  }
  return tokenDecoded;
}
const user = ref(getUser());
const newAddress = ref({
  address_id: 0,
  description: null,
  number: null,
  neighborhood: null,
  city: null,
  favorite: false,
  account_id: user.value.account_id,
});

const emitter = inject('emitter');

emitter.on('setModalFalse-FormAddress-0', () => {
  newAddress.value = {
    address_id: 0,
    description: null,
    number: null,
    neighborhood: '',
    city: null,
    favorite: false,
    account_id: user.value.account_id,
  };
  isModalAddressOpen.value = false;
});

emitter.on('reloadAddress', async () => {
  await loadData();
});

const loadData = async () => {
  addressList.value = await AddressService.getAddressID(user.value.account_id);
  thereIsAdress(addressList.value);

  filteredList.value = JSON.parse(JSON.stringify(addressList.value));
}

function thereIsAdress(obj) {
  foundAddress.value = Object.values(obj).length;
}

const filter = async () => {
  if (search.value.trim() !== '') {
    filteredList.value = await AddressService.getAddressName(JSON.stringify({
      account_id: user.value.account_id, name: search.value,
    }));
  } else {
    filteredList.value = JSON.parse(JSON.stringify(addressList.value));
  }
  thereIsAdress(filteredList.value);
}

await loadData();
</script>
