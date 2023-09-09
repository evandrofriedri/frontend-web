<template>
  <td class="px-2 py-2">
    {{ category.name }}
  </td>
  <td class="px-2 py-2 ">
    <button type="button" title="Excluir Categoria" @click="ctgDelete(category)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Editar Categoria" @click="isModaltemOpen = true">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
    </button>
  </td>
  <ModalWrapper :modal-open="isModaltemOpen">
    <FormCategory label-form="Editar Categoria" label-btn="Salvar" :category="category" />
  </ModalWrapper>
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import ModalWrapper from './ModalWrapper.vue';
import FormCategory from './FormCategory.vue';

const isModaltemOpen = ref(false);

defineProps({
  category: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

function ctgDelete(category) {
  Swal.fire({
    title: `Deseja excluir a categoria ${category.name}?`,
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
        title: 'Categoria Excluída!',
        text: `Categoria ${category.name} excluída.`,
        confirmButtonColor: '#374151',
      });
    }
  });
  // chamar api para excluir o pedido, no caso fazer update para ativo = 0
}

</script>
