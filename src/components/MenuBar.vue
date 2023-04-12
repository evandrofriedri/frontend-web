<template>
  <header>
    <nav class="bg-green-400 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <router-link to="/" class="flex items-center">
          <!-- <img src="" class="h-8 mr-3" alt="Logo"> -->
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
        </router-link>
        <div class="flex md:order-2 cursor-pointer">
          <router-link to="/" class="text-xl">
            <font-awesome-icon icon="fa-solid fa-user" class="mr-1" />
            Login
          </router-link>
          <span id="menu" class="text-2xl md:hidden block ml-5">
            <font-awesome-icon id="menu" icon="fa-solid fa-bars" size="lg" style="color: #000000;" @click="menuAction" />
          <!-- <font-awesome-icon id="close" icon="fa-solid fa-xmark" size="lg"
          style="color: #000000;" @click="menuAction" /> -->
          </span>
        </div>
        <div class="items-center justify-between w-full md:flex md:w-auto md:order-1">
          <ul class="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-gray-500 w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
            <li class="mx-2 my-5 md:my-0">
              <router-link class="text-xl hover:text-blue-600 duration-500" to="/">
                Cardápio
              </router-link>
            </li>
            <li class="mx-2 my-5 md:my-0">
              <router-link class="text-xl hover:text-blue-600 duration-500" to="/create-account">
                Meus Pedidos
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
        </div>
      </div>
    </nav>
  </header>
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
      // const icon = document.getElementById('bar');
      // console.log(icon);
      console.log(e);
      if (e.target.id === 'menu') {
        e.target.id = 'close';

        list.classList.add('top-[80px]');
        list.classList.add('opacity-100');
      } else {
        e.target.id = 'menu';

        list.classList.remove('top-[80px]');
        list.classList.remove('opacity-100');
      }
    },
  },
};
</script>
