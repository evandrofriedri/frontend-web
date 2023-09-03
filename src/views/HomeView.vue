<template>
  <div class="fixed z-10 right-2 top-3">
    <SearchInput id="homeSearch" v-model="search" placeholder="Digite o nome do produto..." />
  </div>
  <ShoppingCart />
  <div id="sticky" class="sticky flex items-center overflow-x-auto text-gray-900 bg-gray-50 justify-between top-52 z-0 shadow-md duration-300">
    <MenuItemSticky v-for="(data) in datas" :key="data.id" :href="`#${data.id}`" :title="data.title" :class="{ active: data.id == currentSection }" />
  </div>
  <div class="container mx-auto">
    <div class="flex w-full h-48" />
    <section v-for="(data) in filteredList()" :key="data.id">
      <SectionTitle :id="data.id" :title="data.title" />
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        <CardItem
          v-for="(product) in data.products"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
    <CardNotFound :found="foundProduct" label="Produto não encontrado!" />
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import MenuItemSticky from '../components/MenuItemSticky.vue';
import CardItem from '../components/CardItem.vue';
import SectionTitle from '../components/SectionTitle.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import SearchInput from '../components/SearchInput.vue';
import CardNotFound from '../components/CardNotFound.vue';

const currentSection = ref('');
const search = ref('');
const emitter = inject('emitter');
const foundProduct = ref(0);

function updateCart() {
  emitter.emit('update');
}

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
  updateCart();
});

const datas = [
  {
    id: 'promocoes',
    title: 'Promoções',
    products: [
      {
        id: 1,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: true,
        additionals: [{ id: 1, name: 'Rúcula', price: 2.00 }, { id: 2, name: 'Bacon', price: 2.00 }, { id: 3, name: 'Tomate', price: 2.00 }, { id: 4, name: 'Ovo', price: 2.00 }],
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=999&q=80',
      },
      {
        id: 2,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: true,
        additionals: [{ id: 1, name: 'Rúcula', price: 2.00 }, { id: 2, name: 'Bacon', price: 2.00 }, { id: 3, name: 'Tomate', price: 2.00 }, { id: 4, name: 'Ovo', price: 2.00 }],
        image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1520&q=80',
      },
      {
        id: 3,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: true,
        additionals: [{ id: 1, name: 'Rúcula', price: 2.00 }, { id: 2, name: 'Bacon', price: 2.00 }, { id: 3, name: 'Tomate', price: 2.00 }, { id: 4, name: 'Ovo', price: 2.00 }],
        image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80',
      },
      {
        id: 4,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: true,
        additionals: [{ id: 1, name: 'Rúcula', price: 2.00 }, { id: 2, name: 'Bacon', price: 2.00 }, { id: 3, name: 'Tomate', price: 2.00 }, { id: 4, name: 'Ovo', price: 2.00 }],
        image: 'https://images.unsplash.com/photo-1610970878459-a0e464d7592b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1524&q=80',
      },
      {
        id: 5,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: true,
        additionals: [{ id: 1, name: 'Rúcula', price: 2.00 }, { id: 2, name: 'Bacon', price: 2.00 }, { id: 3, name: 'Tomate', price: 2.00 }, { id: 4, name: 'Ovo', price: 2.00 }],
        image: 'https://images.unsplash.com/photo-1549611016-3a70d82b5040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1130&q=80',
      },
    ],
  },
  {
    id: 'combos',
    title: 'Combos',
    products: [
      {
        id: 6,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 7,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 8,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 9,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 10,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1893558/pexels-photo-1893558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ],
  },
  {
    id: 'especiais',
    title: 'Especiais',
    products: [
      {
        id: 11,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 12,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 13,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 14,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 15,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1893558/pexels-photo-1893558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ],
  },
  {
    id: 'sanduiches',
    title: 'Sanduiches',
    products: [
      {
        id: 16,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 17,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 18,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 19,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 20,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1893558/pexels-photo-1893558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ],
  },
  {
    id: 'porcoes',
    title: 'Porções',
    products: [
      {
        id: 21,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 22,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 23,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 24,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 25,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1893558/pexels-photo-1893558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ],
  },
  {
    id: 'classicos',
    title: 'Clássicos',
    products: [
      {
        id: 26,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 27,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 28,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 29,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 30,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1893558/pexels-photo-1893558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ],
  },
  {
    id: 'sobremesas',
    title: 'Sobremesas',
    products: [
      {
        id: 31,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 32,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 33,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 34,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 35,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1893558/pexels-photo-1893558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ],
  },
  {
    id: 'refrigerantes',
    title: 'Refrigerantes',
    products: [
      {
        id: 36,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 37,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 38,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 39,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 40,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1893558/pexels-photo-1893558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ],
  },
  {
    id: 'cervejas',
    title: 'Cervejas',
    products: [
      {
        id: 41,
        name: 'Heineken',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/4374009/pexels-photo-4374009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 42,
        name: 'Budweiser',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/3222707/pexels-photo-3222707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 43,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 44,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 45,
        name: 'Hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 26,
        additional: false,
        image: 'https://images.pexels.com/photos/1893558/pexels-photo-1893558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ],
  },
];

function thereIsProduct(obj) {
  foundProduct.value = Object.values(obj[0].products).length;
}

function filteredList() {
  let filtData = [];
  const arrSearch = {
    id: 'busca',
    title: 'Resultado da Busca',
    products: [],
  };
  if (search.value !== '') {
    datas.forEach((element) => {
      element.products.forEach((pdt) => {
        const pdtLowCase = pdt.name.toLowerCase();
        if (pdtLowCase.includes(search.value.toLowerCase())) {
          arrSearch.products.push(pdt);
        }
      });
    });
    filtData.push(arrSearch);
  } else {
    filtData = datas;
  }

  thereIsProduct(filtData);
  return filtData;
}

</script>

<style scoped>
a.active {
  font-weight: bold;
  border-color: rgb(17 24 39 );
}
</style>
