<template>
  <div class="max-w-screen flex items-center justify-between p-2 bg-gray-50 w-full top-0 left-0 shadow-md">
    <div id="div-menu" @click="isOpenMenu = !isOpenMenu" @keypress="isOpenMenu = !isOpenMenu">
      <MenuButton id="menu-button" icon="fa-solid fa-bars" />
    </div>
    <Transition name="fade">
      <div v-if="isOpenMenu" class="bg-black/50 min-h-screen w-full fixed top-0 left-0" />
    </Transition>
    <Transition name="slide">
      <div v-if="isOpenMenu" ref="blur" class="fixed p-2 top-0 w-[270px] left-0 h-screen z-50 bg-gray-700 flex-col shadow-md text-white transition-all duration-500">
        <MenuItemBar icon="fa-solid fa-circle-user" label="Entre ou Cadastre-se" route="/login" />
        <MenuSeparator />
        <MenuItemBar v-if="admin" icon="fa-solid fa-users-gear" label="Gerenciar Contas" route="/userAdmin" />
        <MenuItemBar v-if="admin" icon="fa-solid fa-list-check" label="Gerenciar Cardápio" route="/menuAdmin" />
        <MenuSeparator v-if="admin" />
        <MenuItemBar icon="fa-solid fa-utensils" label="Cardápio" route="/" />
        <MenuItemBar icon="fa-solid fa-rectangle-list" label="Meus Pedidos" route="/orders" />
        <MenuItemBar icon="fa-solid fa-location-dot" label="Endereços" route="/address" />
        <MenuItemBar icon="fa-solid fa-circle-info" label="Informações" route="/about" />
        <MenuSeparator />
        <div class="">
          <LogoApp />
        </div>
      </div>
    </Transition>
    <div>
      <LogoApp />
    </div>
    <div id="div-menu" @click="searchProduct" @keypress="searchProduct">
      <MenuButton id="search-button" icon="fa-solid fa-magnifying-glass" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import LogoApp from './LogoApp.vue';
import MenuButton from './MenuButton.vue';
import MenuItemBar from './MenuItemBar.vue';
import MenuSeparator from './MenuSeparator.vue';

const isOpenMenu = ref(false);
const blur = ref(null);

const admin = ref(true);

onClickOutside(blur, () => {
  isOpenMenu.value = false;
});

</script>

<style scoped>
/* div blur */
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}

.fade-leave-active,
.fade-enter-active {
  transition: opacity 0.3s;
}

/* menu slide */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

</style>
