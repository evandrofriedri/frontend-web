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
        <label class="mt-2">
          <div class="text-base text-gray-800">Observações</div>
          <textarea
            v-model="order.observation"
            class="w-full"
            rows="3"
            placeholder="Ex:Retirar cebola, retirar molho..."
            maxlength="100"
          />
        </label>
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
  onMounted,
  inject,
} from 'vue';

import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import FormButton from './FormButton.vue';
import ReturnButton from './ReturnButton.vue';
import OrderService from '../services/OrderService';

const router = useRouter();
const emitter = inject('emitter');

const order = ref({
  id: null,
  observation: null,
});

const props = defineProps({
  order: {
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
  emitter.emit(`closeModal-FormOrder-${props.order.order_id}`);
}

onMounted(async () => {
  order.value = await props.order;
});

const submitForm = async () => {
  if (order.value.order_id === undefined) {
    const response = await OrderService.createOrder(order.value);
    if (response) {
      Swal.fire({
        icon: 'success',
        title: 'Cadastro realizado com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.go(0);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar novo pedido, tente mais tarde!',
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      });
    }
  } else {
    const response = await OrderService.updateOrder(order.value);
    if (response) {
      Swal.fire({
        icon: 'success',
        title: 'Alteração realizada com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.go(0);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao editar pedido, tente mais tarde!',
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      });
    }
  }

  return true;
};

</script>
