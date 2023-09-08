<template>
  <td class="px-2 py-2">
    {{ account.name }}
  </td>
  <td class="px-2 py-2">
    {{ account.email }}
  </td>
  <td class="px-2 py-2">
    {{ account.cellphone }}
  </td>
  <td class="px-2 py-2">
    {{ account.status_id }}
  </td>
  <td class="px-2 py-2 ">
    <button type="button" title="Desativar Conta" @click="accountDeactivate(account)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Ativar Conta" @click="accountActivate(account)">
      <font-awesome-icon icon="fa-regular fa-square-caret-right" />
    </button>
  </td>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import Swal from 'sweetalert2';

const isModaltemOpen = ref(false);
const modal = ref(null);

defineProps({
  account: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

onClickOutside(modal, () => {
  isModaltemOpen.value = false;
});

function accountDeactivate(account) {
  Swal.fire({
    title: `Deseja desativar conta ${account.name}?`,
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
        title: 'Conta desativada!',
        text: `Conta ${account.name} desativada.`,
        confirmButtonColor: '#374151',
      });
    }
  });
  // chamar api para excluir o pedido, no caso fazer update para ativo = 0
}

function accountActivate(account) {
  Swal.fire({
    title: `Deseja ativar conta ${account.name}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#374151',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Voltar',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: 'Conta ativada!',
        text: `Conta ${account.name} ativada.`,
        confirmButtonColor: '#374151',
      });
    }
  });
  // chamar api para lançar data do status na tabela de status
  // atualizar o status_id na tabela de pedido
}

</script>
