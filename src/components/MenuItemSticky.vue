<template>
  <li class="px-4 py-3">
    <a :href="props.link">
      {{ props.title }}
    </a>
  </li>
</template>

<script setup>
const props = defineProps({
  link: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
});

</script>
