<template>
  <td class="px-2 py-2">
    {{ product.name }}
  </td>
  <td class="px-2 py-2 hidden sm:table-cell">
    {{ product.description }}
  </td>
  <td class="px-2 py-2">
    {{ product.category }}
  </td>
  <td class="px-2 py-2">
    {{ product.price }}
  </td>
  <td class="px-2 py-2 ">
    <button type="button" title="Excluir Produto" @click="deletePdt(product)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Editar Produto" @click="isModalItemOpen = true">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
    </button>
  </td>
  <ModalWrapper :modal-open="isModalItemOpen" :screen="`FormProduct-${product.product_id}`">
    <FormProduct label-form="Editar Produto" label-btn="Salvar" :product="product" />
  </ModalWrapper>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import ModalWrapper from './ModalWrapper.vue';
import FormProduct from './FormProduct.vue';
import ProductService from '../services/ProductService';

const router = useRouter();
const isModalItemOpen = ref(false);
const emitter = inject('emitter');

const props = defineProps({
  product: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

emitter.on(`setModalFalse-FormProduct-${props.product.product_id}`, () => {
  isModalItemOpen.value = false;
});

function deletePdt(product) {
  Swal.fire({
    title: `Deseja excluir produto ${product.name}?`,
    text: 'Não poderá reverter após confirmação!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#374151',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Voltar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      let response = await ProductService.deleteProductAdditionals(product.product_id);
      response = await ProductService.deleteProduct(product.product_id);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Produto excluído com sucesso!',
          text: `Produto ${product.name} excluído.`,
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        }).then(() => {
          router.go(0);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir produto, tente mais tarde!',
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        });
      }
    }
  });
}

</script>
