<template>
  <Suspense>
    <AddressComp />
  <template #fallback>
    <CardLoading />
  </template>
  </Suspense>

</template>
<script setup>
import AddressComp from '../../components/AddressComp.vue';
import CardLoading from '../../components/CardLoading.vue';

</script>