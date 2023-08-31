<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-700">
      Produtos Cadastrados
    </h1>
    <div class="grid grid-cols-12">
      <div class="col-start-6 md:col-start-10 col-end-13 mb-2">
        <SearchInput id="accountAdminSearch" v-model="search" placeholder="Digite o nome do produto" />
      </div>
    </div>
    <div v-show="foundMenu !== 0" class="p-5 bg-white shadow-md rounded-xl mb-3 overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-700">
        <thead class="text-xs text-gray-900 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-2 py-2">
              Produto
            </th>
            <th scope="col" class="px-2 py-2">
              Descrição
            </th>
            <th scope="col" class="px-2 py-2">
              Categoria
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
            <td class="px-2 py-2">
              {{ item.name }}
            </td>
            <td class="px-2 py-2">
              {{ item.email }}
            </td>
            <td class="px-2 py-2">
              {{ item.cellphone }}
            </td>
            <td class="px-2 py-2 ">
              {{ item.status_id }}
            </td>
            <td class="px-2 py-2 ">
              <button type="button" title="Desativar Conta" @click="accountCancel(item.account_id)">
                <font-awesome-icon icon="fa-regular fa-trash-can" />
              </button>&nbsp;&nbsp;
              <button type="button" title="Ativar Conta" @click="accountPlay(item.account_id)">
                <font-awesome-icon icon="fa-regular fa-pen-to-square" />
              </button>&nbsp;&nbsp;
              <button type="button" title="Ativar Conta" @click="accountPlay(item.account_id)">
                <font-awesome-icon icon="fa-regular fa-square-caret-right" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <CardNotFound :found="foundMenu" label="Conta não encontrada!" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchInput from '../components/SearchInput.vue';
import CardNotFound from '../components/CardNotFound.vue';

const search = ref('');
let accounts = [];
const foundMenu = ref(0);

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

function accountCancel(id) {
  console.log(id);
  // chamar api para excluir a conta, no caso fazer update para ativo = 0
}

function accountPlay(id) {
  console.log(id);
  // chamar api para lançar data do status na tabela de status
  // atualizar o status_id na tabela de contas
}

function thereIsProduct(obj) {
  foundMenu.value = Object.values(obj).length;
}

function filteredList() {
  accounts = loadData();
  // eslint-disable-next-line vue/max-len
  const filtData = accounts.filter((d) => d.name.toLowerCase().includes(search.value.toLowerCase()));
  thereIsProduct(filtData);
  return filtData;
}

</script>
