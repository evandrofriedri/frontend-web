<template>
  <td class="px-2 py-2">
    {{ payment.name }}
  </td>
  <td class="px-2 py-2">
    <button type="button" title="Excluir Forma de Pagamento" @click="deletePayment(payment)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Editar Forma de Pagamento" @click="isModalItemOpen = true">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
    </button>
  </td>
  <ModalWrapper :modal-open="isModalItemOpen" :screen="`FormPayment-${payment.payment_id}`">
    <FormPayment label-form="Editar Forma de Pagamento" label-btn="Salvar" :payment="payment" />
  </ModalWrapper>
</template>

<script setup>
import { ref, inject } from 'vue';
import Swal from 'sweetalert2';
import ModalWrapper from './ModalWrapper.vue';
import FormPayment from './FormPayment.vue';
import PaymentService from '../services/PaymentService';

const isModalItemOpen = ref(false);
const emitter = inject('emitter');

function reloadPayment() {
  emitter.emit('reloadPayment');
}

const props = defineProps({
  payment: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

emitter.on(`setModalFalse-FormPayment-${props.payment.payment_id}`, () => {
  isModalItemOpen.value = false;
});

function deletePayment(payment) {
  Swal.fire({
    title: `Deseja excluir forma de pagamento ${payment.name}?`,
    text: 'Não poderá reverter após confirmação!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#374151',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Voltar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await PaymentService.deletePayment(payment.payment_id);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Forma de Pagamento excluída com sucesso!',
          text: `Forma de Pagamento ${payment.name} excluída.`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          reloadPayment();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir forma de pagamento, tente mais tarde!',
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        });
      }
    }
  });
}

</script>
