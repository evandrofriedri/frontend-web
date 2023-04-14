<template>
  <div id="nav">
    <nav class="bg-gray-50 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div class="max-w-screen flex items-center justify-between mx-auto p-4">
        <div class="text-xl cursor-pointer">
          <font-awesome-icon id="show-menu" class="text-xl hover:text-blue-700 duration-500" icon="fa-solid fa-bars" size="lg" @click="openMenu" />
        </div>
        <ul id="ul-menu" class="fixed py-4 pl-7 top-0 left-[-250px] w-[240px] h-screen z-50 bg-gray-700 p-5 flex-col text-white duration-200">
          <li class="text-right">
            <font-awesome-icon id="close-menu" class="text-3xl cursor-pointer hover:text-blue-700 duration-500" icon="fa-solid fa-xmark" @click="closeMenu" />
          </li>
          <li class="px-1 py-4 hover:text-blue-700 hover:bg-gray-400 cursor-pointer rounded duration-50" @click="closeMenu" @keydown="bar">
            <router-link class="text-base font-medium" to="/">
              Cardápio
            </router-link>
          </li>
          <li class="px-1 py-4 hover:text-blue-700 hover:bg-gray-400 cursor-pointer rounded duration-50" @click="closeMenu" @keydown="bar">
            <router-link class="text-base font-medium hover:text-blue-700 duration-500" to="/create-account">
              Meus Pedidos
            </router-link>
          </li>
          <li class="px-1 py-4 hover:text-blue-700 hover:bg-gray-400 cursor-pointer rounded duration-50" @click="closeMenu" @keydown="bar">
            <router-link class="text-base font-medium hover:text-blue-700 duration-500" to="/create-account">
              Meus Dados
            </router-link>
          </li>
          <li class="px-1 py-4 hover:text-blue-700 hover:bg-gray-400 cursor-pointer rounded duration-50" @click="closeMenu" @keydown="bar">
            <router-link class="text-base font-medium hover:text-blue-700 duration-500" to="/create-account">
              Sobre
            </router-link>
          </li>
        </ul>
        <div>
          <router-link to="/">
            <img src="../assets/logo.png" class="h-8" alt="Logo">
          </router-link>
        </div>
        <div class="cursor-pointer font-medium text-black">
          <router-link to="/login" class="text-base hover:text-blue-700 duration-500">
            <font-awesome-icon icon="fa-regular fa-user" class="mr-1" />
            Entrar
          </router-link>
        </div>
      </div>
    </nav>
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
    openMenu(e) {
      const list = document.querySelector('ul');
      if (e.target.id === 'show-menu') {
        list.classList.remove('left-[-250px]');
        list.classList.add('left-0');
      }
    },
    closeMenu(e) {
      const list = document.getElementById('ul-menu');
      console.log('clicou');
      console.log(e.target);
      if (e.target.id === 'close-menu') { // <<<<<<<<<< identificar os menus lis pra fechar o menu no click
        list.classList.remove('left-0');
        list.classList.add('left-[-250px]');
      }
    },
  },
};
</script>
