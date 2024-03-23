<template>
  <div class="grid gap-1 grid-cols-12 items-center mb-2">
    <div class="col-start-1 md:col-end-2 col-end-3">
      <BaseButton id="newCategory" icon="fa-solid fa-file-circle-plus" description="" title="Criar nova categoria" @click="isModalCategoryOpen = true" />
    </div>
    <div class="col-start-5 md:col-start-9 col-end-7 md:col-end-10">
      <PrintButton id="exportData" :data="filteredList" filename="categoryList" />
    </div>
    <div class="col-start-7 md:col-start-10 col-end-13">
      <SearchInput id="categoryAdminSearch" v-model="search" placeholder="Digite a categoria..." @keyup.stop="filter()" />
    </div>
  </div>
  <div v-show="foundCategory !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
    <table id="print-document" class="w-full text-sm text-left text-gray-800">
      <thead class="text-xs text-gray-900 uppercase bg-gray-200">
        <tr>
          <th scope="col" class="px-2 py-2">
            Categoria
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
          <CategoryAdminItem :category="item" />
        </tr>
      </tbody>
    </table>
  </div>
  <CardNotFound :found="foundCategory" label="Categoria não encontrada!" />
  <ModalWrapper :modal-open="isModalCategoryOpen" screen="FormCategory-0">
    <FormCategory label-form="Nova Categoria" label-btn="Cadastrar" :category="newCategory" />
  </ModalWrapper>
</template>
<script setup>
import { ref, inject } from 'vue';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import CategoryAdminItem from '../../components/CategoryAdminItem.vue';
import BaseButton from '../../components/BaseButton.vue';
import FormCategory from '../../components/FormCategory.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';
import CategoryService from '../../services/CategoryService';
import PrintButton from '../../components/PrintButton.vue';

const search = ref('');
const categoryList = ref([]);
const filteredList = ref([]);
const isModalCategoryOpen = ref(false);
const foundCategory = ref(0);
const newCategory = ref({
  category_id: 0,
  name: null,
});

const emitter = inject('emitter');

emitter.on('setModalFalse-FormCategory-0', () => {
  newCategory.value = {
    category_id: 0,
    name: null,
  };
  isModalCategoryOpen.value = false;
});

emitter.on('reloadCategory', async () => {
  await loadData();
});

async function loadData() {
  categoryList.value = await CategoryService.getCategories();
  thereIsCategory(categoryList.value);

  filteredList.value = JSON.parse(JSON.stringify(categoryList.value));
}

function thereIsCategory(obj) {
  foundCategory.value = Object.values(obj).length;
}

const filter = async () => {
  if (search.value.trim() !== '') {
    filteredList.value = await CategoryService.getCategoryName(search.value);
  } else {
    filteredList.value = JSON.parse(JSON.stringify(categoryList.value));
  }
  thereIsCategory(filteredList.value);
}

await loadData();
</script>
