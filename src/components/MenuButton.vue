<template>
  <div class="cursor-pointer p-2 hover:bg-gray-800 hover:rounded-xl duration-300 text-white">
    <button type="button">
      <font-awesome-icon :icon="icon" size="xl" />
    </button>
  </div>
</template>
<script setup>
defineProps({
  icon: {
    type: String,
    default: '',
  },
});
</script>
