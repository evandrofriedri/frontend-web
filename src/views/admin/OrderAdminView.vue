<template>
  <Suspense>
    <OrdersAdminComp />
  <template #fallback>
    <CardLoading />
  </template>
  </Suspense>

</template>
<script setup>
import OrdersAdminComp from '../../components/OrderAdminComp.vue';
import CardLoading from '../../components/CardLoading.vue';
</script>