<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
      Contas Cadastradas
    </h1>
    <div class="grid grid-cols-12 items-center mb-2">
      <div class="col-start-1 col-end-2">
        <BaseButton icon="fa-solid fa-file-circle-plus" description="" @click="isModalAccountOpen = true" />
      </div>
      <div class="col-start-6 md:col-start-10 col-end-13 mb-2">
        <SearchInput id="accountAdminSearch" v-model="search" placeholder="Digite o nome da conta" />
      </div>
    </div>
    <div v-show="foundAccount !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-800">
        <thead class="text-xs text-gray-900 uppercase bg-gray-50">
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
          <tr v-for="(item, index) in filteredList(accountList)" :key="index" class="bg-white border-b">
            <AccountAdminItem :account="item" />
          </tr>
        </tbody>
      </table>
    </div>
    <CardNotFound :found="foundAccount" label="Conta não encontrada!" />
    <ModalWrapper :modal-open="isModalAccountOpen">
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
  name: null,
  email: null,
  cellphone: null,
  password: null,
  confirmPassword: null,
});

const emitter = inject('emitter');
emitter.on('setModalFalse', () => {
  newAccount.value = {
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    favorite: false,
  };
  isModalAccountOpen.value = false;
});

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
