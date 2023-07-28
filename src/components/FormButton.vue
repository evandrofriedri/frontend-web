<template>
  <button type="submit" class="inline-block w-full p-3 leading-none text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-900 font-semibold rounded">
    <font-awesome-icon :icon="icon" /> {{ description }}
  </button>
</template>
<script setup>
defineProps({
  icon: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
});
</script>
