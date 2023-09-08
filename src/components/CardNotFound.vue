<template>
  <div v-if="found == 0" class="flex justify-center items-center italic text-xl text-gray-800 m-14">
    <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="2xl" class="mr-2" />
    <h1>{{ label }}</h1>
  </div>
</template>

<script setup>
defineProps({
  found: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    default: 'Not Found!',
  },

});

</script>
