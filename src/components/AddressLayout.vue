<template>
  <router-link :to="route">
    <div class="flex items-center text-right px-1 py-2 cursor-pointer duration-300 text-gray-900">
      <font-awesome-icon :icon="icon" size="xl" class="basis-1/12 w-5" />
      <div class="basis-11/12 ml-2">
        <div> {{ item.description }}, {{ item.number }} </div>
        <div v-if="item.neighborhood != ''" class="text-xs text-gray-800">
          {{ item.neighborhood }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>

defineProps({
  item: {
    type: Object,
    default() {
      return { msg: 0 };
    },
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
