<template>
  <div id="sticky" class="sticky flex items-center overflow-x-auto text-gray-900 bg-gray-50 justify-between top-52 z-0 shadow-md duration-300">
    <MenuItemSticky v-for="(header) in headers" :key="header.id" :href="`#${header.id}`" :title="header.title" :class="{ active: header.id == currentSection }" />
  </div>
  <div class="container mx-auto">
    <div class="flex w-full h-48" />
    <section v-for="(header) in headers" :key="header.id">
      <SectionTitle :id="header.id" :title="header.title" />
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        <CardItem title="0Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
        <CardItem title="1Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
        <CardItem title="2Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
        <CardItem title="3Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
        <CardItem title="4Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
        <CardItem title="5Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
        <CardItem title="6Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
        <CardItem title="7Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
        <CardItem title="8Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
        <CardItem title="9Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
        <CardItem title="1Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
        <CardItem title="2Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
        <CardItem title="3Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
        <CardItem title="4Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
        <CardItem title="5Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
        <CardItem title="6Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
        <CardItem title="7Hamburger da Casa" description="O melhor hamburger de todos os tempos! Venha conferir! Valen muito a pena" :price="24.90" />
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
    // products: []
  },
  {
    id: 'combos',
    title: 'Combos',
  },
  {
    id: 'especiais',
    title: 'Especiais',
  },
  {
    id: 'sanduiches',
    title: 'Sanduiches',
  },
  {
    id: 'porcoes',
    title: 'Porções',
  },
  {
    id: 'classicos',
    title: 'Clássicos',
  },
  {
    id: 'sobremesas',
    title: 'Sobremesas',
  },
  {
    id: 'refrigerantes',
    title: 'Refrigerantes',
  },
  {
    id: 'cervejas',
    title: 'Cervejas',
  },
];

</script>

<style scoped>
a.active {
  font-weight: bold;
  border-color: rgb(17 24 39 );
}
</style>
