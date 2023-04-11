<template>
  <nav class="p-5 bg-gray-200 shadow-md md:flex w-full md:items-center md:justify-between">
    <div class="flex justify-between items-center">
      <span class="text-2xl cursor-pointer">
        <!-- colocar uma imagem aqui -->
        Logo da Empresa
      </span>
      <span class="text-3xl cursor-pointer md:hidden block" @click="menuAction" @keypress="bar">
        <ion-icon name="menu-outline" />
      </span>
    </div>
    <ul
      class="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-gray-200 w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500"
    >
      <li class="mx-2 my-5 md:my-0">
        <router-link class="text-xl hover:text-blue-600 duration-500" to="/">
          Home
        </router-link>
      </li>
      <li class="mx-2 my-5 md:my-0">
        <router-link class="text-xl hover:text-blue-600 duration-500" to="/create-account">
          Minhas Reservas
        </router-link>
      </li>
      <li class="mx-2 my-5 md:my-0">
        <router-link class="text-xl hover:text-blue-600 duration-500" to="/create-account">
          Grupos de Carros
        </router-link>
      </li>
      <li class="mx-2 my-5 md:my-0">
        <router-link class="text-xl hover:text-blue-600 duration-500" to="/create-account">
          Sobre
        </router-link>
      </li>
    </ul>
    <!-- <div> -->
    <!-- colocar um icone aqui -->
    <!-- <button -->
    <!-- type="button" -->
    <!-- class="bg-blue-600 text-white rounded duration-500 px-4 py-1 hover:bg-blue-500" -->
    <!-- > -->
    <!-- Login -->
    <!-- </button> -->
    <!-- </div> -->
  </nav>
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
    menuAction(e) {
      const list = document.querySelector('ul');
      console.log(e.target);
      if (e.name === 'menu') {
        console.log('entrou if');
        e.name = 'close';
        list.classList.add('top-[80px]');
        list.classList.add('opacity-100');
      } else {
        console.log('else if');
        e.name = 'menu';
        list.classList.remove('top-[80px]');
        list.classList.remove('opacity-100');
      }
    },
  },
};
</script>
