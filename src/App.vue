<template>
  <div class="bg-gray-100">
    <component :is="layout">
      <router-view />
    </component>
  </div>
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

<style>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
