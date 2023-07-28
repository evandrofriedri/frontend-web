<template>
  <button type="button" class="px-1.5 cursor-pointer text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-900 font-semibold rounded">
    <font-awesome-icon :icon="icon" size="2xs" />
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
