<template>
  <div id="parent-menu" class="fixed p-2 w-full top-0 left-0 z-10 flex bg-gray-900 opacity-80 shadow-md">
    <div id="menu-button" @click="toggleMenu()" @keypress="toggleMenu()">
      <MenuButton icon="fa-solid fa-bars" />
    </div>
  </div>
  <Transition name="slide">
    <div v-if="isOpenMenu" ref="blur" class="fixed p-2 top-0 w-[270px] left-0 h-screen z-50 bg-gray-700 flex-col">
      <UserMenu v-if="user" :key="user" :label="user.name.split(' ')[0]" :description="user.email" :image_url="user.image_url" />
      <MenuItemBar v-else icon="fa-solid fa-circle-user" label="Entrar ou Cadastrar" description="" route="/login" />
      <SubMenuItemBar v-if="user" :key="user" icon="fa-solid fa-user-gear" label="Gerenciar Conta" route="/account" @click="toggleMenu()" />
      <SubMenuItemBar v-if="user" :key="user" icon="fa-solid fa-clipboard-check" label="Meus Pedidos" route="/account/order" @click="toggleMenu()" />
      <SubMenuItemBar v-if="user" :key="user" icon="fa-solid fa-address-card" label="Meus Endereços" route="/account/address" @click="toggleMenu()" />
      <SubMenuItemBar v-if="user" :key="user" icon="fa-solid fa-arrow-right-from-bracket" label="Sair" description="" route="/" @click="logOutUser()" />
      <MenuSeparator v-if="user.role_name === 'admin' || user.role_name === 'employee'" :key="user" />
        <MenuItemBar v-if="user.role_name === 'admin' || user.role_name === 'employee'" :key="user" icon="fa-solid fa-list-check" label="Gerenciar Pedidos" route="/admin/order" @click="toggleMenu()" />
        <MenuItemBar v-if="user.role_name === 'admin'" :key="user" icon="fa-solid fa-users-gear" label="Gerenciar Contas" route="/admin/account" @click="toggleMenu()" />
        <MenuItemBar v-if="user.role_name === 'admin'" :key="user" icon="fa-solid fa-list-ol" label="Gerenciar Cardápio" route="/admin/menu" @click="toggleMenu()" />
        <MenuItemBar v-if="user.role_name === 'admin'" :key="user" icon="fa-solid fa-chart-line" label="Estatísticas" route="/admin/stats" @click="toggleMenu()" />
        <MenuSeparator />
      <MenuItemBar icon="fa-solid fa-burger" label="Cardápio" route="/" @click="toggleMenu()" />
      <MenuItemBar icon="fa-solid fa-circle-info" label="Sobre" route="/about" @click="toggleMenu()" />
      <MenuSeparator />
      <div class="flex mx-auto justify-center">
        <LogoCard class="h-20 w-24" />
      </div>
    </div>
  </Transition>
  <Transition name="fade">
    <div v-if="isOpenMenu" class="fixed top-0 left-0 bg-black/50 min-h-screen z-20 w-full" />
  </Transition>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'vue-router';
import { googleLogout } from 'vue3-google-login';
import MenuButton from './MenuButton.vue';
import MenuItemBar from './MenuItemBar.vue';
import MenuSeparator from './MenuSeparator.vue';
import SubMenuItemBar from './SubMenuItemBar.vue';
import UserMenu from './UserMenu.vue';
import LogoCard from './LogoCard.vue';

const router = useRouter();

const user = ref(null);

const isOpenMenu = ref(false);
const blur = ref(null);

onClickOutside(blur, () => {
  isOpenMenu.value = false;
});

function getUser() {
  let tokenDecoded = false;
  if (localStorage.getItem('jwt') !== null) {
    const token = JSON.parse(localStorage.getItem('jwt')).value;
    tokenDecoded = jwtDecode(token);
  }
  return tokenDecoded;
}

function logOutUser() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('cartDelivery');
  googleLogout();
  router.go(0);
}

function toggleMenu() {
  isOpenMenu.value = !isOpenMenu.value;
  user.value = getUser();
}

onMounted(async () => {
  user.value = getUser();
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
  transition: opacity 0.25s;
}

/* menu slide */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
