<template>
  <button :type="btnType" class="inline-block w-full p-3.5 leading-none text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-900 font-semibold rounded">
    <font-awesome-icon :icon="icon" size="lg" /> {{ description }}
  </button>
</template>
<script setup>
defineProps({
  btnType: {
    type: String,
    default: 'button',
  },
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
