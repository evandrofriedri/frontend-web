<template>
  <div class="grid gap-1 grid-cols-12 items-center mb-2">
    <div class="col-start-1 md:col-end-2 col-end-3">
      <BaseButton id="newStatus" icon="fa-solid fa-file-circle-plus" description="" title="Criar novo status" @click="isModalStatusOpen = true" />
    </div>
    <div class="col-start-5 md:col-start-9 col-end-7 md:col-end-10">
      <PrintButton id="exportData" :data="filteredList" filename="statusList" />
    </div>
    <div class="col-start-7 md:col-start-10 col-end-13">
      <SearchInput id="statusAdminSearch" v-model="search" placeholder="Digite o status..." @keyup.stop="filter()" />
    </div>
  </div>
  <div v-show="foundStatus !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
    <table id="print-document" class="w-full text-sm text-left text-gray-800">
      <thead class="text-xs text-gray-900 uppercase bg-gray-200">
        <tr>
          <th scope="col" class="px-2 py-2">
            Status
          </th>
          <th scope="col" class="px-2 py-2">
            Ordem
          </th>
          <th scope="col" class="px-2 py-2">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in filteredList" :key="item" class="bg-white border-b hover:bg-gray-200 duration-300">
          <StatusAdminItem :status="item" />
        </tr>
      </tbody>
    </table>
  </div>
  <CardNotFound :found="foundStatus" label="Status não encontrado!" />
  <ModalWrapper :modal-open="isModalStatusOpen" screen="FormStatus-0">
    <FormStatus label-form="Novo Status" label-btn="Cadastrar" :status="newStatus" />
  </ModalWrapper>
</template>
<script setup>
import { ref, inject } from 'vue';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import StatusAdminItem from '../../components/StatusAdminItem.vue';
import BaseButton from '../../components/BaseButton.vue';
import FormStatus from '../../components/FormStatus.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';
import StatusService from '../../services/StatusService';
import PrintButton from '../../components/PrintButton.vue';

const search = ref('');
const statusList = ref([]);
const filteredList = ref([]);
const isModalStatusOpen = ref(false);
const foundStatus = ref(0);
const newStatus = ref({
  status_id: 0,
  name: null,
});

const emitter = inject('emitter');

emitter.on('setModalFalse-FormStatus-0', () => {
  newStatus.value = {
    status_id: 0,
    name: null,
  };
  isModalStatusOpen.value = false;
});

emitter.on('reloadStatus', async () => {
  search.value = '';
  await loadData();
});

const loadData = async () => {
  statusList.value = await StatusService.getStatuses();
  thereIsStatus(statusList.value);

  filteredList.value = JSON.parse(JSON.stringify(statusList.value));
}

function thereIsStatus(obj) {
  foundStatus.value = Object.values(obj).length;
}

const filter = async () => {
  if (search.value.trim() !== '') {
    filteredList.value = await StatusService.getStatusName(search.value);
  } else {
    filteredList.value = JSON.parse(JSON.stringify(statusList.value));
  }
  thereIsStatus(filteredList.value);
}

await loadData();
</script>
