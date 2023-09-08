<template>
  <div class="grid grid-cols-12 items-center mb-2">
    <div class="col-start-1 col-end-2">
      <BaseButton icon="fa-solid fa-file-circle-plus" description="" @click="isModalCategoryOpen = true" />
    </div>
    <div class="col-start-6 md:col-start-10 col-end-13">
      <SearchInput id="accountAdminSearch" v-model="search" placeholder="Digite o nome da categoria" />
    </div>
  </div>
  <div v-show="foundCategory !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-700">
      <thead class="text-xs text-gray-900 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-2 py-2">
            Categoria
          </th>
          <th scope="col" class="px-2 py-2">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredList()" :key="index" class="bg-white border-b">
          <CategoryAdminItem :category="item" />
        </tr>
      </tbody>
    </table>
  </div>
  <CardNotFound :found="foundCategory" label="Categoria não encontrada!" />
  <ModalWrapper :modal-open="isModalCategoryOpen">
    <FormCategoryItem label-form="Nova Categoria" label-btn="Cadastrar" :category="newCategory" />
  </ModalWrapper>
</template>
<script setup>
import { ref, inject } from 'vue';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import CategoryAdminItem from '../../components/CategoryAdminItem.vue';
import BaseButton from '../../components/BaseButton.vue';
import FormCategoryItem from '../../components/FormCategoryItem.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';

const search = ref('');
let categories = [];
const isModalCategoryOpen = ref(false);
const foundCategory = ref(0);
const newCategory = ref({
  id: -1,
  name: '',
});

const emitter = inject('emitter');

emitter.on('setModalFalse', () => {
  isModalCategoryOpen.value = false;
});

function loadCategories() {
  const data = [
    {
      id: '',
      name: 'Selecione',
    },
    {
      id: 1,
      name: 'Promoções',
    },
    {
      id: 2,
      name: 'Combos',
    },
    {
      id: 3,
      name: 'Clássicos',
    },
    {
      id: 4,
      name: 'Cervejas',
    },
    {
      id: 5,
      name: 'Refrigerantes',
    },
  ];

  return data;
}

function thereIsCategory(obj) {
  foundCategory.value = Object.values(obj).length;
}

function filteredList() {
  categories = loadCategories();

  // eslint-disable-next-line vue/max-len
  const filtData = categories.filter((d) => d.name.toLowerCase().includes(search.value.toLowerCase()));
  thereIsCategory(filtData);
  return filtData;
}
</script>
