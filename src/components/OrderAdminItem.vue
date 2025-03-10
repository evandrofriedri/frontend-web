<template>
  <td class="px-2 py-2" @click="isModalDetailItemOpen = true" @keypress="isModalDetailItemOpen = true">
    {{ order.order_id }}
  </td>
  <td class="px-2 py-2" @click="isModalDetailItemOpen = true" @keypress="isModalDetailItemOpen = true">
    {{ order.date }}
  </td>
  <td class="px-2 py-2" @click="isModalDetailItemOpen = true" @keypress="isModalDetailItemOpen = true">
    {{ order.account.split(' ')[0] }}
  </td>
  <td class="px-2 py-2 hidden sm:table-cell break-words" @click="isModalDetailItemOpen = true" @keypress="isModalDetailItemOpen = true">
    {{ order.observation }}
  </td>
  <td class="px-2 py-2 hidden sm:table-cell" @click="isModalDetailItemOpen = true" @keypress="isModalDetailItemOpen = true">
    {{ order.total_value }}
  </td>
  <td class="px-2 py-2 hidden sm:table-cell" @click="isModalDetailItemOpen = true" @keypress="isModalDetailItemOpen = true">
    {{ order.payment }}
  </td>
  <td class="px-2 py-2 font-medium" @click="isModalDetailItemOpen = true" @keypress="isModalDetailItemOpen = true">
    <div v-if="order.active == 1">
      {{ order.status }}
    </div>
    <div v-else>
      Cancelado
    </div>
  </td>
  <td :class="`px-2 py-2 ${order.active == 0 ? 'text-gray-300' : 'text-gray-800'}`">
    <button type="button" :disabled="order.active === false" title="Cancelar Pedido" @click="cancelOrder(order)">
      <font-awesome-icon icon="fa-regular fa-trash-can" size="lg" />
    </button>&nbsp;&nbsp;
    <button type="button" :disabled="order.active === false" title="Editar Pedido" @click="isModalItemOpen = true">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" size="lg" />
    </button>&nbsp;&nbsp;
    <button type="button" :disabled="order.active === false" title="Dar sequência ao fluxo do pedido" @click="forwardOrder(order)">
      <font-awesome-icon icon="fa-regular fa-square-caret-right" size="lg" />
    </button>
  </td>
  <ModalWrapper :modal-open="isModalDetailItemOpen" :screen="`OrderDetail-${order.order_id}`">
    <OrderDetail label-form="Detalhes do Pedido" :order="order" />
  </ModalWrapper>
  <ModalWrapper :modal-open="isModalItemOpen" :screen="`FormOrder-${order.order_id}`">
    <FormOrder label-form="Editar Pedido" label-btn="Salvar" :order="order" />
  </ModalWrapper>
</template>

<script setup>
import { ref, inject } from 'vue';
import Swal from 'sweetalert2';
import ModalWrapper from './ModalWrapper.vue';
import FormOrder from './FormOrder.vue';
import OrderDetail from './OrderDetail.vue';
import OrderService from '../services/OrderService';
import StatusService from '../services/StatusService';
import NotificationService from '../services/NotificationService';

const isModalDetailItemOpen = ref(false);
const isModalItemOpen = ref(false);
const emitter = inject('emitter');

// function reloadOrders() {
//   emitter.emit('reloadOrders');
// }

const props = defineProps({
  order: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

emitter.on(`setModalFalse-OrderDetail-${props.order.order_id}`, () => {
  isModalDetailItemOpen.value = false;
});

emitter.on(`setModalFalse-FormOrder-${props.order.order_id}`, () => {
  isModalItemOpen.value = false;
});

function cancelOrder(order) {
  Swal.fire({
    title: `Deseja cancelar pedido nº ${order.order_id}?`,
    text: 'Não poderá reverter após confirmação!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#374151',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Voltar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      // eslint-disable-next-line no-param-reassign
      order.active = false;
      const response = await OrderService.updateOrder(order);
      if (response) {
        const title = 'Pedido Cancelado!';
        const message = `Pedido nº ${order.order_id} foi cancelado.`;
        const url = 'account-order';
        await NotificationService.sendNotification(JSON.stringify({
          account_id: order.account_id,
          title: title,
          message: message,
          url: url,
        }));
        Swal.fire({
          icon: 'success',
          title: 'Pedido Cancelado!',
          text: `Pedido nº ${order.order_id} cancelado.`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // reloadOrders();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao cancelar pedido, tente mais tarde!',
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        });
      }
    }
  });
}

function forwardOrder(order) {
  Swal.fire({
    title: `Deseja dar sequência ao fluxo do pedido nº ${order.order_id}?`,
    text: 'Não poderá reverter após confirmação!',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#374151',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Voltar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const statusIds = [];
      const statusNames = [];
      const statusResponse = await StatusService.getStatuses();
      statusResponse.map((element) => statusIds.push(element.status_id));
      statusResponse.map((element) => statusNames.push(element.name));
      const statusIdIndex = statusIds.indexOf(parseInt(order.status.split('-')[0], 10));
      if (statusIds[statusIdIndex + 1] !== undefined) {
        // eslint-disable-next-line vue/max-len
        const response = await OrderService.createOrderStatus(order.order_id, statusIds[statusIdIndex + 1]);
        if (response) {
          const title = 'Oba! Pedido Atualizado!';
          const message = `Pedido nº ${order.order_id}: ${statusNames[statusIdIndex + 1]}.`;
          const url = 'account-order';
          await NotificationService.sendNotification(JSON.stringify({
            account_id: order.account_id,
            title: title,
            message: message,
            url: url,
          }));
          Swal.fire({
            icon: 'success',
            title: 'Status atualizado!',
            text: `Pedido nº ${order.order_id} atualizado.`,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            order.status = `${statusIds[statusIdIndex + 1]}-${statusNames[statusIdIndex + 1]}`
            // reloadOrders();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao atualizar status do pedido, tente mais tarde!',
            showConfirmButton: true,
            confirmButtonColor: '#374151',
          });
        }
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Já está no último fluxo!',
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        });
      }
    }
  });
}

</script>
