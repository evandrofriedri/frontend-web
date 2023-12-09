<template>
  <div class="grid gap-1 grid-cols-12 items-center mb-2">
    <div class="col-start-1 md:col-end-2 col-end-3">
      <BaseButton icon="fa-solid fa-file-circle-plus" description="" title="Criar novo status" @click="isModalStatusOpen = true" />
    </div>
    <div class="col-start-5 md:col-start-9 col-end-7 md:col-end-10">
        <BaseButton icon="fa-solid fa-file-csv" description="" title="Exportar dados" @click="createCsvFile()" />
    </div>
    <div class="col-start-7 md:col-start-10 col-end-13">
      <SearchInput id="statusAdminSearch" v-model="search" placeholder="Digite o nome do status" />
    </div>
  </div>
  <div v-show="foundStatus !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-800">
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
        <tr v-for="(item, index) in filteredList(statusList)" :key="index" class="bg-white border-b hover:bg-gray-200 duration-300">
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
import { onMounted, ref, inject } from 'vue';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import StatusAdminItem from '../../components/StatusAdminItem.vue';
import BaseButton from '../../components/BaseButton.vue';
import FormStatus from '../../components/FormStatus.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';
import StatusService from '../../services/StatusService';

const search = ref('');
const statusList = ref([]);
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

async function loadData() {
  const response = await StatusService.getStatuses();
  return response;
}

function thereIsStatus(obj) {
  foundStatus.value = Object.values(obj).length;
}

function filteredList(data) {
  // eslint-disable-next-line vue/max-len
  const filtData = data.filter((d) => d.name.toLowerCase().includes(search.value.toLowerCase()));
  thereIsStatus(filtData);
  return filtData;
}

onMounted(async () => {
  statusList.value = await loadData();
  statusList.value = await filteredList(statusList.value);
});
</script>
