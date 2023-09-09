<template>
  <td class="px-2 py-2">
    {{ address.address }}
  </td>
  <td class="px-2 py-2">
    {{ address.number }}
  </td>
  <td class="px-2 py-2">
    {{ address.neighborhood }}
  </td>
  <td class="px-2 py-2">
    {{ address.city }}
  </td>
  <td class="px-2 py-2">
    <font-awesome-icon :icon="`${ address.favorite == true ? 'fa-solid' : 'fa-regular'} fa-star`" :class="`${ address.favorite == true ? 'text-yellow-500' : ''}`" size="lg" />
  </td>
  <td class="px-2 py-2 ">
    <button type="button" title="Excluir Endereço" @click="addressDeactivate(address)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Editar Endereço" @click="isModalItemOpen = true">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
    </button>
  </td>
  <ModalWrapper :modal-open="isModalItemOpen">
    <FormAddress label-form="Editar Endereço" label-btn="Salvar" :address="address" />
  </ModalWrapper>
</template>

<script setup>
import { ref, inject } from 'vue';
import Swal from 'sweetalert2';
import FormAddress from './FormAddress.vue';
import ModalWrapper from './ModalWrapper.vue';

const isModalItemOpen = ref(false);
const emitter = inject('emitter');

defineProps({
  address: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

emitter.on('setModalFalse', () => {
  isModalItemOpen.value = false;
});

function addressDeactivate(address) {
  Swal.fire({
    title: `Deseja excluir endereço ${address.address}?`,
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
        title: 'Endereço excluído!',
        text: `Endereço ${address.address} excluído.`,
        confirmButtonColor: '#374151',
      });
    }
  });
  // chamar api para excluir o pedido, no caso fazer update para ativo = 0
}

</script>
