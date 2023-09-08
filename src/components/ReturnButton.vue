<template>
  <button class="mr-4" type="button">
    <font-awesome-icon icon="fa-solid fa-chevron-left" size="lg" />
  </button>
</template>
<script setup>
defineProps({
  btnType: {
    type: String,
    default: 'button',
  },
  description: {
    type: String,
    default: '',
  },
});
</script>
