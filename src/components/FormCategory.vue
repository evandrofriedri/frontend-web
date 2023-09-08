<template>
  <form action="" @submit.prevent="submitForm">
    <div class="flex flex-col">
      <div class="flex mb-2">
        <ReturnButton @click="closeModal()" />
        <h1 class="text-lg text-gray-800 font-medium text-justify">
          {{ labelForm }}
        </h1>
      </div>
      <div class="flex flex-col">
        <BaseInput id="name" v-model="newCategory.name" label="Nome Categoria" type="text" placeholder="Nome Categoria" :errors="v$.name.$errors" />
      </div>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-start-6 md:col-start-8 col-end-13">
        <FormButton
          btn-type="submit"
          icon="fa-regular fa-floppy-disk"
          :description="labelBtn"
        />
      </div>
    </div>
  </form>
</template>
<script setup>
import {
  ref,
  computed,
  onMounted,
  inject,
} from 'vue';
import { useVuelidate } from '@vuelidate/core';
import {
  required, helpers,
} from '@vuelidate/validators';
import Swal from 'sweetalert2';
import BaseInput from './BaseInput.vue';
import FormButton from './FormButton.vue';
import ReturnButton from './ReturnButton.vue';

const emitter = inject('emitter');
const newCategory = ref({
  id: -1,
  name: '',
});

const props = defineProps({
  category: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
  labelForm: {
    type: String,
    default: '',
  },
  labelBtn: {
    type: String,
    default: '',
  },
});

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
}));

const v$ = useVuelidate(rules, newCategory);

function closeModal() {
  emitter.emit('closeModal');
}

onMounted(async () => {
  newCategory.value = await props.category;
});

const submitForm = async () => {
  const result = await v$.value.$validate();

  if (result) {
    console.log('fomr enviado!');
    console.log(newCategory.value);
    Swal.fire({
      icon: 'success',
      title: 'Categoria salva com sucesso!',
      text: `Categoria ${newCategory.value.name} salva.`,
      confirmButtonColor: '#374151',
    }).then(() => {
      closeModal();
    });
  } else {
    console.log('nao enviado!');
  }
};

</script>
