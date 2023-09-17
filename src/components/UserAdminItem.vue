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
  <td class="px-2 py-2">
    {{ user.status_id }}
  </td>
  <td class="px-2 py-2 ">
    <button type="button" title="Desativar Conta" @click="userDeactivate(user)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Ativar Conta" @click="userActivate(user)">
      <font-awesome-icon icon="fa-regular fa-square-caret-right" />
    </button>
  </td>
</template>

<script setup>
import Swal from 'sweetalert2';

defineProps({
  user: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

function userDeactivate(user) {
  Swal.fire({
    title: `Deseja desativar conta ${user.name}?`,
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
        text: `Conta ${user.name} desativada.`,
        confirmButtonColor: '#374151',
      });
    }
  });
  // chamar api para excluir o pedido, no caso fazer update para ativo = 0
}

function userActivate(user) {
  Swal.fire({
    title: `Deseja ativar conta ${user.name}?`,
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
        text: `Conta ${user.name} ativada.`,
        confirmButtonColor: '#374151',
      });
    }
  });
  // chamar api para lançar data do status na tabela de status
  // atualizar o status_id na tabela de pedido
}

</script>
