<template>
  <div class="grid grid-cols-12 items-center mb-2">
    <div class="col-start-1 col-end-2">
      <BaseButton icon="fa-solid fa-file-circle-plus" description="" @click="isModalCategoryOpen = true" />
    </div>
    <div class="col-start-6 md:col-start-10 col-end-13">
      <SearchInput id="categoryAdminSearch" v-model="search" placeholder="Digite o nome da categoria" />
    </div>
  </div>
  <div v-show="foundCategory !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-800">
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
        <tr v-for="(item, index) in filteredList(categoryList)" :key="index" class="bg-white border-b hover:bg-gray-200 duration-300">
          <CategoryAdminItem :category="item" />
        </tr>
      </tbody>
    </table>
  </div>
  <CardNotFound :found="foundCategory" label="Categoria não encontrada!" />
  <ModalWrapper :modal-open="isModalCategoryOpen">
    <FormCategory label-form="Nova Categoria" label-btn="Cadastrar" :category="newCategory" />
  </ModalWrapper>
</template>
<script setup>
import { onMounted, ref, inject } from 'vue';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import CategoryAdminItem from '../../components/CategoryAdminItem.vue';
import BaseButton from '../../components/BaseButton.vue';
import FormCategory from '../../components/FormCategory.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';
import CategoryService from '../../services/CategoryService';

const search = ref('');
const categoryList = ref([]);
const isModalCategoryOpen = ref(false);
const foundCategory = ref(0);
const newCategory = ref({
  name: null,
});

const emitter = inject('emitter');
emitter.on('setModalFalse', () => {
  newCategory.value = {
    name: null,
  };
  isModalCategoryOpen.value = false;
});

async function loadData() {
  const response = await CategoryService.getCategories();
  return response;
}

function thereIsCategory(obj) {
  foundCategory.value = Object.values(obj).length;
}

function filteredList(data) {
  // eslint-disable-next-line vue/max-len
  const filtData = data.filter((d) => d.name.toLowerCase().includes(search.value.toLowerCase()));
  thereIsCategory(filtData);
  return filtData;
}

onMounted(async () => {
  categoryList.value = await loadData();
  categoryList.value = await filteredList(categoryList.value);
});
</script>
