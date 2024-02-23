<template>
  <form action="" @submit.prevent="submitForm">
    <div class="flex flex-col max-h-[560px] overflow-auto">
      <div v-if="showLabel" class="flex mb-2">
        <ReturnButton @click="closeModal()" />
        <h1 class="text-lg text-gray-800 font-medium text-justify">
          {{ labelForm }}
        </h1>
      </div>
      <div class="flex flex-col">
        <div class="grid gap-1 grid-cols-12">
          <div class="col-start-1 col-end-11">
            <div class="mb-4">
              <label for="cep" class="text-base text-gray-800 max-w"> Buscar CEP
                <input
                  class="appearance-none block w-full py-3 px-4 leading-tight text-gray-800 bg-gray-50 focus:bg-white border border-gray-200 rounded focus:border-gray-500 focus:outline-none"
                  placeholder="Informe o CEP"
                  v-model="cep"
                  name="cep"
                  autocomplete="on"
                  maxlength="9"
                />
              </label>
              <span v-if="cepError" class="text-sm text-red-600">
                <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="pl-1" />
                {{ cepError }}
              </span>
            </div>
          </div>
          <div class="col-start-11 col-end-13 mt-6">
            <FormButton icon="fa-solid fa-magnifying-glass" description="" title="Buscar CEP" @click="searchZipCode()" />
          </div>
        </div>
        <BaseInput id="description" v-model="address.description" label="Endereço" type="text" placeholder="Endereço" :errors="v$.description.$errors" />
        <BaseInput id="number" v-model="address.number" label="Número" type="number" placeholder="Número" max="99999" :errors="v$.number.$errors" />
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
import { useEventListener } from '@vueuse/core';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import cepPromise from 'cep-promise';
import BaseInput from './BaseInput.vue';
import FormButton from './FormButton.vue';
import ReturnButton from './ReturnButton.vue';
import AddressService from '../services/AddressService';

const router = useRouter();
const emitter = inject('emitter');
const cep = ref(null);
const cepError = ref(null);
const confirmRegistration = ref(true);

const address = ref({
  id: null,
  description: null,
  number: null,
  neighborhood: null,
  city: null,
  account_id: null,
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
  showLabel: {
    type: Boolean,
    default: true,
  },
  confirmRegistration: {
    type: Boolean,
    default: true,
  },
});

function closeModal() {
  emitter.emit(`closeModal-FormAddress-${props.address.address_id}`);
}

onMounted(async () => {
  address.value = await props.address;
  confirmRegistration.value = await props.confirmRegistration;
});

useEventListener(document, 'input', (evt) => {
  if (evt.target.name === 'cep') {
    const x = evt.target.value.replace(/\D/g, '').match(/(\d{0,5})(\d{0,3})/);
    // eslint-disable-next-line no-param-reassign
    evt.target.value = !x[2] ? x[1] : `${x[2] ? `${x[1]}-${x[2]}` : ''}`;
  }
});

const isAddressTaken = async (value) => {
  if (value) {
    const response = await AddressService.getFavoriteAddressID(
      address.value.account_id,
    );
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

  if (address.value.address_id === 0) {
    const response = await AddressService.createAddress(address.value);
    if (response) {
      if (confirmRegistration.value) {
        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado com sucesso!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.go(0);
        });
      } else {
        emitter.emit('closeFormAddress');
      }
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
        showConfirmButton: false,
        timer: 1500,
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

const searchZipCode = async () => {
  try {
    cepError.value = null;
    const data = JSON.parse(JSON.stringify(address.value));
    const result = await cepPromise(cep.value);
    data.description = result.street;
    data.neighborhood = result.neighborhood;
    data.city = `${result.city}-${result.state}`;
    address.value = data;
  } catch (error) {
    cepError.value = 'CEP não encontrado'
  }
}

</script>
