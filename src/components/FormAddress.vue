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
        <BaseInput id="address" v-model="newAddress.address" label="Endereço" type="text" placeholder="Endereço" :errors="v$.address.$errors" />
        <BaseInput id="number" v-model="newAddress.number" label="Número" type="number" placeholder="Número" :errors="v$.number.$errors" />
        <BaseInput id="neighborhood" v-model="newAddress.neighborhood" label="Bairro" type="text" placeholder="Bairro" :errors="v$.neighborhood.$errors" />
        <BaseInput id="city" v-model="newAddress.city" label="Cidade" type="text" placeholder="Cidade" :errors="v$.city.$errors" />
        <div class="flex">
          <label class="text-base text-gray-800 max-w">
            <input
              v-model="newAddress.favorite"
              class="text-gray-800 bg-gray-50 mr-2 focus:bg-white border border-gray-200 rounded focus:border-gray-500 focus:outline-none checked:bg-gray-100"
              type="checkbox"
            />
          </label>
          <p>Endereço Padrão</p>
        </div>
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
const newAddress = ref({
  id: '',
  address: '',
  number: '',
  neighborhood: '',
  city: '',
  favorite: false,
});

const props = defineProps({
  address: {
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
  address: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  number: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  neighborhood: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  city: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
}));

const v$ = useVuelidate(rules, newAddress);

function closeModal() {
  emitter.emit('closeModal');
}

onMounted(async () => {
  newAddress.value = await props.address;
});

const submitForm = async () => {
  const result = await v$.value.$validate();

  if (result) {
    console.log('fomr enviado!');
    console.log(newAddress.value);
    Swal.fire({
      icon: 'success',
      title: 'Endereço salvo com sucesso!',
      text: `Endereço ${newAddress.value.address} salvo.`,
      confirmButtonColor: '#374151',
    }).then(() => {
      closeModal();
    });
  } else {
    console.log('nao enviado!');
  }
};

</script>
