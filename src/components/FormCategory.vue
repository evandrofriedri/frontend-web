<template>
  <form action="" @submit.prevent="submitForm">
    <div class="flex flex-col max-h-[560px] overflow-auto">
      <div class="flex mb-2">
        <ReturnButton @click="closeModal()" />
        <h1 class="text-lg text-gray-800 font-medium text-justify">
          {{ labelForm }}
        </h1>
      </div>
      <div class="flex flex-col">
        <BaseInput id="name" v-model="category.name" label="Nome Categoria" type="text" placeholder="Nome Categoria" :errors="v$.name.$errors" />
        <BaseInput id="sequence" v-model="category.sequence" label="Ordem" type="number" placeholder="Ordem" max="99999" :errors="v$.sequence.$errors" />
      </div>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-start-6 md:col-start-8 col-end-13">
        <FormButton
          btn-type="submit"
          icon="fa-regular fa-floppy-disk"
          :description="labelBtn"
        />
      </div>
    </div>
  </form>
</template>
<script setup>
import {
  ref,
  computed,
  onMounted,
  inject,
} from 'vue';
import { useVuelidate } from '@vuelidate/core';
import {
  required, helpers,
} from '@vuelidate/validators';
import Swal from 'sweetalert2';
import BaseInput from './BaseInput.vue';
import FormButton from './FormButton.vue';
import ReturnButton from './ReturnButton.vue';
import CategoryService from '../services/CategoryService';

const emitter = inject('emitter');

const category = ref({
  id: null,
  name: null,
  sequence: null,
});

const props = defineProps({
  category: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
  labelForm: {
    type: String,
    default: '',
  },
  labelBtn: {
    type: String,
    default: '',
  },
});

function closeModal() {
  emitter.emit(`closeModal-FormCategory-${props.category.category_id}`);
}

function reloadCategory() {
  emitter.emit('reloadCategory');
}

onMounted(async () => {
  category.value = await props.category;
});

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  sequence: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
}));

const v$ = useVuelidate(rules, category);

const submitForm = async () => {
  const validated = await v$.value.$validate();

  if (!validated) {
    return false;
  }

  if (category.value.category_id === 0) {
    const response = await CategoryService.createCategory(category.value);
    if (response) {
      Swal.fire({
        icon: 'success',
        title: 'Cadastro realizado com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        closeModal();
        reloadCategory();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar nova categoria, tente mais tarde!',
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      });
    }
  } else {
    const response = await CategoryService.updateCategory(category.value);
    if (response) {
      Swal.fire({
        icon: 'success',
        title: 'Alteração realizada com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        closeModal();
        reloadCategory();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao editar adicional, tente mais tarde!',
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      });
    }
  }

  return true;
};

</script>
