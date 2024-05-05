<template>
  <form action="" @submit.prevent="submitForm">
    <div class="flex flex-col max-h-[560px] overflow-auto">
      <div class="flex mb-2">
        <ReturnButton @click="closeModal()" />
        <h1 class="text-lg text-gray-800 font-medium text-justify">
          {{ labelForm }}
          {{ order.order_id }}
        </h1>
      </div>
      <div class="flex flex-col">
        <SelectInput id="payment_id" v-model="order.payment_id" name="payment" :items="payments" label="Forma de Pagamento" @update-name="updateName" />
        <label id="obs" class="mt-2">
          <div class="text-base text-gray-800">Observação</div>
          <textarea
            id="obs"
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

import Swal from 'sweetalert2';
import FormButton from './FormButton.vue';
import ReturnButton from './ReturnButton.vue';
import OrderService from '../services/OrderService';
import PaymentService from '../services/PaymentService';
import SelectInput from './SelectInput.vue';

const payments = ref([]);
const emitter = inject('emitter');

const order = ref({
  id: null,
  payment_id: null,
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

// function reloadOrders() {
//   emitter.emit('reloadOrders');
// }


function updateName(data){
  props.order.payment = data;
}

async function loadPayments() {
  const response = await PaymentService.getPayments();
  const data = [];
  response.forEach(element => {
    data.push({
      id: element.payment_id,
      name: element.name,
    });
  });
  return data;
}

onMounted(async () => {
  order.value = await props.order;
  payments.value = await loadPayments();
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
        closeModal();
        // reloadOrders();
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
        closeModal();
        // reloadOrders();
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
