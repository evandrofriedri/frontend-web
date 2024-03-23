<template>
  <div class="fixed z-10 right-2 top-3">
    <SearchInput id="homeSearch" v-model="search" placeholder="Digite o produto..." @keyup.stop="filter()" />
  </div>
  <LogoContainer />
  <div id="sticky" class="sticky flex items-center overflow-x-auto text-gray-900 bg-gray-50 justify-between top-14 z-0 shadow-md">
    <MenuItemSticky v-for="(data) in filteredList" :key="data.category_id" :href="`#${data.category_id}`" :title="data.name" :class="{ active: data.category_id == currentSection }" />
  </div>
  <div class="container mx-auto">
    <section v-for="(data) in filteredList" :key="data.category_id">
      <SectionTitle :id="data.category_id" :title="data.name" />
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        <CardItem v-for="(product) in data.products" :key="product.product_id" :product="product" />
      </div>
    </section>
    <CardNotFound :found="foundProduct" label="Produto não encontrado!" />
  </div>
  <ServiceWorker :user="user" />
</template>
<script setup>
import {
  ref,
  onMounted,
} from 'vue';
import { jwtDecode } from "jwt-decode";
import CardItem from './CardItem.vue';
import SectionTitle from './SectionTitle.vue';
import CardNotFound from './CardNotFound.vue';
import MenuItemSticky from './MenuItemSticky.vue';
import SearchInput from './SearchInput.vue';
import CategoryService from '../services/CategoryService';
import LogoContainer from './LogoContainer.vue';
import ServiceWorker from './ServiceWorker.vue';

const currentSection = ref('');
const search = ref('');
const foundProduct = ref(1);
const menuList = ref(null);
const filteredList = ref([]);
const user = ref(null);

function getUser() {
  let tokenDecoded = null;
  if (localStorage.getItem('jwt') !== null) {
    const token = JSON.parse(localStorage.getItem('jwt')).value;
    tokenDecoded = jwtDecode(token);
  }
  return tokenDecoded;
}

function thereIsProduct(obj) {
  if (obj[0].category_id === 'busca') {
    foundProduct.value = obj[0].products.length;
  } else {
    foundProduct.value = 1;
  }
}

const loadData = async () => {
  user.value = getUser();
  if (localStorage.getItem('menuList') === null) {
    menuList.value = await CategoryService.getCategoriesWithProducts();
    const expiresIn = new Date().getTime() + (parseInt(process.env.VUE_APP_MENU_EXPIRATION_TIME, 10));

    if (menuList.value != false) {
      await localStorage.setItem('menuList', JSON.stringify({ value: menuList.value, expires: expiresIn }));
    }
  } else {
    menuList.value = JSON.parse(localStorage.getItem('menuList')).value;
  }

  filteredList.value = JSON.parse(JSON.stringify(menuList.value));
}

const filter = async () => {

  let filtData = [];
  const arrSearch = {
    category_id: 'busca',
    name: 'Resultado da Busca',
    products: [],
  };
  if (search.value.trim() !== '') {
    menuList.value.forEach((element) => {
      if ( (element.products !== undefined) && (element.products !== null) ) {
        element.products.forEach((pdt) => {
          const pdtLowCase = pdt.name.toLowerCase();
          if (pdtLowCase.includes(search.value.toLowerCase())) {
            arrSearch.products.push(pdt);
          }
        });
      }
    });
    filtData.push(arrSearch);
    filteredList.value = filtData;
  } else {
    filteredList.value = JSON.parse(JSON.stringify(menuList.value));
  }
  thereIsProduct(filteredList.value);
}
await loadData();

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          currentSection.value = entry.target.getAttribute('id');

          // document.querySelector('#sticky').scrollLeft = 100, 0);
        }
      });
    },
    {
      rootMargin: '0px 0px -85% 0px',
    },
  );
  document.querySelectorAll('h2').forEach((section) => {
    observer.observe(section);
  });
});

</script>

<style scoped>
a.active {
  font-weight: bold;
  border-color: rgb(17 24 39);
}
</style>
