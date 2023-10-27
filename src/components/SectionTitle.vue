<template>
  <h2 class="pt-12 pb-2 px-2 text-lg text-gray-900 font-semibold scroll-mt-20">
    {{ props.title }}
  </h2>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>
