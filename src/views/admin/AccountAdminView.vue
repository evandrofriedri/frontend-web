<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
      Contas Cadastradas
    </h1>
    <div class="grid gap-1 grid-cols-12 items-center mb-2">
      <div class="col-start-1 md:col-end-2 col-end-3">
        <BaseButton icon="fa-solid fa-file-circle-plus" description="" title="Criar nova conta" @click="isModalAccountOpen = true" />
      </div>
      <div class="col-start-5 md:col-start-9 col-end-7 md:col-end-10">
        <BaseButton icon="fa-solid fa-file-csv" description="" title="Exportar dados" @click="createCsvFile()" />
      </div>
      <div class="col-start-7 md:col-start-10 col-end-13">
        <SearchInput id="accountAdminSearch" v-model="search" placeholder="Digite o nome da conta" />
      </div>
    </div>
    <div v-show="foundAccount !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-800">
        <thead class="text-xs text-gray-900 uppercase bg-gray-200">
          <tr>
            <th scope="col" class="px-2 py-2">
              Nome
            </th>
            <th scope="col" class="px-2 py-2">
              E-mail
            </th>
            <th scope="col" class="px-2 py-2">
              Celular
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
          <tr v-for="(item, index) in filteredList(accountList)" :key="index" class="bg-white border-b hover:bg-gray-200 duration-300">
            <AccountAdminItem :account="item" />
          </tr>
        </tbody>
      </table>
    </div>
    <CardNotFound :found="foundAccount" label="Conta não encontrada!" />
    <ModalWrapper :modal-open="isModalAccountOpen" screen="FormAccount-0">
      <FormAccount label-form="Nova Conta" label-btn="Cadastrar" :account="newAccount" />
    </ModalWrapper>
  </div>
</template>

<script setup>
import {
  onMounted,
  ref,
  inject,
} from 'vue';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import AccountAdminItem from '../../components/AccountAdminItem.vue';
import AccountService from '../../services/AccountService';
import BaseButton from '../../components/BaseButton.vue';
import FormAccount from '../../components/FormAccount.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';

const search = ref('');
const accountList = ref([]);
const isModalAccountOpen = ref(false);
const foundAccount = ref(0);
const newAccount = ref({
  account_id: 0,
  name: null,
  email: null,
  cellphone: null,
  password: null,
  confirmPassword: null,
});

const emitter = inject('emitter');
emitter.on('setModalFalse-FormAccount-0', () => {
  newAccount.value = {
    account_id: 0,
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    favorite: false,
  };
  isModalAccountOpen.value = false;
});

function validate_characters(str) {
  if (str) {
    return str.toString().replace(/[\r\n]+/gm, " ").replace(/,/g, ';');
  }
  return str;
}

function createCsvFile() {
  const csvContent = convertToCsv(accountList.value);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'accountList.csv');
  link.click();
}

function convertToCsv(data){
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => headers.map(header => validate_characters(obj[header])));
  const headerRow = headers.join(',');
  const csvRows = [headerRow, ...rows.map(row => row.join(','))];
  return csvRows.join('\n');
}


async function loadData() {
  const response = await AccountService.getAccounts();
  return response;
}

function thereIsAccount(obj) {
  foundAccount.value = Object.values(obj).length;
}

function filteredList(data) {
  // eslint-disable-next-line vue/max-len
  const filtData = data.filter((d) => d.name.toLowerCase().includes(search.value.toLowerCase()));
  thereIsAccount(filtData);
  return filtData;
}

onMounted(async () => {
  accountList.value = await loadData();
  accountList.value = await filteredList(accountList.value);
});

</script>
