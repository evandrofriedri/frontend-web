<template>
  <td class="px-2 py-2">
    {{ address.description }}
  </td>
  <td class="px-2 py-2">
    {{ address.number }}
  </td>
  <td class="px-2 py-2 hidden sm:table-cell">
    {{ address.neighborhood }}
  </td>
  <td class="px-2 py-2">
    {{ address.city }}
  </td>
  <td class="px-2 py-2 hidden sm:table-cell">
    <font-awesome-icon :icon="`${ address.favorite == true ? 'fa-solid' : 'fa-regular'} fa-star`" :class="`${ address.favorite == true ? 'text-yellow-500' : ''}`" size="lg" />
  </td>
  <td class="px-2 py-2 ">
    <button type="button" title="Excluir Endereço" @click="DeleteAddress(address)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Editar Endereço" @click="isModalItemOpen = true">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
    </button>
  </td>
  <ModalWrapper :modal-open="isModalItemOpen" :screen="`FormAddress-${address.address_id}`">
    <FormAddress label-form="Editar Endereço" label-btn="Salvar" :address="address" />
  </ModalWrapper>
</template>

<script setup>
import { ref, inject } from 'vue';
import Swal from 'sweetalert2';
import FormAddress from './FormAddress.vue';
import ModalWrapper from './ModalWrapper.vue';
import AddressService from '../services/AddressService';

const isModalItemOpen = ref(false);
const emitter = inject('emitter');

function reloadAddress() {
  emitter.emit('reloadAddress');
}

const props = defineProps({
  address: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

emitter.on(`setModalFalse-FormAddress-${props.address.address_id}`, () => {
  isModalItemOpen.value = false;
});

function DeleteAddress(address) {
  Swal.fire({
    title: `Deseja excluir endereço ${address.description}?`,
    text: 'Não poderá reverter após confirmação!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#374151',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Voltar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await AddressService.deleteAddress(address.address_id);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Endereço excluído com sucesso!',
          text: `Endereço ${address.description} excluído.`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          reloadAddress();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir endereço, tente mais tarde!',
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        });
      }
    }
  });
}

</script>
