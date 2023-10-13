<template>
  <td class="px-2 py-2">
    {{ category.name }}
  </td>
  <td class="px-2 py-2">
    {{ category.sequence }}
  </td>
  <td class="px-2 py-2">
    <button type="button" title="Excluir Categoria" @click="deleteCtg(category)">
      <font-awesome-icon icon="fa-regular fa-trash-can" />
    </button>&nbsp;&nbsp;
    <button type="button" title="Editar Categoria" @click="isModalItemOpen = true">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
    </button>
  </td>
  <ModalWrapper :modal-open="isModalItemOpen">
    <FormCategory label-form="Editar Categoria" label-btn="Salvar" :category="category" />
  </ModalWrapper>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import ModalWrapper from './ModalWrapper.vue';
import FormCategory from './FormCategory.vue';
import CategoryService from '../services/CategoryService';

const router = useRouter();
const isModalItemOpen = ref(false);
const emitter = inject('emitter');

defineProps({
  category: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

emitter.on('setModalFalse', () => {
  isModalItemOpen.value = false;
});

function deleteCtg(category) {
  Swal.fire({
    title: `Deseja excluir categoria ${category.name}?`,
    text: 'Não poderá reverter após confirmação!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#374151',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Voltar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await CategoryService.deleteCategory(category.category_id);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Categoria excluída com sucesso!',
          text: `Categoria ${category.name} excluída.`,
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        }).then(() => {
          router.go(0);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir categoria, tente mais tarde!',
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        });
      }
    }
  });
}

</script>
