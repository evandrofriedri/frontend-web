<template>
  <button
    type="button"
    class="px-2.5 py-1 text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-900 font-semibold rounded"
    @click="decrease();$emit('toggleQtdeProduct', { qtde: qtde })"
  >
    <font-awesome-icon icon="fa-solid fa-minus" size="sm" />
  </button>
  <div class="px-3 py-1 bg-white text-gray-900 inline-flex items-center">
    {{ qtde }}
  </div>
  <button
    type="button"
    class="px-2.5 py-1 text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-900 font-semibold rounded"
    @click="increase();$emit('toggleQtdeProduct', { qtde: qtde })"
  >
    <font-awesome-icon icon="fa-solid fa-plus" size="sm" />
  </button>
</template>

<script setup>
import { ref } from 'vue';

const qtde = ref(1);

defineEmits(['toggleQtdeProduct']);

function decrease() {
  if (qtde.value > 1) {
    qtde.value -= 1;
  }
}

function increase() {
  if (qtde.value < 10) {
    qtde.value += 1;
  }
}

</script>
