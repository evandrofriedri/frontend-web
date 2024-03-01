<template>
  <div class="grid gap-1 grid-cols-12 items-center mb-2">
    <div class="col-start-1 md:col-end-2 col-end-3">
      <BaseButton icon="fa-solid fa-file-circle-plus" description="" title="Criar nova conta" @click="isModalAccountOpen = true" />
    </div>
    <div class="col-start-5 md:col-start-9 col-end-7 md:col-end-10">
      <PrintButton id="exportData" :data="filteredList" filename="accountList" />
    </div>
    <div class="col-start-7 md:col-start-10 col-end-13">
      <SearchInput id="accountAdminSearch" v-model="search" placeholder="Digite a conta..." @keyup="filter()" />
    </div>
  </div>
  <div v-show="foundAccount !== 0" ref="listEl" class="p-5 max-h-[600px] bg-white shadow-md rounded mb-3 overflow-x-auto">
    <table id="print-document" class="w-full text-sm text-left text-gray-800">
      <thead class="text-xs text-gray-900 uppercase bg-gray-200">
        <tr>
          <th scope="col" class="px-2 py-2">
            Nome
          </th>
          <th scope="col" class="px-2 py-2">
            E-mail
          </th>
          <th scope="col" class="px-2 py-2 hidden sm:table-cell">
            Celular
          </th>
          <th scope="col" class="px-2 py-2 hidden sm:table-cell">
            Status
          </th>
          <th scope="col" class="px-2 py-2">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredList" :key="index" class="bg-white border-b hover:bg-gray-200 duration-300">
          <AccountAdminItem :account="item" />
        </tr>
      </tbody>
    </table>
  </div>
  <CardNotFound :found="foundAccount" label="Conta não encontrada!" />
  <ModalWrapper :modal-open="isModalAccountOpen" screen="FormAccount-0">
    <FormAccount label-form="Nova Conta" label-btn="Cadastrar" :account="newAccount" />
  </ModalWrapper>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import AccountAdminItem from '../../components/AccountAdminItem.vue';
import AccountService from '../../services/AccountService';
import BaseButton from '../../components/BaseButton.vue';
import FormAccount from '../../components/FormAccount.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';
import PrintButton from '../../components/PrintButton.vue';

const search = ref('');
const accountList = ref([]);
const filteredList = ref([]);
const isModalAccountOpen = ref(false);
const foundAccount = ref(0);
const newAccount = ref({
  account_id: 0,
  name: null,
  email: null,
  cellphone: null,
  password: null,
  confirmPassword: null,
  role_id: null,
});
const listEl = ref(null);
const itemsToShow = ref(10);
const page = ref(0);
const stopQuery = ref(false);

const emitter = inject('emitter');
emitter.on('setModalFalse-FormAccount-0', () => {
  newAccount.value = {
    account_id: 0,
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    favorite: false,
    role_id: '',
  };
  isModalAccountOpen.value = false;
});

const getDataOnScroll = async () => {
  if (!stopQuery.value) {
    page.value += itemsToShow.value;
    const newData = await AccountService.getAccounts(JSON.stringify({
      limit: itemsToShow.value, offset: page.value,
    }));

    if (newData.length === 0 || newData === false) {
      stopQuery.value = true;
    }
    accountList.value.push(...newData);
    filteredList.value = accountList.value;
  }
};

useInfiniteScroll(
  listEl,
  async () => {
    await getDataOnScroll();
  },
  { distance: 10 },
);

const loadData = async () => {
  accountList.value = await AccountService.getAccounts(JSON.stringify({
    limit: itemsToShow.value, offset: page.value,
  }));
  thereIsAccount(accountList.value)

  filteredList.value = JSON.parse(JSON.stringify(accountList.value));
}

function thereIsAccount(obj) {
  foundAccount.value = Object.values(obj).length;
}

const filter = async () => {
  if (search.value.trim() !== '') {
    filteredList.value = await AccountService.getAccountName(search.value);
    stopQuery.value = true;
  } else {
    filteredList.value = JSON.parse(JSON.stringify(accountList.value));
    stopQuery.value = false;
  }
  thereIsAccount(filteredList.value);
}

await loadData();
</script>
