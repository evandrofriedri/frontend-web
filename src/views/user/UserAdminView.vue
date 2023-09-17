<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
      Contas Cadastradas
    </h1>
    <div class="grid grid-cols-12">
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
              Status
            </th>
            <th scope="col" class="px-2 py-2">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredList()" :key="index" class="bg-white border-b">
            <UserAdminItem :user="item" />
          </tr>
        </tbody>
      </table>
    </div>
    <CardNotFound :found="foundUser" label="Conta não encontrada!" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import UserAdminItem from '../../components/UserAdminItem.vue';

const search = ref('');
let users = [];
const foundUser = ref(0);

function loadData() {
  const data = [
    {
      user_id: '01',
      name: 'Evandro Mathias',
      email: 'evandrofriedri@gmail.com',
      cellphone: '(44) 99900-9626',
      status_id: 1,
    },
    {
      user_id: '02',
      name: 'Karla Gabriela',
      email: 'gabrielamanzatti@gmail.com',
      cellphone: '(45) 99954-0472',
      status_id: 1,
    },
  ];

  return data;
}

function thereIsUser(obj) {
  foundUser.value = Object.values(obj).length;
}

function filteredList() {
  users = loadData();
  // eslint-disable-next-line vue/max-len
  const filtData = users.filter((d) => d.name.toLowerCase().includes(search.value.toLowerCase()));
  thereIsUser(filtData);
  return filtData;
}

</script>
