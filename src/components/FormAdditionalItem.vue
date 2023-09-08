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
        <BaseInput id="name" v-model="newAdditional.name" label="Nome Adicional" type="text" placeholder="Nome Adicional" :errors="v$.name.$errors" />
        <BaseInput id="price" v-model="newAdditional.price" label="Preço" type="number" placeholder="Preço do Adicional" :errors="v$.price.$errors" />
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
  required, helpers, between,
} from '@vuelidate/validators';
import Swal from 'sweetalert2';
import BaseInput from './BaseInput.vue';
import FormButton from './FormButton.vue';
import ReturnButton from './ReturnButton.vue';

const emitter = inject('emitter');
const newAdditional = ref({
  id: -1,
  name: '',
});

const props = defineProps({
  additional: {
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
  price: {
    required: helpers.withMessage('Campo obrigatório', required),
    betweenValue: helpers.withMessage('Valor deverá estar entre 5 e 100', between(5, 100)),
  },
}));

const v$ = useVuelidate(rules, newAdditional);

function closeModal() {
  emitter.emit('closeModal');
}

onMounted(async () => {
  newAdditional.value = await props.additional;
});

const submitForm = async () => {
  const result = await v$.value.$validate();

  if (result) {
    console.log('fomr enviado!');
    console.log(newAdditional.value);
    Swal.fire({
      icon: 'success',
      title: 'Adicional salvo com sucesso!',
      text: `Adicional ${newAdditional.value.name} salvo.`,
      confirmButtonColor: '#374151',
    }).then(() => {
      closeModal();
    });
  } else {
    console.log('nao enviado!');
  }
};

</script>
