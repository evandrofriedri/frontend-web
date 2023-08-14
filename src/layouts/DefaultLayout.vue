<template>
  <header>
    <MenuBar />
  </header>
  <main>
    <slot />
  </main>
  <footer>
    <FooterBar />
  </footer>
</template>

<script>
import FooterBar from '../components/FooterBar.vue';
import MenuBar from '../components/MenuBar.vue';

export default {
  components: { MenuBar, FooterBar },
  data() {
    return {};
  },
};

</script>
