<template>
  <div class="flex">
    <button
      type="button"
      class="px-1.5 cursor-pointer text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-900 font-semibold rounded"
      @click="decrease();$emit('decrementCount', { count: count, additional: additional })"
    >
      <font-awesome-icon icon="fa-solid fa-minus" size="2xs" />
    </button>
    <div class="px-2 bg-white text-gray-800 text-center">
      {{ count }}
    </div>
    <button
      type="button"
      class="px-1.5 cursor-pointer text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-900 font-semibold rounded"
      @click="increase();$emit('incrementCount', { count: count, additional: additional })"
    >
      <font-awesome-icon icon="fa-solid fa-plus" size="2xs" />
    </button>
    <div class="pl-2">
      {{ additional.name }}
    </div>
  </div>
  <div>+ {{ additional.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  additional: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

const count = ref(0);

defineEmits(['incrementCount', 'decrementCount']);

function decrease() {
  if (count.value > 0) {
    count.value -= 1;
  }
}

function increase() {
  if (count.value < 5) {
    count.value += 1;
  }
}

</script>
