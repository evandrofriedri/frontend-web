<template>
  <td class="px-2 py-2">
    {{ account.name }}
  </td>
  <td class="px-2 py-2">
    {{ account.email }}
  </td>
  <td class="px-2 py-2 hidden sm:table-cell">
    {{ account.cellphone }}
  </td>
  <td class="px-2 py-2 hidden sm:table-cell">
    {{ account.active_name }}
  </td>
  <td class="px-2 py-2 ">
    <button type="button" title="Excluir Conta" @click="deleteAccount(account)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Editar Usuário" @click="isModalItemOpen = true">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
    </button>
  </td>
  <ModalWrapper :modal-open="isModalItemOpen" :screen="`FormAccount-${account.account_id}`">
    <FormAccount label-form="Editar Usuário" label-btn="Salvar" :account="account" />
  </ModalWrapper>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import ModalWrapper from './ModalWrapper.vue';
import FormAccount from './FormAccount.vue';
import AccountService from '../services/AccountService';

const router = useRouter();
const isModalItemOpen = ref(false);
const emitter = inject('emitter');

const props = defineProps({
  account: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

emitter.on(`setModalFalse-FormAccount-${props.account.account_id}`, () => {
  isModalItemOpen.value = false;
});

function deleteAccount(account) {
  Swal.fire({
    title: `Deseja excluir conta ${account.name}?`,
    text: 'Não poderá reverter após confirmação!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#374151',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Voltar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await AccountService.deleteAccount(account.account_id);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Conta excluída com sucesso!',
          text: `Conta ${account.name} excluida.`,
          showConfirmButton: false,
          timer: 1500,
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
}

</script>
