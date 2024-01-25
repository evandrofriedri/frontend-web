<template>
  <div :class="`${typeBox} w-full h-48`" />
  <div class="flex justify-center container mx-auto mt-10 py-10 px-4 sm:px-6 lg:px-20">
    <font-awesome-icon icon="fa-solid fa-burger" size="2xl" class="w-10 md:w-16 h-10 md:h-16 text-gray-600 anime" />
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
<style scoped>
  .anime { animation : bounce 0.6s infinite;
 }
 @keyframes bounce {
  0%, 100% {
    transform: translateY(-100%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>