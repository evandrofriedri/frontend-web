<template>
  <header>
    <div class="max-w-screen flex items-center justify-between p-2 bg-gray-50 w-full top-0 left-0 shadow-md">
      <div id="div-menu" @click="openMenu" @keypress="openMenu">
        <MenuButton id="menu-button" icon="fa-solid fa-bars" />
      </div>
      <div id="div-blur" hidden class="bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm" @click="closeMenu" @keypress="closeMenu" />
      <div id="menu" class="fixed p-2 top-0 w-[270px] left-[-280px] h-screen z-50 bg-gray-700 flex-col shadow-md text-white transition-all duration-200">
        <MenuItemBar icon="fa-solid fa-circle-user" label="Entre ou Cadastre-se" route="/login" @click="closeMenu" />
        <MenuSeparator />
        <MenuItemBar v-if="admin" icon="fa-solid fa-users-gear" label="Gerenciar Contas" route="/userAdmin" @click="closeMenu" />
        <MenuItemBar v-if="admin" icon="fa-solid fa-list-check" label="Gerenciar Cardápio" route="/menuAdmin" @click="closeMenu" />
        <MenuSeparator v-if="admin" />
        <MenuItemBar icon="fa-solid fa-utensils" label="Cardápio" route="/" @click="closeMenu" />
        <MenuItemBar icon="fa-solid fa-rectangle-list" label="Meus Pedidos" route="/orders" @click="closeMenu" />
        <MenuItemBar icon="fa-solid fa-location-dot" label="Endereços" route="/address" @click="closeMenu" />
        <MenuItemBar icon="fa-solid fa-circle-info" label="Informações" route="/about" @click="closeMenu" />
        <MenuSeparator />
        <div class="">
          <LogoApp />
        </div>
      </div>
      <div>
        <LogoApp />
      </div>
      <div id="div-menu" @click="searchProduct" @keypress="searchProduct">
        <MenuButton id="search-button" icon="fa-solid fa-magnifying-glass" />
      </div>
    </div>
  </header>
</template>

<script setup>
import LogoApp from './LogoApp.vue';
import MenuButton from './MenuButton.vue';
import MenuItemBar from './MenuItemBar.vue';
import MenuSeparator from './MenuSeparator.vue';

const admin = true;

function openMenu() {
  const list = document.getElementById('menu');
  document.getElementById('div-blur').style.display = 'block';
  list.classList.remove('left-[-280px]');
  list.classList.add('left-0');
}

function closeMenu() {
  const list = document.getElementById('menu');
  document.getElementById('div-blur').style.display = 'none';
  list.classList.remove('left-0');
  list.classList.add('left-[-280px]');
}

</script>
