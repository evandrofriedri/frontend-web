<template>
  <div class="mb-4">
    <label :for="id" class="text-base text-gray-800 max-w"> {{ label }}
      <input
        :id="id"
        class="appearance-none block w-full py-3 px-4 leading-tight text-gray-800 bg-gray-50 focus:bg-white border border-gray-200 rounded focus:border-gray-500 focus:outline-none"
        :value="modelValue"
        :placeholder="placeholder"
        v-bind="$attrs"
        autocomplete="on"
        :maxlength="maxlength"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </label>
    <span v-for="error in errors" :key="error.$uid" class="text-sm text-red-600">
      <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="pl-1" />
      {{ error.$message }}
    </span>
  </div>
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
    type: [String, Number],
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
  maxlength: {
    type: String,
    default: '100',
  },
});
</script>
