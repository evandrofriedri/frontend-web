<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
      Contas Cadastradas
    </h1>
    <div class="grid grid-cols-12 items-center mb-2">
      <div class="col-start-1 col-end-2">
        <BaseButton icon="fa-solid fa-file-circle-plus" description="" @click="isModalUserOpen = true" />
      </div>
      <div class="col-start-6 md:col-start-10 col-end-13 mb-2">
        <SearchInput id="userAdminSearch" v-model="search" placeholder="Digite o nome da conta" />
      </div>
    </div>
    <div v-show="foundUser !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
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
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredList(userList)" :key="index" class="bg-white border-b">
            <UserAdminItem :user="item" />
          </tr>
        </tbody>
      </table>
    </div>
    <CardNotFound :found="foundUser" label="Conta não encontrada!" />
    <ModalWrapper :modal-open="isModalUserOpen">
      <FormUser label-form="Nova Conta" label-btn="Cadastrar" :user="newUser" />
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
import UserAdminItem from '../../components/UserAdminItem.vue';
import UserService from '../../services/UserService';
import BaseButton from '../../components/BaseButton.vue';
import FormUser from '../../components/FormUser.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';

const search = ref('');
const userList = ref([]);
const isModalUserOpen = ref(false);
const foundUser = ref(0);
const newUser = ref({
  name: null,
  email: null,
  cellphone: null,
  password: null,
  confirmPassword: null,
});

const emitter = inject('emitter');
emitter.on('setModalFalse', () => {
  newUser.value = {
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    favorite: false,
  };
  isModalUserOpen.value = false;
});

async function loadData() {
  const response = await UserService.getUsers();
  return response;
}

function thereIsUser(obj) {
  foundUser.value = Object.values(obj).length;
}

function filteredList(data) {
  // eslint-disable-next-line vue/max-len
  const filtData = data.filter((d) => d.name.toLowerCase().includes(search.value.toLowerCase()));
  thereIsUser(filtData);
  return filtData;
}

onMounted(async () => {
  userList.value = await loadData();
  userList.value = await filteredList(userList.value);
});

</script>
