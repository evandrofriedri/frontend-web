<template>
  <div class="flex min-h-screen bg-white ">
    <div class="flex-1 hidden lg:block relative w-0 px-20">
      <div class="flex h-full justify-center items-center">
        <LogoCard color="black" class="h-52 w-64" />
      </div>
    </div>
    <div class="flex flex-1 flex-col justify-center py-10 px-4 sm:px-6 lg:px-20">
      <div class="mx-auto w-full max-w-sm">
        <div class="p-5 bg-white sm:shadow-2xl sm:rounded">
          <LogoCard color="black" class="lg:hidden h-20 w-24" />
          <h2 class="mt-6 mb-6 text-3xl font-semibold text-gray-800">
            Criar seu cadastro
          </h2>
          <form action="" @submit.prevent="submitForm">
            <BaseInput id="name" v-model="account.name" label="Nome Completo" type="text" placeholder="Nome Completo" :errors="v$.name.$errors" />
            <BaseInput id="email" v-model="account.email" label="E-mail" type="email" placeholder="E-mail" :errors="v$.email.$errors" />
            <BaseInput id="cellphone" v-model="account.cellphone" name="cellphone" label="Celular" type="text" placeholder="Ex: (xx) xxxxx-xxxx" :errors="v$.cellphone.$errors" />
            <BaseInput id="password" v-model="account.password" label="Senha" type="password" placeholder="Senha de no mínimo 8 caracteres" :errors="v$.password.$errors" />
            <BaseInput id="confirmPassword" v-model="account.confirmPassword" label="Insira novamente a Senha" type="password" placeholder="Confirmação da senha" :errors="v$.confirmPassword.$errors" />
            <div class="mb-4">
              <FormButton btn-type="submit" icon="fa-regular fa-floppy-disk" description="Cadastrar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import {
  required, email, sameAs, minLength, helpers,
} from '@vuelidate/validators';
import { ref, computed } from 'vue';
import { useEventListener } from '@vueuse/core';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import BaseInput from '../../components/BaseInput.vue';
import FormButton from '../../components/FormButton.vue';
import AccountService from '../../services/AccountService';
import RoleService from '../../services/RoleService';
import LogoCard from '../../components/LogoCard.vue';

const router = useRouter();

const account = ref({
  name: null,
  email: null,
  cellphone: null,
  password: null,
  confirmPassword: null,
  role_id: null,
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
}));

const v$ = useVuelidate(rules, account);

const submitForm = async () => {
  const validated = await v$.value.$validate();

  if (!validated) {
    return false;
  }

  const role = await RoleService.getRoleID('client');

  account.value.role_id = role[0].role_id;
  const response = await AccountService.createAccount(account.value);
  if (response.response.data.token) {
    // const expiresIn = new Date().getTime() + (7200000);
    // localStorage.setItem('jwt', JSON.stringify({value: response.response.data.token, expires: expiresIn}));
    Swal.fire({
      icon: 'success',
      title: 'Cadastro realizado com sucesso!',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      router.push({ name: 'Login' });
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
  return true;
};

</script>
