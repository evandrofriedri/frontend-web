<template>
  <header>
    <nav class="bg-gray-50 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div class="text-xl cursor-pointer">
          <font-awesome-icon id="show-menu" class="text-2xl hover:text-blue-700 duration-500" icon="fa-solid fa-bars" size="lg" @click="openMenu" />
        </div>
        <div class="w-auto">
          <ul class="fixed py-4 pl-7 top-0 left-[-250px] w-[240px] h-screen z-50 bg-gray-700 p-5 flex-col space-y-5 text-white duration-200">
            <li class="text-right">
              <font-awesome-icon id="close-menu" class="text-4xl cursor-pointer hover:text-blue-700 duration-500" icon="fa-solid fa-xmark" @click="closeMenu" />
            </li>
            <li class="mx-2 my-5">
              <router-link class="text-base font-medium hover:text-blue-700 duration-500" to="/">
                Cardápio
              </router-link>
            </li>
            <li class="mx-2 my-5">
              <router-link class="text-base font-medium hover:text-blue-700 duration-500" to="/create-account">
                Meus Pedidos
              </router-link>
            </li>
            <li class="mx-2 my-5">
              <router-link class="text-base font-medium hover:text-blue-700 duration-500" to="/create-account">
                Meus Dados
              </router-link>
            </li>
            <li class="mx-2 my-5">
              <router-link class="text-base font-medium hover:text-blue-700 duration-500" to="/create-account">
                Sobre
              </router-link>
            </li>
          </ul>
        </div>
        <div>
          <router-link to="/">
            <!-- <img src="" class="h-8 mr-3" alt="Logo"> -->
            <p class="text-xl font-medium text-blue-700">
              Imagem
            </p>
          </router-link>
        </div>
        <div class="cursor-pointer font-medium text-blue-700">
          <router-link to="/login" class="text-xl hover:text-blue-900 duration-500">
            <font-awesome-icon icon="fa-regular fa-user" class="mr-2" />
            Login
          </router-link>
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
    openMenu(e) {
      const list = document.querySelector('ul');
      if (e.target.id === 'show-menu') {
        list.classList.remove('left-[-250px]');
        list.classList.add('left-0');
      }
    },
    closeMenu(e) {
      const list = document.querySelector('ul');
      if (e.target.id === 'close-menu') {
        list.classList.remove('left-0');
        list.classList.add('left-[-250px]');
      }
    },
  },
};
</script>
