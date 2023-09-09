<template>
  <td class="px-2 py-2">
    {{ additional.name }}
  </td>
  <td class="px-2 py-2">
    {{ additional.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
  </td>
  <td class="px-2 py-2 ">
    <button type="button" title="Excluir Adicional" @click="addDelete(additional)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Editar Adicional" @click="isModalItemOpen = true">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
    </button>
  </td>
  <ModalWrapper :modal-open="isModalItemOpen">
    <FormAdditional label-form="Editar Adicional" label-btn="Salvar" :additional="additional" />
  </ModalWrapper>
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import ModalWrapper from './ModalWrapper.vue';
import FormAdditional from './FormAdditional.vue';

const isModalItemOpen = ref(false);

defineProps({
  additional: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

function addDelete(additional) {
  Swal.fire({
    title: `Deseja excluir o adicional ${additional.name}?`,
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
        title: 'Adicional Excluído!',
        text: `Adicional ${additional.name} excluído.`,
        confirmButtonColor: '#374151',
      });
    }
  });
  // chamar api para excluir o pedido, no caso fazer update para ativo = 0
}

</script>
