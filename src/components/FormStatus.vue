<template>
  <form action="" @submit.prevent="submitForm">
    <div class="flex flex-col">
      <div class="flex mb-2">
        <ReturnButton @click="closeModal()" />
        <h1 class="text-lg text-gray-800 font-medium text-justify">
          {{ labelForm }}
        </h1>
      </div>
      <div class="flex flex-col">
        <BaseInput id="name" v-model="status.name" label="Nome Status" type="text" placeholder="Nome Status" :errors="v$.name.$errors" />
        <BaseInput id="sequence" v-model="status.sequence" label="Ordem" type="number" placeholder="Ordem" :errors="v$.sequence.$errors" />
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
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import BaseInput from './BaseInput.vue';
import FormButton from './FormButton.vue';
import ReturnButton from './ReturnButton.vue';
import StatusService from '../services/StatusService';

const router = useRouter();
const emitter = inject('emitter');

const status = ref({
  id: null,
  name: null,
  sequence: null,
});

const props = defineProps({
  status: {
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
  emitter.emit('closeModal');
}

onMounted(async () => {
  status.value = await props.status;
});

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  sequence: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
}));

const v$ = useVuelidate(rules, status);

const submitForm = async () => {
  const validated = await v$.value.$validate();

  if (!validated) {
    return false;
  }

  if (status.value.status_id === undefined) {
    const response = await StatusService.createStatus(status.value);
    if (response) {
      Swal.fire({
        icon: 'success',
        title: 'Cadastro realizado com sucesso!',
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      }).then(() => {
        router.go(0);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar novo status, tente mais tarde!',
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      });
    }
  } else {
    const response = await StatusService.updateStatus(status.value);
    if (response) {
      Swal.fire({
        icon: 'success',
        title: 'Alteração realizada com sucesso!',
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      }).then(() => {
        router.go(0);
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
