<template>
  <a class="px-4 py-2 -top-16 border-b-4 border-b-transparent duration-300" :href="props.href">
    {{ props.title }}
  </a>
</template>

<script setup>
const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
});

</script>
