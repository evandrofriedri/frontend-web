<template>
  <div class="flex">
    <label :for="id" class="text-base text-gray-800 max-w">
      <input
        :id="id"
        v-model="checked"
        :value="item.additional_id"
        class="text-gray-800 bg-gray-50 mr-2 focus:bg-white border border-gray-200 rounded focus:border-gray-500 focus:outline-none checked:bg-gray-100"
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
import { onMounted, ref } from 'vue';

defineEmits(['updateCheckbox']);

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  item: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

const checked = ref(false);

onMounted(async () => {
  checked.value = await props.item.checked;
});

</script>
