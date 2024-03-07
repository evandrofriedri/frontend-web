<template>
  <form action="" @submit.prevent="submitForm">
    <div class="flex flex-col max-h-[560px] overflow-auto">
      <div class="flex mb-2">
        <ReturnButton @click="closeModal()" />
        <h1 class="text-lg text-gray-800 font-medium text-justify">
          {{ labelForm }}
        </h1>
      </div>
      <div class="flex flex-col">
        <BaseInput id="name" v-model="payment.name" label="Nome Pagamento" type="text" placeholder="Nome Pagamento" :errors="v$.name.$errors" />
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
import PaymentService from '../services/PaymentService';

const emitter = inject('emitter');

const payment = ref({
  id: null,
  name: null,
  sequence: null,
});

const props = defineProps({
  payment: {
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

function closeModal() {
  console.log(`ENVIA FormPayment-${props.payment.payment_id}`);
  emitter.emit(`closeModal-FormPayment-${props.payment.payment_id}`);
}

function reloadPayment() {
  console.log(`ENVIA FormPayment-${props.payment.payment_id}`);
  emitter.emit('reloadPayment');
}

onMounted(async () => {
  payment.value = await props.payment;
});

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
}));

const v$ = useVuelidate(rules, payment);

const submitForm = async () => {
  const validated = await v$.value.$validate();

  if (!validated) {
    return false;
  }

  if (payment.value.payment_id === 0) {
    const response = await PaymentService.createPayment(payment.value);
    if (response) {
      Swal.fire({
        icon: 'success',
        title: 'Cadastro realizado com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        closeModal();
        reloadPayment();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar nova forma de pagto, tente mais tarde!',
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      });
    }
  } else {
    const response = await PaymentService.updatePayment(payment.value);
    if (response) {
      Swal.fire({
        icon: 'success',
        title: 'Alteração realizada com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        closeModal();
        reloadPayment();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao editar forma de pagto, tente mais tarde!',
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      });
    }
  }

  return true;
};

</script>
