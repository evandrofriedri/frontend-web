<template>
  <div class="flex items-center rounded bg-cover hover:cursor-pointer">
    <img v-if="props.color == 'white'" src="../assets/white_logo.png" class="object-cover " alt="" />
    <img v-if="props.color == 'black'" src="../assets/black_logo.png" class="object-cover " alt="" />
  </div>
</template>
<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'white',
  },
});
</script>