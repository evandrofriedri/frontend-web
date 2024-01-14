<template>
  <div class="grid gap-1 grid-cols-12 items-center mb-2">
    <div class="col-start-1 md:col-end-2 col-end-3">
      <BaseButton icon="fa-solid fa-file-circle-plus" description="" title="Criar nova função" @click="isModalRoleOpen = true" />
    </div>
    <div class="col-start-5 md:col-start-9 col-end-7 md:col-end-10">
        <BaseButton icon="fa-solid fa-file-csv" description="" title="Exportar dados" @click="createCsvFile()" />
    </div>
    <div class="col-start-7 md:col-start-10 col-end-13">
      <SearchInput id="roleAdminSearch" v-model="search" placeholder="Digite o nome da função" @keyup="filter()" />
    </div>
  </div>
  <div v-show="foundRole !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-800">
      <thead class="text-xs text-gray-900 uppercase bg-gray-200">
        <tr>
          <th scope="col" class="px-2 py-2">
            Nome
          </th>
          <th scope="col" class="px-2 py-2">
            Descrição
          </th>
          <th scope="col" class="px-2 py-2">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredList" :key="index" class="bg-white border-b hover:bg-gray-200 duration-300">
          <RoleAdminItem :role="item" />
        </tr>
      </tbody>
    </table>
  </div>
  <CardNotFound :found="foundRole" label="Função não encontrada!" />
  <ModalWrapper :modal-open="isModalRoleOpen" screen="FormRole-0">
    <FormRole label-form="Nova Função" label-btn="Cadastrar" :role="newRole" />
  </ModalWrapper>
</template>
<script setup>
import { onMounted, ref, inject } from 'vue';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import RoleAdminItem from '../../components/RoleAdminItem.vue';
import BaseButton from '../../components/BaseButton.vue';
import FormRole from '../../components/FormRole.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';
import RoleService from '../../services/RoleService';

const search = ref('');
const roleList = ref([]);
const filteredList = ref([]);
const isModalRoleOpen = ref(false);
const foundRole = ref(0);
const newRole = ref({
  role_id: 0,
  name: null,
});

const emitter = inject('emitter');
emitter.on('setModalFalse-FormRole-0', () => {
  newRole.value = {
    role_id: 0,
    name: null,
  };
  isModalRoleOpen.value = false;
});

function validate_characters(str) {
  if (str) {
    return str.toString().replace(/[\r\n]+/gm, " ").replace(/,/g, ';');
  }
  return str;
}
function createCsvFile() {
  const csvContent = convertToCsv(roleList.value);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'roleList.csv');
  link.click();
}
function convertToCsv(data){
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => headers.map(header => validate_characters(obj[header])));
  const headerRow = headers.join(',');
  const csvRows = [headerRow, ...rows.map(row => row.join(','))];
  return csvRows.join('\n');
}

const loadData = async () => {
  roleList.value = await RoleService.getRoles();
  thereIsRole(roleList.value);

  filteredList.value = JSON.parse(JSON.stringify(roleList.value));
}

function thereIsRole(obj) {
  foundRole.value = Object.values(obj).length;
}

const filter = () => {
  if (search.value.trim() !== '') {
    filteredList.value = roleList.value.filter((d) => d.name.toLowerCase().includes(search.value.toLowerCase()));
  } else {
    filteredList.value = JSON.parse(JSON.stringify(roleList.value));
  }
  thereIsRole(filteredList.value);
}

await loadData();
</script>
