<template>
  <td class="px-2 py-2">
    {{ role.name }}
  </td>
  <td class="px-2 py-2">
    {{ role.description }}
  </td>
  <td class="px-2 py-2">
    <button type="button" title="Excluir Função" @click="deleteCtg(role)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Editar Função" @click="isModalItemOpen = true">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
    </button>
  </td>
  <ModalWrapper :modal-open="isModalItemOpen" :screen="`FormRole-${role.role_id}`">
    <FormRole label-form="Editar Função" label-btn="Salvar" :role="role" />
  </ModalWrapper>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import ModalWrapper from './ModalWrapper.vue';
import FormRole from './FormRole.vue';
import RoleService from '../services/RoleService';

const router = useRouter();
const isModalItemOpen = ref(false);
const emitter = inject('emitter');

const props = defineProps({
  role: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

emitter.on(`setModalFalse-FormRole-${props.role.role_id}`, () => {
  isModalItemOpen.value = false;
});

function deleteCtg(role) {
  Swal.fire({
    title: `Deseja excluir função ${role.name}?`,
    text: 'Não poderá reverter após confirmação!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#374151',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Voltar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await RoleService.deleteRole(role.role_id);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Função excluída com sucesso!',
          text: `Função ${role.name} excluída.`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.go(0);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir função, tente mais tarde!',
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        });
      }
    }
  });
}

</script>
