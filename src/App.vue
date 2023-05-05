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

</script>
