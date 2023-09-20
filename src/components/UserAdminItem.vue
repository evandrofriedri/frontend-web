<template>
  <td class="px-2 py-2">
    {{ user.name }}
  </td>
  <td class="px-2 py-2">
    {{ user.email }}
  </td>
  <td class="px-2 py-2">
    {{ user.cellphone }}
  </td>
  <td class="px-2 py-2 ">
    <button type="button" title="Excluir Conta" @click="userDelete(user)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Editar Usuário" @click="isModalItemOpen = true">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
    </button>
  </td>
  <ModalWrapper :modal-open="isModalItemOpen">
    <FormUser label-form="Editar Usuário" label-btn="Salvar" :user="user" />
  </ModalWrapper>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import ModalWrapper from './ModalWrapper.vue';
import FormUser from './FormUser.vue';
import UserService from '../services/UserService';

const router = useRouter();
const isModalItemOpen = ref(false);
const emitter = inject('emitter');

defineProps({
  user: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

emitter.on('setModalFalse', () => {
  isModalItemOpen.value = false;
});

const userDelete = (user) => {
  Swal.fire({
    title: `Deseja excluir conta ${user.name}?`,
    text: 'Não poderá reverter após confirmação!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#374151',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Voltar',
  }).then((result) => {
    if (result.isConfirmed) {
      const response = UserService.deleteUser(user.user_id);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Conta excluída com sucesso!',
          text: `Conta ${user.name} excluida.`,
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        }).then(() => {
          router.go(0);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir usuário, tente mais tarde!',
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        });
      }
    }
  });
};

</script>
