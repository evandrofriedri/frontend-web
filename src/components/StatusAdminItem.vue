<template>
  <td class="px-2 py-2">
    {{ status.name }}
  </td>
  <td class="px-2 py-2">
    {{ status.sequence }}
  </td>
  <td class="px-2 py-2">
    <button type="button" title="Excluir Status" @click="deleteStt(status)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Editar Status" @click="isModalItemOpen = true">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
    </button>
  </td>
  <ModalWrapper :modal-open="isModalItemOpen" :screen="`FormStatus-${status.status_id}`">
    <FormStatus label-form="Editar Status" label-btn="Salvar" :status="status" />
  </ModalWrapper>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import ModalWrapper from './ModalWrapper.vue';
import FormStatus from './FormStatus.vue';
import StatusService from '../services/StatusService';

const router = useRouter();
const isModalItemOpen = ref(false);
const emitter = inject('emitter');

const props = defineProps({
  status: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

emitter.on(`setModalFalse-FormStatus-${props.status.status_id}`, () => {
  isModalItemOpen.value = false;
});

function deleteStt(status) {
  Swal.fire({
    title: `Deseja excluir status ${status.name}?`,
    text: 'Não poderá reverter após confirmação!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#374151',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Voltar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await StatusService.deleteStatus(status.status_id);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Status excluída com sucesso!',
          text: `Status ${status.name} excluída.`,
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        }).then(() => {
          router.go(0);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir status, tente mais tarde!',
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        });
      }
    }
  });
}

</script>
