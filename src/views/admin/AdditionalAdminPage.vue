<template>
  <div class="grid gap-1 grid-cols-12 items-center mb-2">
    <div class="col-start-1 md:col-end-2 col-end-3">
      <BaseButton id="newAdditional" icon="fa-solid fa-file-circle-plus" description="" title="Criar novo adicional" @click="isModalAdditionalOpen = true" />
    </div>
    <div class="col-start-5 md:col-start-9 col-end-7 md:col-end-10">
      <PrintButton id="exportData" :data="filteredList" filename="additionalList" />
    </div>
    <div class="col-start-7 md:col-start-10 col-end-13">
      <SearchInput id="additionalAdminSearch" v-model="search" placeholder="Digite o adicional..." @keyup.stop="filter()" />
    </div>
  </div>
  <div v-show="foundAdditional !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
    <table id="print-document" class="w-full text-sm text-left text-gray-800">
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
        <tr v-for="(item) in filteredList" :key="item" class="bg-white border-b hover:bg-gray-200 duration-300">
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
import { ref, inject } from 'vue';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import AdditionalAdminItem from '../../components/AdditionalAdminItem.vue';
import BaseButton from '../../components/BaseButton.vue';
import FormAdditional from '../../components/FormAdditional.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';
import AdditionalService from '../../services/AdditionalService';
import PrintButton from '../../components/PrintButton.vue';

const search = ref('');
const additionalList = ref([]);
const filteredList = ref([]);
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

emitter.on('reloadAdditional', async () => {
  await loadData();
});

const loadData = async () => {
  additionalList.value = await AdditionalService.getAdditionals();
  thereIsAdditional(additionalList.value);

  filteredList.value = JSON.parse(JSON.stringify(additionalList.value));
}

function thereIsAdditional(obj) {
  foundAdditional.value = Object.values(obj).length;
}

const filter = async () => {
  if (search.value.trim() !== '') {
    filteredList.value = await AdditionalService.getAdditionalName(search.value);
  } else {
    filteredList.value = JSON.parse(JSON.stringify(additionalList.value));
  }
  thereIsAdditional(filteredList.value);
}

await loadData();
</script>
