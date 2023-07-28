<template>
  <div class="p-3 flex rounded bg-white shadow-md hover:shadow-2xl hover:cursor-pointer hover:bg-gray-50 duration-300" @click="openModal" @keydown="openModal">
    <div class="flex flex-col pr-5">
      <p class="mb-2 text-lg font-medium text-gray-900">
        {{ props.title }}
      </p>
      <p class="mb-2 text-sm text-gray-600">
        {{ props.description }}
      </p>
      <p class="text-sm font-bold text-gray-900">
        R$ {{ props.price }}
      </p>
    </div>
    <div class="min-w-fit rounded">
      <img :src="props.image" class="object-cover h-24 w-24" alt="" />
    </div>
  </div>
  <Teleport to="#modal">
    <Transition name="modal">
      <div v-if="isModalOpen" class="flex fixed top-0 left-0 z-10 w-screen h-screen bg-black/50 justify-center items-center">
        <div ref="modal" class="relative bg-white rounded shadow-lg">
          <button type="button" class="absolute top-3 right-3 bg-none cursor-pointer" @click="isModalOpen = false">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
          <div class="w-96 bg-white shadow rounded">
            <div class="bg-gray-50 justify-between bg-cover bg-center rounded">
              <img :src="props.image" class="object-cover h-48 w-full" alt="" />
            </div>
            <div class="p-4 flex flex-col items-center">
              <h1 class="text-gray-800 text-center mt-1">
                {{ props.title }}
              </h1>
              <p class="text-gray-800 font-light text-xs text-center">
                {{ props.description }}
              </p>
              <p class="text-center text-gray-800 mt-1">
                R$ {{ props.price }}
              </p>
              <div v-if="props.additional" class="w-full mt-4">
                <div>Adicionais</div>
                <div v-for="(item, index) in props.additionals" :key="index">
                  <div class="flex justify-between pt-2 text-gray-900">
                    <div class="flex">
                      <BaseButton2 icon="fa-solid fa-minus" @click="changeCounter('-')" />
                      <div class="px-2 bg-white text-gray-900 text-center">
                        {{ count }}
                      </div>
                      <BaseButton2 icon="fa-solid fa-plus" @click="changeCounter('+')" />
                      <div class="pl-2">
                        {{ item.name }}
                      </div>
                    </div>
                    <div>{{ item.price }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-4 flex text-justify items-center">
              <div class="w-1/3">
                <BaseButton icon="fa-solid fa-minus" @click="changeCounter('-')" />
                <div class="px-4 py-1 bg-white text-gray-900 inline-flex items-center">
                  {{ count }}
                </div>
                <BaseButton icon="fa-solid fa-plus" @click="changeCounter('+')" />
              </div>
              <div class="w-2/3">
                <FormButton icon="fa-solid fa-cart-shopping" description="Adicionar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import BaseButton from './BaseButton.vue';
import BaseButton2 from './BaseButton2.vue';
import FormButton from './FormButton.vue';

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
  additional: {
    type: Boolean,
    default: false,
  },
  additionals: {
    type: Array,
    default() {},
  },
  image: {
    type: String,
    default: '',
  },
});

const isModalOpen = ref(false);
const modal = ref(null);
const count = ref(1);

onClickOutside(modal, () => {
  isModalOpen.value = false;
});

function changeCounter(operator) {
  if (operator === '+') {
    count.value += 1;
  } else if (count.value > 1) {
    count.value -= 1;
  }
}

function openModal() {
  isModalOpen.value = true;
}

</script>

<style scoped>.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}</style>
