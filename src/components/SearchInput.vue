<template>
  <div :id="`search-input-${id}`">
    <label :for="id">
      <input
        class="appearance-none block w-full py-1.5 px-2 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 shadow-md rounded focus:border-gray-500 focus:outline-none"
        :value="modelValue"
        :placeholder="placeholder"
        type="text"
        autocomplete="on"
        maxlength="80"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </label>
  </div>
</template>

<script setup>

defineEmits(['update:modelValue']);

defineProps({
  id: {
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
});
</script>
