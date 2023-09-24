<template>
  <header>
    <MenuBar />
  </header>
  <main>
    <Suspense>
      <slot />
      <template #fallback>
        <CardLoading />
      </template>
    </Suspense>
  </main>
  <footer>
    <FooterBar />
  </footer>
</template>

<script setup>
import FooterBar from '../components/FooterBar.vue';
import MenuBar from '../components/MenuBar.vue';
import CardLoading from '../components/CardLoading.vue';
</script>
