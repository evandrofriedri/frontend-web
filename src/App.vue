<template>
  <header>
    <MenuBar />
  </header>
  <main class="">
    <!-- Views'll render here -->
    <router-view />
  </main>
  <footer>
    <FooterBar />
  </footer>
</template>

<script>
import MenuBar from './components/MenuBar.vue';
import FooterBar from './components/FooterBar.vue';

export default {
  components: { MenuBar, FooterBar },
  data() {
    return {};
  },
};

</script>
