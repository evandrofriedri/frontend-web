<template>
  <router-link :to="route">
    <div class="flex items-center px-2 py-4 cursor-pointer duration-300 text-gray-900">
      <font-awesome-icon :icon="icon" size="xl" class="basis-1/12 w-5" />
      <div class="basis-11/12 ml-2">
        <div> {{ label }} </div>
        <div v-if="description != ''" class="text-xs text-gray-700">
          {{ description }}
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
