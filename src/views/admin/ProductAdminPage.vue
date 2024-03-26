<template>
  <div class="grid gap-1 grid-cols-12 items-center mb-2">
    <div class="col-start-1 md:col-end-2 col-end-3">
      <BaseButton id="newProduct" icon="fa-solid fa-file-circle-plus" description="" title="Criar novo produto" @click="isModalProductOpen = true" />
    </div>
    <div class="col-start-5 md:col-start-9 col-end-7 md:col-end-10">
      <PrintButton id="exportData" :data="filteredList" filename="productList" />
    </div>
    <div class="col-start-7 md:col-start-10 col-end-13">
      <SearchInput id="productAdminSearch" v-model="search" placeholder="Digite o produto..." @keyup.stop="filter()" />
    </div>
  </div>
  <div v-show="foundProduct !== 0" ref="listEl" class="p-5 max-h-[600px] bg-white shadow-md rounded mb-3 overflow-x-auto">
    <table id="print-document" class="w-full text-sm text-left text-gray-800">
      <thead class="text-xs text-gray-900 uppercase bg-gray-200">
        <tr>
          <th scope="col" class="px-2 py-2">
            Produto
          </th>
          <th scope="col" class="px-2 py-2 hidden sm:table-cell">
            Descrição
          </th>
          <th scope="col" class="px-2 py-2">
            Categoria
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
          <ProductAdminItem :product="item" />
        </tr>
      </tbody>
    </table>
  </div>
  <CardNotFound :found="foundProduct" label="Produto não encontrado!" />
  <ModalWrapper :modal-open="isModalProductOpen" screen="FormProduct-0">
    <FormProduct label-form="Novo Produto" label-btn="Cadastrar" :product="newProduct" />
  </ModalWrapper>
</template>
<script setup>
import { ref, inject } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import ProductAdminItem from '../../components/ProductAdminItem.vue';
import BaseButton from '../../components/BaseButton.vue';
import FormProduct from '../../components/FormProduct.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';
import ProductService from '../../services/ProductService';
import PrintButton from '../../components/PrintButton.vue';

const search = ref('');
const productList = ref([]);
const filteredList = ref([]);
const isModalProductOpen = ref(false);
const foundProduct = ref(0);
const newProduct = ref({
  product_id: 0,
  name: null,
  description: null,
  category_id: null,
  additionals: [],
  imageUrl: null,
  price: null,
});
const listEl = ref(null);
const itemsToShow = ref(10);
const page = ref(0);
const stopQuery = ref(false);

const emitter = inject('emitter');

emitter.on('setModalFalse-FormProduct-0', () => {
  newProduct.value = {
    product_id: 0,
    name: '',
    description: '',
    category_id: '',
    additionals: [],
    imageUrl: '',
    price: 0,
  };
  isModalProductOpen.value = false;
});

emitter.on('reloadProduct', async () => {
  page.value = 0;
  search.value = '';
  await loadData();

  await useInfiniteScroll(
    listEl,
    async () => {
      await getDataOnScroll();
    },
    { distance: 10 },
  );
});

const getDataOnScroll = async () => {
  if (!stopQuery.value) {
    page.value += itemsToShow.value;
    const newData = await ProductService.getProducts(JSON.stringify({
      limit: itemsToShow.value, offset: page.value,
    }));

    if (newData) {
      newData.forEach((element) => {
        if (element.additionals !== null) {
          const arr = element.additionals.split(',');
          const numberArray = arr.map(Number);
          // eslint-disable-next-line no-param-reassign
          element.additionals = numberArray;
        } else {
          // eslint-disable-next-line no-param-reassign
          element.additionals = [];
        }
      });
    }

    if (newData.length === 0 || newData === false) {
      stopQuery.value = true;
    }
    productList.value.push(...newData);
    filteredList.value = productList.value;
  }
};

useInfiniteScroll(
  listEl,
  async () => {
    await getDataOnScroll();
  },
  { distance: 10 },
);

function thereIsProduct(obj) {
  foundProduct.value = Object.values(obj).length;

}

const loadData = async () => {
  productList.value = await ProductService.getProducts(JSON.stringify({
    limit: itemsToShow.value, offset: page.value,
  }));
  productList.value.forEach((element) => {
    if (element.additionals !== null) {
      const arr = element.additionals.split(',');
      const numberArray = arr.map(Number);
      // eslint-disable-next-line no-param-reassign
      element.additionals = numberArray;
    } else {
      // eslint-disable-next-line no-param-reassign
      element.additionals = [];
    }
  });
  thereIsProduct(productList.value);

  filteredList.value = productList.value;
}

const filter = async () => {
  if (search.value.trim() !== '') {
    filteredList.value = await ProductService.getProductName(search.value);
    filteredList.value.forEach((element) => {
      if (element.additionals !== null) {
        const arr = element.additionals.split(',');
        const numberArray = arr.map(Number);
        // eslint-disable-next-line no-param-reassign
        element.additionals = numberArray;
      } else {
        // eslint-disable-next-line no-param-reassign
        element.additionals = [];
      }
    });
    stopQuery.value = true;
  } else {
    filteredList.value = productList.value;
    stopQuery.value = false;
  }
  thereIsProduct(filteredList.value);
}

await loadData();
</script>
