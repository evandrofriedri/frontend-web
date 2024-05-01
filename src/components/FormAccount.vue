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
        <BaseInput id="name" v-model="account.name" label="Nome Completo" type="text" placeholder="Nome Completo" :errors="v$.name.$errors" />
        <BaseInput id="email" v-model="account.email" label="E-mail" type="email" placeholder="E-mail" :errors="v$.email.$errors" />
        <BaseInput id="cellphone" v-model="account.cellphone" name="cellphone" label="Celular" type="text" placeholder="Ex: (xx) xxxxx-xxxx" :errors="v$.cellphone.$errors" />
        <BaseInput id="password" v-model="account.password" label="Senha" type="password" placeholder="Senha de no mínimo 8 caracteres" :errors="v$.password.$errors" />
        <BaseInput id="confirmPassword" v-model="account.confirmPassword" label="Insira novamente a Senha" type="password" placeholder="Confirmação da senha" :errors="v$.confirmPassword.$errors" />
        <SelectInput id="role" v-model="account.role_id" name="role" :items="roles" label="Função" :errors="v$.role_id.$errors" />
        <div class="flex mb-4">
          <label for="chkAccountActive" class="text-base text-gray-800 max-w">
            <input
              id="chkAccountActive"
              v-model="account.active"
              class="text-gray-800 bg-gray-50 mr-2 focus:bg-white border border-gray-200 rounded focus:border-gray-500 focus:outline-none checked:bg-gray-100"
              type="checkbox"
            />
          </label>
          <p>Conta Ativa</p>
        </div>
        <div v-if="account.account_id != 0" class="flex mb-4">
          <label for="chkKeepPass" class="text-base text-gray-800 max-w">
            <input
              id="chkKeepPass"
              v-model="account.keep_pass"
              class="text-gray-800 bg-gray-50 mr-2 focus:bg-white border border-gray-200 rounded focus:border-gray-500 focus:outline-none checked:bg-gray-100"
              type="checkbox"
              @change="toggleCheck"
            />
          </label>
          <p>Manter Senha</p>
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
  computed,
  onMounted,
  inject,
  ref,
} from 'vue';
import { useEventListener } from '@vueuse/core';
import { useVuelidate } from '@vuelidate/core';
import {
  required, email, sameAs, minLength, helpers,
} from '@vuelidate/validators';
import Swal from 'sweetalert2';
import BaseInput from './BaseInput.vue';
import FormButton from './FormButton.vue';
import ReturnButton from './ReturnButton.vue';
import AccountService from '../services/AccountService';
import RoleService from '../services/RoleService';
import SelectInput from './SelectInput.vue';

const emitter = inject('emitter');
const roles = ref([]);

const account = ref({
  name: null,
  email: null,
  cellphone: null,
  password: null,
  confirmPassword: null,
  role_id: null,
  keep_pass: null,
});

const props = defineProps({
  account: {
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
  emitter.emit(`closeModal-FormAccount-${props.account.account_id}`);
}

function reloadAccount() {
  emitter.emit('reloadAccount');
}

async function loadRoles() {
  const response = await RoleService.getRoles();
  const data = [];
  response.forEach(element => {
    data.push({
      id: element.role_id,
      name: element.description,
    });
  });
  return data;
}

onMounted(async () => {
  account.value = await props.account;
  roles.value = await loadRoles();
});

const number = helpers.regex(
  /^\([1-9]{2}\) [0-9]{5}-[0-9]{4}$/,
);

useEventListener(document, 'input', (evt) => {
  if (evt.target.name === 'cellphone') {
    const x = evt.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    // eslint-disable-next-line no-param-reassign
    evt.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
  }
});

const rules = computed(() => ({
  name: { required: helpers.withMessage('Campo obrigatório', required) },
  email: {
    required: helpers.withMessage('Campo obrigatório', required),
    email: helpers.withMessage('Insira um email válido', email),
  },
  cellphone: {
    required: helpers.withMessage('Campo obrigatório', required),
    number: helpers.withMessage('Formato inválido Ex: (xx) xxxxx-xxxx', number),
  },
  password: {
    required: helpers.withMessage('Campo obrigatório', required),
    minLength: helpers.withMessage('Mínimo 8 caracteres', minLength(8)),
  },
  confirmPassword: {
    required: helpers.withMessage('Campo obrigatório ', required),
    sameAs: helpers.withMessage('As senhas não são iguais', sameAs(account.value.password)),
  },
  role_id: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
}));

const v$ = useVuelidate(rules, account);

const submitForm = async () => {
  const validated = await v$.value.$validate();

  if (!validated) {
    return false;
  }

  if (account.value.account_id === 0) {
    const response = await AccountService.createAccount(account.value);
    if (response.response.data.message === 'Conta criada com sucesso!') {
      Swal.fire({
        icon: 'success',
        title: 'Cadastro realizado com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        closeModal();
        reloadAccount();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar novo usuário!',
        text: `${response.response.data.message}`,
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      });
    }
  } else {
    const response = await AccountService.updateAccount(account.value);
    if (response.response.data.message === 'Conta atualizada com sucesso!') {
      Swal.fire({
        icon: 'success',
        title: 'Alteração realizada com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        closeModal();
        reloadAccount();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao editar usuário!',
        text: `${response.response.data.message}`,
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      });
    }
  }

  return true;
};

function toggleCheck() {
  if (account.value.keep_pass) {
    account.value.confirmPassword = account.value.password;
  } else {
    account.value.confirmPassword = null;
  }
}

</script>
