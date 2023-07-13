<template>
  <router-link :to="route">
    <div class="flex flex-row items-center px-2 py-4 hover:bg-gray-800 cursor-pointer rounded-xl duration-300 text-white">
      <font-awesome-icon :icon="icon" size="xl" class="basis-1/12 w-5" />
      <span class="basis-10/12 ml-3 ">{{ label }}</span>
      <font-awesome-icon icon="fa-solid fa-chevron-right" size="sm" class="basis-1/12" />
    </div>
  </router-link>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

defineProps({
  label: {
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
