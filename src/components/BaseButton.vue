<template>
  <label :for="id" class="text-base text-gray-800 max-w">{{ label }}
    <button :id="id" :name="id" :type="btnType" class="inline-block w-full py-1.5 px-2 leading-none text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-900 font-semibold rounded">
      <font-awesome-icon :icon="icon" size="lg" /> {{ description }}
    </button>
  </label>
</template>
<script setup>
defineProps({
  id: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  btnType: {
    type: String,
    default: 'button',
  },
  icon: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
});
</script>
