<template>
  <label :for="id" class="text-base text-gray-800 max-w"> {{ label }}
    <input
      type="date"
      :id="id"
      :value="modelValue"
      min=""
      max=""
      class="appearance-none block w-full py-1.5 px-2 leading-tight text-gray-800 bg-gray-50 focus:bg-white border border-gray-200 rounded focus:border-gray-500 focus:outline-none"
      @input="$emit('update:modelValue', $event.target.value)"
      />
  </label>
</template>

<script setup>

defineEmits(['update:modelValue']);

defineProps({
  id: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  maxlength: {
    type: String,
    default: '100',
  },
});
</script>
