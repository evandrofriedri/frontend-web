<template>
  <div v-for="(item) in cardItems" :key="item"
    class="rounded border border-gray-200 bg-white px-8 py-6 shadow-md hover:shadow-2xl hover:bg-gray-50 duration-300">

    <div class="flex items-end justify-between">
      <div>
        <h4 class="text-2xl font-bold text-gray-800">{{ item.total }}</h4>
        <span class="text-sm font-medium text-gray-400">{{ item.title }} - Últ. 30 dias</span>
      </div>
      <div class="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
        <font-awesome-icon class="text-gray-800" :icon="`fa-solid ${item.icon}`" size="lg" />
      </div>
    </div>
  </div>
</template>
<script setup>
import StatisticService from '../services/StatisticService';

const cardItems = await StatisticService.getStats(JSON.stringify({
  id: 1, interval: 30,
}));

</script>