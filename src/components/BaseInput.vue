<!-- eslint-disable vue/require-explicit-emits -->
<template>
  <div class="mb-4">
    <label v-if="label" :for="id" class="text-base text-gray-700 max-w"> {{ label }}
      <input
        class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white borde border-gray-200 rounded focus:outline-none"
        :value="modelValue"
        type="text"
        :placeholder="placeholder"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </label>
    <span v-for="error in errors" :key="error.$uid" class="text-sm text-red-600">
      {{ error.$message }}
    </span>
  </div>
</template>

<script setup>

defineProps({
  id: {
    type: String,
    default: '',
  },
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  errors: {
    type: Object,
    default() {
      return { $message: '' };
    },
  },
});
</script>
