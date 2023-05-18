<template>
  <header>
    <div class="max-w-screen flex items-center justify-between p-2 bg-gray-50 w-full top-0 left-0 shadow-md">
      <div id="div-menu" class="cursor-pointer p-2 hover:bg-gray-200 hover:rounded-xl" @click="openMenu" @keypress="openMenu">
        <button id="button-menu" type="button">
          <font-awesome-icon icon="fa-solid fa-bars" size="xl" />
        </button>
      </div>
      <div id="div-blur" hidden class="bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm" @click="closeMenu" @keypress="closeMenu" />
      <div id="menu" class="fixed p-4 top-0 w-[240px] left-[-250px] h-screen z-50 bg-gray-700 flex-col shadow-md text-white transition-all duration-200">
        <div class="px-4 py-3 hover:bg-gray-800 cursor-pointer rounded-xl duration-300">
          <router-link to="/login" class="duration-100">
            <font-awesome-icon icon="fa-solid fa-circle-user" size="xl" class="mr-2" />
            Entrar
          </router-link>
        </div>
        <div class="py-4 items-center">
          <div class="flex-grow border-t border-gray-600" />
        </div>
        <router-link to="/" @click="closeMenu">
          <div class="px-4 py-3 hover:bg-gray-800 cursor-pointer rounded-xl duration-300">
            <font-awesome-icon icon="fa-solid fa-table-list" size="xl" class="mr-2" />
            Cardápio
          </div>
        </router-link>
        <router-link to="/create-account" @click="closeMenu">
          <div class="px-4 py-3 hover:bg-gray-800 cursor-pointer rounded-xl duration-300">
            Meus Pedidos
          </div>
        </router-link>
        <router-link to="/create-account" @click="closeMenu">
          <div class="px-4 py-3 hover:bg-gray-800 cursor-pointer rounded-xl duration-300">
            Meus Dados
          </div>
        </router-link>
        <router-link to="/create-account" @click="closeMenu">
          <div class="px-4 py-3 hover:bg-gray-800 cursor-pointer rounded-xl duration-300">
            Sobre
          </div>
        </router-link>
        <div class="py-4 items-center">
          <div class="flex-grow border-t border-gray-600" />
        </div>
        <div class="">
          <LogoApp />
        </div>
      </div>
      <div>
        <LogoApp />
      </div>
      <div id="div-menu" class="cursor-pointer p-2 hover:bg-gray-200 hover:rounded-xl" @click="searchProduct" @keypress="searchProduct">
        <button id="button-menu" type="button">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="lg" />
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import LogoApp from './LogoApp.vue';

export default {
  name: 'MenuBar',
  components: { LogoApp },
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
