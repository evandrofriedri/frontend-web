<template>
  <div class="grid grid-cols-12 items-center mb-2">
    <div class="col-start-1 col-end-2">
      <BaseButton icon="fa-solid fa-file-circle-plus" description="" @click="isModalAdditionalOpen = true" />
    </div>
    <div class="col-start-6 md:col-start-10 col-end-13">
      <SearchInput id="accountAdminSearch" v-model="search" placeholder="Digite o nome do adicional" />
    </div>
  </div>
  <div v-show="foundAdditional !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-700">
      <thead class="text-xs text-gray-900 uppercase bg-gray-50">
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
        <tr v-for="(item, index) in filteredList()" :key="index" class="bg-white border-b">
          <AdditionalAdminItem :additional="item" />
        </tr>
      </tbody>
    </table>
  </div>
  <CardNotFound :found="foundAdditional" label="Adicional não encontrado!" />
  <ModalWrapper :modal-open="isModalAdditionalOpen">
    <FormAdditionalItem label-form="Novo Adicional" label-btn="Cadastrar" :additional="newAdditional" />
  </ModalWrapper>
</template>
<script setup>
import { ref, inject } from 'vue';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import AdditionalAdminItem from '../../components/AdditionalAdminItem.vue';
import BaseButton from '../../components/BaseButton.vue';
import FormAdditionalItem from '../../components/FormAdditionalItem.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';

const search = ref('');
let additionals = [];
const isModalAdditionalOpen = ref(false);
const foundAdditional = ref(0);
const newAdditional = ref({
  id: -1,
  name: '',
});

const emitter = inject('emitter');

emitter.on('setModalFalse', () => {
  isModalAdditionalOpen.value = false;
});

function loadAdditionals() {
  const data = [
    {
      id: 1,
      name: 'Rúcula',
      price: 2.00,
    },
    {
      id: 2,
      name: 'Bacon',
      price: 2.00,
    },
    {
      id: 3,
      name: 'Tomate',
      price: 2.00,
    },
    {
      id: 4,
      name: 'Ovo',
      price: 2.00,
    },
    {
      id: 5,
      name: 'Alface',
      price: 2.00,
    },
    {
      id: 6,
      name: 'Queijo',
      price: 2.00,
    },
    {
      id: 7,
      name: 'Cebola',
      price: 2.00,
    }];

  return data;
}

function thereIsAdditional(obj) {
  foundAdditional.value = Object.values(obj).length;
}

function filteredList() {
  additionals = loadAdditionals();

  // eslint-disable-next-line vue/max-len
  const filtData = additionals.filter((d) => d.name.toLowerCase().includes(search.value.toLowerCase()));
  thereIsAdditional(filtData);
  return filtData;
}
</script>
