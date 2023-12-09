<template>
  <div class="grid gap-1 grid-cols-12 items-center mb-2">
    <div class="col-start-1 md:col-end-2 col-end-3">
      <BaseButton icon="fa-solid fa-file-circle-plus" description="" title="Criar novo adicional" @click="isModalAdditionalOpen = true" />
    </div>
    <div class="col-start-5 md:col-start-9 col-end-7 md:col-end-10">
        <BaseButton icon="fa-solid fa-file-csv" description="" title="Exportar dados" @click="createCsvFile()" />
    </div>
    <div class="col-start-7 md:col-start-10 col-end-13">
      <SearchInput id="additionalAdminSearch" v-model="search" placeholder="Digite o nome do adicional" />
    </div>
  </div>
  <div v-show="foundAdditional !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-800">
      <thead class="text-xs text-gray-900 uppercase bg-gray-200">
        <tr>
          <th scope="col" class="px-2 py-2">
            Adicional
          </th>
          <th scope="col" class="px-2 py-2">
            Preço
          </th>
          <th scope="col" class="px-2 py-2">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredList(additionalList)" :key="index" class="bg-white border-b hover:bg-gray-200 duration-300">
          <AdditionalAdminItem :additional="item" />
        </tr>
      </tbody>
    </table>
  </div>
  <CardNotFound :found="foundAdditional" label="Adicional não encontrado!" />
  <ModalWrapper :modal-open="isModalAdditionalOpen" screen="FormAdditional-0">
    <FormAdditional label-form="Novo Adicional" label-btn="Cadastrar" :additional="newAdditional" />
  </ModalWrapper>
</template>
<script setup>
import { onMounted, ref, inject } from 'vue';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import AdditionalAdminItem from '../../components/AdditionalAdminItem.vue';
import BaseButton from '../../components/BaseButton.vue';
import FormAdditional from '../../components/FormAdditional.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';
import AdditionalService from '../../services/AdditionalService';

const search = ref('');
const additionalList = ref([]);
const isModalAdditionalOpen = ref(false);
const foundAdditional = ref(0);
const newAdditional = ref({
  additional_id: 0,
  name: null,
  price: null,
});

const emitter = inject('emitter');
emitter.on('setModalFalse-FormAdditional-0', () => {
  newAdditional.value = {
    additional_id: 0,
    name: '',
    price: '',
  };
  isModalAdditionalOpen.value = false;
});

function validate_characters(str) {
  if (str) {
    return str.toString().replace(/[\r\n]+/gm, " ").replace(/,/g, ';');
  }
  return str;
}

function createCsvFile() {
  const csvContent = convertToCsv(additionalList.value);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'additionalList.csv');
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
  const response = await AdditionalService.getAdditionals();
  return response;
}

function thereIsAdditional(obj) {
  foundAdditional.value = Object.values(obj).length;
}

function filteredList(data) {
  // eslint-disable-next-line vue/max-len
  const filtData = data.filter((d) => d.name.toLowerCase().includes(search.value.toLowerCase()));
  thereIsAdditional(filtData);
  return filtData;
}

onMounted(async () => {
  additionalList.value = await loadData();
  additionalList.value = await filteredList(additionalList.value);
});
</script>
