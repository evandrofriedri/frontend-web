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
    </button>
  </td>
  <ModalWrapper :modal-open="isModalItemOpen">
    <FormProduct label-form="Editar Produto" label-btn="Salvar" :product="product" />
  </ModalWrapper>
</template>

<script setup>
import { ref, inject } from 'vue';
import Swal from 'sweetalert2';
import FormProduct from './FormProduct.vue';
import ModalWrapper from './ModalWrapper.vue';

const isModalItemOpen = ref(false);
const emitter = inject('emitter');

defineProps({
  product: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

emitter.on('setModalFalse', () => {
  isModalItemOpen.value = false;
});

function pdtDelete(product) {
  Swal.fire({
    title: `Deseja excluir o produto ${product.name}?`,
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
        text: `Produto ${product.name} excluído.`,
        confirmButtonColor: '#374151',
      });
    }
  });
  // chamar api para excluir o pedido, no caso fazer update para ativo = 0
}

</script>
