<template>
  <td class="px-2 py-2">
    {{ additional.name }}
  </td>
  <td class="px-2 py-2">
    {{ additional.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
  </td>
  <td class="px-2 py-2">
    <button type="button" title="Excluir Adicional" @click="deleteAdd(additional)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Editar Adicional" @click="isModalItemOpen = true">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
    </button>
  </td>
  <ModalWrapper :modal-open="isModalItemOpen" :screen="`FormAdditional-${additional.additional_id}`">
    <FormAdditional label-form="Editar Adicional" label-btn="Salvar" :additional="additional" />
  </ModalWrapper>
</template>

<script setup>
import { ref, inject } from 'vue';
import Swal from 'sweetalert2';
import ModalWrapper from './ModalWrapper.vue';
import FormAdditional from './FormAdditional.vue';
import AdditionalService from '../services/AdditionalService';

const isModalItemOpen = ref(false);
const emitter = inject('emitter');

function reloadAdditional() {
  emitter.emit('reloadAdditional');
}

const props = defineProps({
  additional: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

emitter.on(`setModalFalse-FormAdditional-${props.additional.additional_id}`, () => {
  isModalItemOpen.value = false;
});

function deleteAdd(additional) {
  Swal.fire({
    title: `Deseja excluir adicional ${additional.name}?`,
    text: 'Não poderá reverter após confirmação!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#374151',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Voltar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await AdditionalService.deleteAdditional(additional.additional_id);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Adicional excluído com sucesso!',
          text: `Adicional ${additional.name} excluído.`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          reloadAdditional();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir adicional, tente mais tarde!',
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        });
      }
    }
  });
}

</script>
