<template>
  <div id="parent-menu" class="fixed pt-2 pb-40 pl-2 pr-2 w-full top-0 left-0 z-10 flex justify-between bg-cover bg-center shadow-md duration-300">
    <div id="menu-button" @click="toggleMenu()" @keypress="toggleMenu()">
      <MenuButton icon="fa-solid fa-bars" />
    </div>
  </div>
  <Transition name="slide">
    <div v-if="isOpenMenu" ref="blur" class="fixed p-2 top-0 w-[270px] left-0 h-screen z-50 bg-gray-700 flex-col">
      <MenuItemBar icon="fa-solid fa-circle-user" :label="firstName[0]" :description="email" route="/login" />
      <SubMenuItemBar icon="fa-solid fa-user-gear" label="Gerenciar Conta" route="/userSetting" @click="toggleMenu()" />
      <SubMenuItemBar icon="fa-solid fa-list-check" label="Meus Pedidos" route="/orders" @click="toggleMenu()" />
      <SubMenuItemBar icon="fa-solid fa-address-card" label="Meus Endereços" route="/address" @click="toggleMenu()" />
      <MenuSeparator />
      <MenuItemBar v-if="admin" icon="fa-solid fa-kitchen-set" label="Gerenciar Pedidos" route="/orderAdmin" @click="toggleMenu()" />
      <MenuItemBar v-if="admin" icon="fa-solid fa-users-gear" label="Gerenciar Contas" route="/userAdmin" @click="toggleMenu()" />
      <MenuItemBar v-if="admin" icon="fa-solid fa-list-ol" label="Gerenciar Cardápio" route="/menuAdmin" @click="toggleMenu()" />
      <MenuSeparator v-if="admin" />
      <MenuItemBar icon="fa-solid fa-utensils" label="Cardápio" route="/" @click="toggleMenu()" />
      <MenuItemBar icon="fa-solid fa-circle-info" label="Informações" route="/about" @click="toggleMenu()" />
      <MenuSeparator />
      <div class="">
        <LogoApp />
      </div>
    </div>
  </Transition>
  <Transition name="fade">
    <div v-if="isOpenMenu" class="fixed top-0 left-0 bg-black/50 min-h-screen z-20 w-full" />
  </Transition>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import LogoApp from './LogoApp.vue';
import MenuButton from './MenuButton.vue';
import MenuItemBar from './MenuItemBar.vue';
import MenuSeparator from './MenuSeparator.vue';
import SubMenuItemBar from './SubMenuItemBar.vue';

const isOpenMenu = ref(false);
const blur = ref(null);

const fullName = ref('Evandro Mathias Friedrichsen');
const firstName = fullName.value.split(' ');
const email = 'evandrofriedri@gmail.com';
const admin = ref(true);

onClickOutside(blur, () => {
  isOpenMenu.value = false;
});

function toggleMenu() {
  isOpenMenu.value = !isOpenMenu.value;
}

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

#parent-menu {
  background-image: url('../assets/capa6.jpg');
}

</style>
