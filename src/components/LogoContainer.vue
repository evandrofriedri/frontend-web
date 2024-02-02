<template>
  <div id="container-logo" class="flex shadow-md justify-center items-center top-0 h-80 bg-cover bg-center">
    <LogoCard class="h-40 w-48" />
  </div>
</template>

<script setup>
import LogoCard from './LogoCard.vue';

</script>
<style scoped>
#container-logo {
  background-image: url('../assets/capa.jpg');
}
</style>

