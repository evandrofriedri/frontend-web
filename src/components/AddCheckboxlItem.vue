<template>
  <div class="flex">
    <label class="text-base text-gray-700 max-w">
      <input
        :value="item.id"
        class="text-gray-700 bg-gray-50 mr-2 focus:bg-white border border-gray-200 rounded focus:border-gray-500 focus:outline-none checked:bg-gray-100"
        type="checkbox"
        v-bind="$attrs"
        @input="$emit('updateCheckbox', $event.target.value)"
      />
    </label>
    <p> {{ item.name }}</p>
  </div>
  <p> {{ item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
</template>

<script setup>

defineEmits(['updateCheckbox']);

defineProps({
  item: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

</script>
