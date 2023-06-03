<template>
  <div class="p-2 flex flex-row max-w-2xl rounded-lg bg-white shadow-md hover:shadow-2xl hover:cursor-pointer hover:bg-gray-50 duration-300">
    <div class="flex flex-col justify-start pr-5">
      <h5 class="mb-2 text-xl font-medium text-neutral-800">
        {{ title }}
      </h5>
      <p class="mb-2 text-sm text-neutral-600">
        {{ description }}
      </p>
      <p class="text-base font-bold">
        R$ {{ price }}
      </p>
    </div>
    <img
      class="h-24 w-24 rounded-xl object-cover"
      src="../assets/hambgurger.png"
      alt=""
    />
  </div>
</template>

<script setup>

defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: 0,
  },
});

</script>
