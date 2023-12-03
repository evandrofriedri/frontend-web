<template>
  <div class="flex items-center px-2 py-4 hover:bg-gray-800 active:bg-gray-900 cursor-pointer rounded duration-300 text-white">
    <div class="basis-3/12">
      <div v-if="image_url">
        <img :src="image_url" class="w-12 h-12 rounded-full" />
      </div>
      <div v-else>
        <div class="flex items-center justify-center bg-white text-gray-700 font-normal text-2xl uppercase w-12 h-12 rounded-full">{{ label[0] }}</div>
      </div>
    </div>
    <div class="basis-9/12">
      <div> {{ label }} </div>
      <div v-if="description != ''" class="text-xs text-gray-400">
        {{ description }}
      </div>
    </div>
  </div>
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
  image_url: {
    type: String,
    default: '',
  },
});
</script>
