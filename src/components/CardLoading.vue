<template>
  <div :class="`${typeBox} w-full h-48`" />
  <div class="flex justify-center container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <font-awesome-icon icon="fa-solid fa-spinner" size="2xl" class="w-10 md:w-16 h-10 md:h-16 text-gray-600 animate-spin" />
  </div>
</template>
<script setup>
defineProps({
  typeBox: {
    type: String,
    default: 'flex',
  },
});
</script>