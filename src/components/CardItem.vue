<template>
  <div class="p-3 flex rounded-lg bg-white shadow-md hover:shadow-2xl hover:cursor-pointer hover:bg-gray-50 duration-300" @click="openModal" @keydown="openModal">
    <div class="flex flex-col pr-5">
      <p class="mb-2 text-lg font-medium text-neutral-800">
        {{ props.title }}
      </p>
      <p class="mb-2 text-sm text-neutral-600">
        {{ props.description }}
      </p>
      <p class="text-sm font-bold">
        R$ {{ props.price }}
      </p>
    </div>
    <img
      class="h-24 w-24 rounded-xl object-cover"
      src="../assets/hambgurger.png"
      alt=""
    />
  </div>
  <Teleport to="#modal">
    <Transition name="modal">
      <div v-if="isModalOpen" class="flex fixed top-0 left-0 z-10 w-screen h-screen bg-black/50 justify-center items-center">
        <div ref="modal" class="relative bg-white px-12 py-24 rounded shadow-lg">
          <button type="button" class="absolute top-3 right-3 bg-none cursor-pointer" @click="isModalOpen = false">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
          {{ props.title }}
          {{ props.description }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const isModalOpen = ref(false);
const modal = ref(null);

onClickOutside(modal, () => {
  isModalOpen.value = false;
});

const props = defineProps({
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

function openModal() {
  isModalOpen.value = true;
}

</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
