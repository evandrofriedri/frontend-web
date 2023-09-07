<template>
  <div v-if="title == selectedTitle">
    <slot />
  </div>
</template>
<script>
import { inject } from 'vue';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup() {
    const selectedTitle = inject('selectedTitle');

    return {
      selectedTitle,
    };
  },
};
</script>
