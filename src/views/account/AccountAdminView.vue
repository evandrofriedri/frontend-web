<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-700">
      Contas Cadastradas
    </h1>
    <div class="grid grid-cols-12">
      <div class="col-start-6 md:col-start-10 col-end-13 mb-2">
        <SearchInput id="accountAdminSearch" v-model="search" placeholder="Digite o nome da conta" />
      </div>
    </div>
    <div v-show="foundAccount !== 0" class="p-5 bg-white shadow-md rounded-xl mb-3 overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-700">
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
              <!-- talvez um status Pago|nao pago pode ser necessario ser criado e retirado
                 botao Ações -->
              Status
            </th>
            <th scope="col" class="px-2 py-2">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredList()" :key="index" class="bg-white border-b">
            <AccountAdminItem :account="item" />
          </tr>
        </tbody>
      </table>
    </div>
    <CardNotFound :found="foundAccount" label="Conta não encontrada!" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import AccountAdminItem from '../../components/AccountAdminItem.vue';

const search = ref('');
let accounts = [];
const foundAccount = ref(0);

function loadData() {
  const data = [
    {
      account_id: '01',
      name: 'Evandro Mathias',
      email: 'evandrofriedri@gmail.com',
      cellphone: '(44) 99900-9626',
      status_id: 1,
    },
    {
      account_id: '02',
      name: 'Karla Gabriela',
      email: 'gabrielamanzatti@gmail.com',
      cellphone: '(45) 99954-0472',
      status_id: 1,
    },
  ];

  return data;
}

function thereIsAccount(obj) {
  foundAccount.value = Object.values(obj).length;
}

function filteredList() {
  accounts = loadData();
  // eslint-disable-next-line vue/max-len
  const filtData = accounts.filter((d) => d.name.toLowerCase().includes(search.value.toLowerCase()));
  thereIsAccount(filtData);
  return filtData;
}

</script>
