<template>
  <div class="mb-4">
    <label :for="id" class="text-base text-gray-700 max-w">{{ label }}</label>
    <select
      :id="id"
      :name="id"
      class="block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 rounded focus:border-gray-500 focus:outline-none"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="(item) in items" :key="item.id" :value="item.id">
        {{ item.name }}
      </option>
    </select>
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
  items: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
  errors: {
    type: Object,
    default() {
      return { $message: '' };
    },
  },
});
</script>
