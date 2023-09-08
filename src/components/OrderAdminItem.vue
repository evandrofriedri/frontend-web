<template>
  <td class="px-2 py-2">
    {{ props.order.pedido_id }}
  </td>
  <td class="px-2 py-2">
    {{ props.order.data_pedido }}
  </td>
  <td class="px-2 py-2">
    {{ props.order.descricao }}
  </td>
  <td class="px-2 py-2">
    {{ props.order.observation }}
  </td>
  <td class="px-2 py-2">
    {{ props.order.total }}
  </td>
  <td class="px-2 py-2 font-medium ">
    {{ props.order.status_id }}
  </td>
  <td class="px-2 py-2 ">
    <button type="button" title="Cancelar Pedido" @click="orderCancel(props.order)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Adicionar observação no pedido" @click="isModalItemOpen = true">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Dar sequência ao fluxo do pedido" @click="orderForward(props.order)">
      <font-awesome-icon icon="fa-regular fa-square-caret-right" />
    </button>
  </td>
  <ModalWrapper :modal-open="isModalItemOpen">
    <div class="flex mb-2">
      <ReturnButton @click="isModalItemOpen = false" />
      <h1 class="text-lg text-gray-800 font-semibold text-justify">
        {{ props.order.name }}
      </h1>
    </div>
    <div class="flex flex-col">
      <h1 class="text-lg text-gray-800 font-medium text-justify mt-2">
        Pedido Nº {{ props.order.pedido_id }}
      </h1>
      <label class="mt-2">
        <div class="text-base text-gray-800">Observações</div>
        <textarea
          :value="props.order.observation"
          class="w-full"
          rows="3"
          placeholder="Ex:Retirar cebola, retirar molho..."
          maxlength="80"
        />
      </label>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-start-6 md:col-start-10 col-end-13">
        <FormButton
          icon="fa-regular fa-floppy-disk"
          description="Salvar"
          @click="addObs();isModalItemOpen = false"
        />
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup>
import { ref, inject } from 'vue';
import Swal from 'sweetalert2';
import FormButton from './FormButton.vue';
import ModalWrapper from './ModalWrapper.vue';
import ReturnButton from './ReturnButton.vue';

const isModalItemOpen = ref(false);
const emitter = inject('emitter');

const props = defineProps({
  order: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

emitter.on('setModalFalse', () => {
  isModalItemOpen.value = false;
});

function orderCancel(order) {
  console.log(order.id);
  Swal.fire({
    title: `Deseja cancelar pedido nº ${order.pedido_id}?`,
    text: 'Não poderá reverter após confirmação!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#374151',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Voltar',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: 'Pedido Cancelado!',
        text: `Pedido nº ${order.pedido_id} cancelado.`,
        confirmButtonColor: '#374151',
      });
    }
  });
  // chamar api para excluir o pedido, no caso fazer update para ativo = 0
}

function orderForward(order) {
  Swal.fire({
    title: `Deseja dar sequêncio ao fluxo do pedido nº ${order.pedido_id}?`,
    text: 'Não poderá reverter após confirmação!',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#374151',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Voltar',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: 'Status atualizado!',
        text: `Pedido nº ${order.pedido_id} atualizado.`,
        confirmButtonColor: '#374151',
      });
    }
  });
  // chamar api para lançar data do status na tabela de status
  // atualizar o status_id na tabela de pedido
}

function addObs() {
  // let itemsCart;
  // if (localStorage.getItem('itemsCart') === null) {
  //   itemsCart = [];
  // } else {
  //   itemsCart = JSON.parse(localStorage.getItem('itemsCart'));
  // }

  // itemsCart.push(itemCart);
  // localStorage.setItem('itemsCart', JSON.stringify(itemsCart));

  // resetItem();
}

</script>
