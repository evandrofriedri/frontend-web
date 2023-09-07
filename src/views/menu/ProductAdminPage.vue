<template>
  <!-- <h1 class="mb-5 text-xl font-semibold text-gray-700">
    Produtos Cadastrados
  </h1> -->
  <div class="grid grid-cols-12 items-center mb-2">
    <div class="col-start-1 col-end-2">
      <BaseButton icon="fa-solid fa-file-circle-plus" description="" @click="isModalProductOpen = true" />
    </div>
    <div class="col-start-6 md:col-start-10 col-end-13">
      <SearchInput id="ProductAdminSearch" v-model="search" placeholder="Digite o nome do produto" />
    </div>
  </div>
  <div v-show="foundProduct !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-700">
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
            <!-- talvez um status Pago|nao pago pode ser necessario ser criado e retirado
              botao Ações -->
            Status
          </th>
          <th scope="col" class="px-2 py-2">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredList()" :key="index" class="bg-white border-b">
          <ProductAdminItem :product="item" />
        </tr>
      </tbody>
    </table>
  </div>
  <CardNotFound :found="foundProduct" label="Produto não encontrado!" />
  <Teleport to="#modal">
    <Transition name="modal">
      <div v-if="isModalProductOpen" class="flex fixed top-0 left-0 z-10 w-screen h-screen bg-black/50 justify-center items-center">
        <div ref="modal" class="relative mx-auto w-full max-w-xs md:max-w-md lg:max-w-lg bg-white shadow-2xl rounded">
          <FormProductItem :product="newProduct" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import ProductAdminItem from '../../components/ProductAdminItem.vue';
import BaseButton from '../../components/BaseButton.vue';
import FormProductItem from '../../components/FormProductItem.vue';

const modal = ref(null);
const search = ref('');
let products = [];
const isModalProductOpen = ref(false);
const foundProduct = ref(0);
const newProduct = ref({
  id: '',
  name: '',
  description: '',
  category_id: '',
  additionals: [],
  imageUrl: '',
  price: 0,
});

onClickOutside(modal, () => {
  isModalProductOpen.value = false;
});

function loadProduct() {
  const data = [
    {
      product_id: 1,
      name: 'Hamburguer da casa',
      description: 'Melhor hamburguer de todos os tempos',
      category_id: 1,
      status_id: 1,
      additionals: [3, 4],
    },
    {
      product_id: 2,
      name: 'Budweiser',
      description: 'Cerveja gelada e de qualidade',
      category_id: 4,
      status_id: 1,
      additionals: [],
    },
  ];
  return data;
}

function thereIsProduct(obj) {
  foundProduct.value = Object.values(obj).length;
}

function filteredList() {
  products = loadProduct();

  // eslint-disable-next-line vue/max-len
  const filtData = products.filter((d) => d.name.toLowerCase().includes(search.value.toLowerCase()));
  thereIsProduct(filtData);
  return filtData;
}

</script>
