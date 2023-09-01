<template>
  <td class="px-2 py-2">
    {{ props.menu.name }}
  </td>
  <td class="px-2 py-2">
    {{ props.menu.description }}
  </td>
  <td class="px-2 py-2">
    {{ props.menu.category }}
  </td>
  <td class="px-2 py-2">
    {{ props.menu.status_id }}
  </td>
  <td class="px-2 py-2 ">
    <button type="button" title="Cancelar Pedido" @click="menuDelete(props.menu)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Adicionar observação no pedido" @click="isModaltemOpen = true">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Dar sequência ao fluxo do pedido" @click="menuForward(props.menu.status_id)">
      <font-awesome-icon icon="fa-regular fa-square-caret-right" />
    </button>
  </td>
  <Teleport to="#modal">
    <Transition name="modal">
      <div v-if="isModaltemOpen" class="flex fixed top-0 left-0 z-10 w-screen h-screen bg-black/50 justify-center items-center">
        <div ref="modal" class="relative bg-white rounded-xl shadow-2xl">
          <CloseButton @click="isModaltemOpen = false" />
          <div class="mx-auto w-full max-w-xs md:max-w-md lg:max-w-lg bg-white shadow-2xl rounded-xl">
            <div class="p-4 flex flex-col">
              <h1 class="text-lg text-gray-800 font-medium text-justify mt-2">
                Pedido Nº {{ props.menu.pedido_id }}
              </h1>
              <label class="mt-2">
                <div class="text-base text-gray-800">Observações</div>
                <textarea
                  :value="props.menu.observation"
                  class="w-full"
                  rows="3"
                  placeholder="Ex:Retirar cebola, retirar molho..."
                  maxlength="80"
                />
              </label>
            </div>
            <div class="p-4 grid grid-cols-12">
              <div class="col-start-6 md:col-start-10 col-end-13">
                <FormButton
                  icon="fa-solid fa-cart-shopping"
                  description="Alterar Observação"
                  @click="addObs();isModaltemOpen = false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import Swal from 'sweetalert2';
import FormButton from './FormButton.vue';
import CloseButton from './CloseButton.vue';

const isModaltemOpen = ref(false);
const modal = ref(null);

const props = defineProps({
  menu: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

onClickOutside(modal, () => {
  isModaltemOpen.value = false;
});

function menuDelete(menu) {
  Swal.fire({
    title: `Deseja excluir produto ${menu.name}?`,
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
        title: 'Produto Excluído!',
        text: `Produto ${menu.name} excluído.`,
        confirmButtonColor: '#374151',
      });
    }
  });
  // chamar api para excluir o pedido, no caso fazer update para ativo = 0
}

function menuForward(menu) {
  Swal.fire({
    title: `Deseja dar sequêncio ao fluxo do pedido nº ${menu}?`,
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
        text: `Pedido nº ${menu} atualizado.`,
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

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
