<template>
  <router-link :to="route">
    <button :type="btnType" class="inline-block w-full p-3.5 leading-none text-gray-800 bg-gray-50 border hover:bg-gray-200 font-semibold rounded">
      <font-awesome-icon :icon="icon" size="lg" /> {{ description }}
    </button>
  </router-link>
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
  route: {
    type: String,
    default: '',
  },
});
</script>
