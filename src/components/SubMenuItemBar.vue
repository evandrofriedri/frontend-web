<template>
  <router-link :to="route">
    <div class="flex items-center px-2 py-2 ml-3 hover:bg-gray-800 active:bg-gray-900 cursor-pointer rounded duration-300 text-white text-sm">
      <font-awesome-icon :icon="icon" size="xl" class="basis-1/12 w-5" />
      <div class="ml-2">
        <div class="">
          {{ label }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>

defineProps({
  label: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  route: {
    type: String,
    default: '',
  },
});
</script>
