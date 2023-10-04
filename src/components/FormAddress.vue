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
        <BaseInput id="description" v-model="address.description" label="Endereço" type="text" placeholder="Endereço" :errors="v$.description.$errors" />
        <BaseInput id="number" v-model="address.number" label="Número" type="number" placeholder="Número" :errors="v$.number.$errors" />
        <BaseInput id="neighborhood" v-model="address.neighborhood" label="Bairro" type="text" placeholder="Bairro" :errors="v$.neighborhood.$errors" />
        <BaseInput id="city" v-model="address.city" label="Cidade" type="text" placeholder="Cidade" :errors="v$.city.$errors" />
        <div class="mb-4">
          <div class="flex">
            <label class="text-base text-gray-800 max-w">
              <input
                v-model="address.favorite"
                class="text-gray-800 bg-gray-50 mr-2 focus:bg-white border border-gray-200 rounded focus:border-gray-500 focus:outline-none checked:bg-gray-100"
                type="checkbox"
              />
            </label>
            <p>Endereço Padrão</p>
          </div>
          <span v-if="v$.favorite.$error" class="text-sm text-red-600">
            <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="pl-1" />
            Endereço padrão já definido
          </span>
        </div>
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
import AddressService from '../services/AddressService';

const router = useRouter();
const emitter = inject('emitter');

const address = ref({
  id: null,
  description: null,
  number: null,
  neighborhood: null,
  city: null,
  user_id: 29, // terá que ser usuario da sessão
  favorite: false,
});

const props = defineProps({
  address: {
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
  address.value = await props.address;
});

const isAddressTaken = async (value) => {
  if (value) {
    const response = await AddressService.getFavoriteAddressID(29); // usuario logado
    if (response.length === 0) {
      return true;
    }
    const result = response[0].address_id;
    if (result !== address.value.address_id) {
      return false;
    }
  }
  return true;
};

const rules = computed(() => ({
  description: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  number: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  neighborhood: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  city: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  favorite: {
    isUnique: helpers.withAsync(isAddressTaken),
    // isUnique: helpers.withMessage('Endereço Padrão já definido', isAddressTaken),
  },
}));

const v$ = useVuelidate(rules, address);

const submitForm = async () => {
  const validated = await v$.value.$validate();

  if (!validated) {
    return false;
  }

  if (address.value.address_id === undefined) {
    const response = await AddressService.createAddress(address.value);
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
        title: 'Erro ao cadastrar novo endereço, tente mais tarde!',
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      });
    }
  } else {
    const response = await AddressService.updateAddress(address.value);
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
        title: 'Erro ao editar endereço, tente mais tarde!',
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      });
    }
  }

  return true;
};

</script>
