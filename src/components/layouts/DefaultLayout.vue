<template>
  <MenuBar />
  <slot />
  <FooterBar />
</template>

<script>
import FooterBar from '../FooterBar.vue';
import MenuBar from '../MenuBar.vue';

export default {
  components: { MenuBar, FooterBar },
  data() {
    return {};
  },
};

</script>
