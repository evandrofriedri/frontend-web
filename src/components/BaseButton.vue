<template>
  <button type="button" class="px-2.5 py-1 cursor-pointer text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-900 font-semibold rounded">
    <font-awesome-icon :icon="icon" size="sm" />
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
