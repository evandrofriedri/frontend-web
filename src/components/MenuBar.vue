<template>
  <div class="max-w-screen flex items-center justify-between p-2 bg-gray-50 fixed w-full top-0 left-0 shadow-md">
    <div id="div-menu" class="cursor-pointer p-2 hover:bg-gray-200 hover:rounded-xl" @click="openMenu" @keypress="openMenu">
      <button id="button-menu" type="button">
        <font-awesome-icon icon="fa-solid fa-bars" size="lg" />
      </button>
    </div>
    <div id="div-blur" hidden class="bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm" @click="closeMenu" @keypress="closeMenu" />
    <div id="menu" class="fixed p-4 top-0 w-[240px] left-[-250px] h-screen z-50 bg-gray-700 flex-col shadow-md text-white transition-all duration-200">
      <div class="text-center">
        LOGO
      </div>
      <router-link to="/" @click="closeMenu">
        <div class="px-4 py-3 hover:bg-gray-800 cursor-pointer rounded-xl duration-100">
          Cardápio
        </div>
      </router-link>
      <router-link to="/create-account" @click="closeMenu">
        <div class="px-4 py-3 hover:bg-gray-800 cursor-pointer rounded-xl duration-100">
          Meus Pedidos
        </div>
      </router-link>
      <router-link to="/create-account" @click="closeMenu">
        <div class="px-4 py-3 hover:bg-gray-800 cursor-pointer rounded-xl duration-100">
          Meus Dados
        </div>
      </router-link>
      <router-link to="/create-account" @click="closeMenu">
        <div class="px-4 py-3 hover:bg-gray-800 cursor-pointer rounded-xl duration-100">
          Sobre
        </div>
      </router-link>
    </div>
    <div>
      <router-link to="/">
        <img src="../assets/logo.png" class="h-8" alt="Logo">
      </router-link>
    </div>
    <div class="p-2 cursor-pointer font-medium hover:bg-gray-200 hover:rounded-xl">
      <router-link to="/login" class="text-base duration-100">
        <font-awesome-icon icon="fa-regular fa-user" class="mr-1" />
        Entrar
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MenuBar',
  // props: {
  //   msg: {
  //     type: String,
  //     default: '',
  //   },
  // },
  data() {
    return {
    };
  },
  methods: {
    openMenu() {
      const list = document.getElementById('menu');
      document.getElementById('div-blur').style.display = 'block';
      list.classList.remove('left-[-250px]');
      list.classList.add('left-0');
    },
    closeMenu() {
      const list = document.getElementById('menu');
      document.getElementById('div-blur').style.display = 'none';
      list.classList.remove('left-0');
      list.classList.add('left-[-250px]');
    },
  },
};
</script>
