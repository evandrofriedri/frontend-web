<template>
  <button :id="id" type="button">
    <font-awesome-icon :icon="icon" size="xl" />
  </button>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
});
</script>
