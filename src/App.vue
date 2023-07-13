<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const DefaultLayout = 'default-layout';
    const { currentRoute } = useRouter();

    const layout = computed(
      () => `${currentRoute.value.meta.layout || DefaultLayout}`,
    );

    return { layout };
  },
  data() {
    return {};
  },
};

function scrollFunction() {
  const sticky = document.getElementById('sticky');
  const menu = document.getElementById('parent-menu');
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    if (sticky !== null) {
      sticky.style.top = '56px';
    }
    if (menu !== null) {
      menu.style.padding = '8px 8px';
    }
  } else {
    if (sticky !== null) {
      sticky.style.top = '208px';
    }
    if (menu !== null) {
      menu.style.padding = '8px 8px 160px 8px';
    }
  }
}
window.onscroll = () => { scrollFunction(); };
</script>
