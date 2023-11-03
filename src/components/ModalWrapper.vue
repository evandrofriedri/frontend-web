<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div v-if="isModalOpen" class="flex fixed top-0 left-0 z-10 w-screen h-screen bg-black/50 justify-center items-center">
        <div ref="modal" class="relative p-4 mx-auto w-screen h-screen sm:h-auto md:max-w-md lg:max-w-lg bg-white shadow-2xl rounded">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup>
import { onUpdated, ref, inject } from 'vue';
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  modalOpen: {
    type: Boolean,
    default: false,
  },
  screen: {
    type: String,
    default: '',
  },
});

const isModalOpen = ref(false);
const modal = ref(null);
const emitter = inject('emitter');

onClickOutside(modal, () => {
  isModalOpen.value = false;
  emitter.emit(`setModalFalse-${props.screen}`);
  console.log('clicouu');
});

emitter.on(`closeModal-${props.screen}`, () => {
  console.log('chegou no closemodal Wrapper');
  console.log(props.screen);
  isModalOpen.value = false;
  emitter.emit(`setModalFalse-${props.screen}`);
});

onUpdated(async () => {
  console.log(props.screen);
  console.log(props.modalOpen);
  console.log(isModalOpen.value);
  isModalOpen.value = await props.modalOpen;
});

</script>
