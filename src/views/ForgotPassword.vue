<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
      Esqueceu a senha
    </h1>
    <div class="p-5 bg-white shadow-md rounded mb-3">
      <p>Entre em contato com a administração:</p>
      <br>
      <p>email@email.com</p>
      <br>
      <div class="grid grid-cols-12">
        <div class="col-start-7 md:col-start-9 col-end-13">
          <router-link to="/login">
            <BaseButton icon="fa-solid fa-arrow-left" description="Retornar" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseButton from '../components/BaseButton.vue';

</script>
