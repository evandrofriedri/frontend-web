<template>
  <div class="cursor-pointer p-2 hover:bg-gray-200 hover:rounded-xl duration-300">
    <button :id="id" type="button">
      <font-awesome-icon :icon="icon" size="xl" />
    </button>
  </div>
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
