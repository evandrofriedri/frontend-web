<template>
  <div id="sticky" class="sticky flex items-center overflow-x-auto text-gray-900 bg-gray-50 justify-between top-52 z-0 shadow-md duration-300">
    <MenuItemSticky v-for="(header) in headers" :key="header.id" :href="`#${header.id}`" :title="header.title" :class="{ active: header.id == currentSection }" />
  </div>
  <div class="container mx-auto">
    <div class="flex w-full h-48" />
    <section v-for="(header) in headers" :key="header.id">
      <SectionTitle :id="header.id" :title="header.title" />
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        <CardItem
          v-for="(product) in header.products"
          :key="product.id"
          :title="product.title"
          :description="product.description"
          :price="product.price"
          :additional="product.additional"
          :additionals="product.additionals"
          :image="product.image"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MenuItemSticky from '../components/MenuItemSticky.vue';
import CardItem from '../components/CardItem.vue';
import SectionTitle from '../components/SectionTitle.vue';

const currentSection = ref('');

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

const headers = [
  {
    id: 'promocoes',
    title: 'Promoções',
    products: [
      {
        id: 1,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: true,
        additionals: [{ name: 'Rúcula', price: 1.99 }, { name: 'Bacon', price: 1.99 }, { name: 'Tomate', price: 1.99 }, { name: 'Ovo', price: 1.99 }],
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=999&q=80',
      },
      {
        id: 2,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: true,
        additionals: [{ name: 'Rúcula', price: 1.99 }, { name: 'Bacon', price: 1.99 }, { name: 'Tomate', price: 1.99 }, { name: 'Ovo', price: 1.99 }],
        image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1520&q=80',
      },
      {
        id: 3,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: true,
        additionals: [{ name: 'Rúcula', price: 1.99 }, { name: 'Bacon', price: 1.99 }, { name: 'Tomate', price: 1.99 }, { name: 'Ovo', price: 1.99 }],
        image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80',
      },
      {
        id: 4,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: true,
        additionals: [{ name: 'Rúcula', price: 1.99 }, { name: 'Bacon', price: 1.99 }, { name: 'Tomate', price: 1.99 }, { name: 'Ovo', price: 1.99 }],
        image: 'https://images.unsplash.com/photo-1610970878459-a0e464d7592b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1524&q=80',
      },
      {
        id: 5,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: true,
        additionals: [{ name: 'Rúcula', price: 1.99 }, { name: 'Bacon', price: 1.99 }, { name: 'Tomate', price: 1.99 }, { name: 'Ovo', price: 1.99 }],
        image: 'https://images.unsplash.com/photo-1549611016-3a70d82b5040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1130&q=80',
      },
    ],
  },
  {
    id: 'combos',
    title: 'Combos',
    products: [
      {
        id: 1,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 2,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 3,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 4,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 5,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
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
        id: 1,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 2,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 3,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 4,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 5,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
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
        id: 1,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 2,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 3,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 4,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 5,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
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
        id: 1,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 2,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 3,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 4,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 5,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
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
        id: 1,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 2,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 3,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 4,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 5,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
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
        id: 1,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 2,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 3,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 4,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 5,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
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
        id: 1,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 2,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 3,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 4,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 5,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
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
        id: 1,
        title: 'Heineken',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/4374009/pexels-photo-4374009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 2,
        title: 'Budweiser',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/3222707/pexels-photo-3222707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 3,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 4,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 5,
        title: 'hamburguer da casa',
        description: 'O melhor hamburger de todos os tempos! Venha conferir! Vale muito a pena',
        price: 24.9,
        additional: false,
        image: 'https://images.pexels.com/photos/1893558/pexels-photo-1893558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ],
  },
];

</script>

<style scoped>
a.active {
  font-weight: bold;
  border-color: rgb(17 24 39 );
}
</style>
