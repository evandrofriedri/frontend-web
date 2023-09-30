<template>
  <ShoppingCart />
  <Suspense>
    <SectionHome />
    <template #fallback>
      <CardLoading />
    </template>
  </Suspense>
</template>

<script setup>
import ShoppingCart from '../components/ShoppingCart.vue';
import SectionHome from '../components/SectionHome.vue';
import CardLoading from '../components/CardLoading.vue';
</script>
