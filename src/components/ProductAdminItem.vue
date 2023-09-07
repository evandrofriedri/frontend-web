<template>
  <td class="px-2 py-2">
    {{ product.name }}
  </td>
  <td class="px-2 py-2">
    {{ product.description }}
  </td>
  <td class="px-2 py-2">
    {{ product.category }}
  </td>
  <td class="px-2 py-2">
    {{ product.status_id }}
  </td>
  <td class="px-2 py-2 ">
    <button type="button" title="Excluir Produto" @click="pdtDelete(product)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Editar Produto" @click="isModalItemOpen = true">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
    </button>&nbsp;&nbsp;
  </td>
  <Teleport to="#modal">
    <Transition name="modal">
      <div v-if="isModalItemOpen" class="flex fixed top-0 left-0 z-10 w-screen h-screen bg-black/50 justify-center items-center">
        <div ref="modal" class="relative mx-auto w-full max-w-xs md:max-w-md lg:max-w-lg bg-white shadow-2xl rounded">
          <FormProductItem :product="product" />
          <!-- <div class="p-4 flex flex-col">
            <h1 class="text-lg text-gray-800 font-medium text-justify mt-2">
              Pedido Nº {{ product.pedido_id }}
            </h1>
            <label class="mt-2">
              <div class="text-base text-gray-800">Observações</div>
              <textarea
                :value="product.observation"
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
                @click="addObs();isModalItemOpen = false"
              />
            </div>
          </div> -->
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import Swal from 'sweetalert2';
// import FormButton from './FormButton.vue';
import FormProductItem from './FormProductItem.vue';

const isModalItemOpen = ref(false);
const modal = ref(null);

defineProps({
  product: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

onClickOutside(modal, () => {
  isModalItemOpen.value = false;
});

function pdtDelete(menu) {
  Swal.fire({
    title: `Deseja excluir o produto ${menu.name}?`,
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

// function menuForward(menu) {
//   Swal.fire({
//     title: `Deseja dar sequêncio ao fluxo do pedido nº ${menu}?`,
//     text: 'Não poderá reverter após confirmação!',
//     icon: 'question',
//     showCancelButton: true,
//     confirmButtonColor: '#374151',
//     cancelButtonColor: '#EF4444',
//     confirmButtonText: 'Confirmar',
//     cancelButtonText: 'Voltar',
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire({
//         icon: 'success',
//         title: 'Status atualizado!',
//         text: `Pedido nº ${menu} atualizado.`,
//         confirmButtonColor: '#374151',
//       });
//     }
//   });
//   // chamar api para lançar data do status na tabela de status
//   // atualizar o status_id na tabela de pedido
// }

// function addObs() {
//   // let itemsCart;
//   // if (localStorage.getItem('itemsCart') === null) {
//   //   itemsCart = [];
//   // } else {
//   //   itemsCart = JSON.parse(localStorage.getItem('itemsCart'));
//   // }

//   // itemsCart.push(itemCart);
//   // localStorage.setItem('itemsCart', JSON.stringify(itemsCart));

//   // resetItem();
// }

</script>
