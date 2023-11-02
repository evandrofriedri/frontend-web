<template>
  <div class="grid grid-cols-12 items-center mb-2">
    <div class="col-start-1 col-end-2">
      <BaseButton icon="fa-solid fa-file-circle-plus" description="" @click="isModalProductOpen = true" />
    </div>
    <div class="col-start-6 md:col-start-10 col-end-13">
      <SearchInput id="ProductAdminSearch" v-model="search" placeholder="Digite o nome do produto" />
    </div>
  </div>
  <div v-show="foundProduct !== 0" ref="listEl" class="p-5 max-h-[600px] bg-white shadow-md rounded mb-3 overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-800">
      <thead class="text-xs text-gray-900 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-2 py-2">
            Produto
          </th>
          <th scope="col" class="px-2 py-2">
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
        <tr v-for="(item, index) in filteredList(productList)" :key="index" class="bg-white border-b">
          <ProductAdminItem :product="item" />
        </tr>
      </tbody>
    </table>
  </div>
  <CardNotFound :found="foundProduct" label="Produto não encontrado!" />
  <ModalWrapper :modal-open="isModalProductOpen">
    <FormProduct label-form="Novo Produto" label-btn="Cadastrar" :product="newProduct" />
  </ModalWrapper>
</template>
<script setup>
import { onMounted, ref, inject } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import ProductAdminItem from '../../components/ProductAdminItem.vue';
import BaseButton from '../../components/BaseButton.vue';
import FormProduct from '../../components/FormProduct.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';
import ProductService from '../../services/ProductService';

const search = ref('');
const productList = ref([]);
const isModalProductOpen = ref(false);
const foundProduct = ref(0);
const newProduct = ref({
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
emitter.on('setModalFalse', () => {
  newProduct.value = {
    id: '',
    name: '',
    description: '',
    category_id: '',
    additionals: [],
    imageUrl: '',
    price: 0,
  };
  isModalProductOpen.value = false;
});

async function loadData() {
  const response = await ProductService.getProducts(JSON.stringify({
    limit: itemsToShow.value, offset: page.value,
  }));
  response.forEach((element) => {
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

  return response;
}

const getDataOnScroll = async () => {
  if (!stopQuery.value) {
    page.value += itemsToShow.value;
    const newData = await ProductService.getProducts(JSON.stringify({
      limit: itemsToShow.value, offset: page.value,
    }));
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

    if (newData.length === 0) {
      stopQuery.value = true;
    }
    productList.value.push(...newData);
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

function filteredList(data) {
  // eslint-disable-next-line vue/max-len
  const filtData = data.filter((d) => d.name.toLowerCase().includes(search.value.toLowerCase()));
  thereIsProduct(filtData);
  return filtData;
}

onMounted(async () => {
  productList.value = await loadData();
  productList.value = await filteredList(productList.value);
});

</script>
