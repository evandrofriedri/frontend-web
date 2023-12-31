<template>
  <Suspense>
    <OrdersComp />
  <template #fallback>
    <CardLoading />
  </template>
  </Suspense>

</template>
<script setup>
import OrdersComp from '../../components/OrdersComp.vue';
import CardLoading from '../../components/CardLoading.vue';
</script>