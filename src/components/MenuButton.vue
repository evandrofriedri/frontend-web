<template>
  <button type="button" class="px-3 py-2 bg-black hover:bg-gray-800 rounded text-white">
    <font-awesome-icon :icon="icon" size="xl" />
  </button>
</template>
<script setup>
defineProps({
  icon: {
    type: String,
    default: '',
  },
});
</script>
