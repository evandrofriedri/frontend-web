<template>
  <h2 :id="props.id" class="pt-12 pb-2 px-2 text-xl font-semibold">
    {{ props.title }}
  </h2>
</template>
<script setup>
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
});
</script>
