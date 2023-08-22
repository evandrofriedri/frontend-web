<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-700">
      Dados da Conta
    </h1>
    <div class="p-5 bg-white shadow-md rounded-xl mb-3">
      <form action="" @submit.prevent="submitForm">
        <div class="flex flex-col md:flex-row">
          <div class="basis-1/2 pr-2">
            <BaseInput id="username" v-model="formData.userName" label="Nome Completo" type="text" placeholder="Nome Completo" :errors="v$.userName.$errors" />
            <BaseInput id="userEmail" v-model="formData.userEmail" label="E-mail" type="email" placeholder="E-mail" :errors="v$.userEmail.$errors" />
            <BaseInput id="cellphone" v-model="formData.cellphone" name="cellphone" label="Celular" type="text" placeholder="Ex: (xx) xxxxx-xxxx" :errors="v$.cellphone.$errors" />
          </div>
          <div class="basis-1/2">
            <BaseInput id="password" v-model="formData.password" label="Nova senha" type="password" placeholder="Senha de no mínimo 8 caracteres" :errors="v$.password.$errors" />
            <BaseInput id="confirmPassword" v-model="formData.confirmPassword" label="Confirmar senha" type="password" placeholder="Confirmação da senha" :errors="v$.confirmPassword.$errors" />
          </div>
        </div>
        <div class="flex">
          <div class="w-2/5 md:w-3/4" />
          <div class="w-3/5 md:w-1/4">
            <FormButton btn-type="submit" icon="fa-regular fa-floppy-disk" description="Salvar Dados" />
          </div>
        </div>
      </form>
    </div>
    <h1 class="mb-5 text-xl font-semibold text-gray-700">
      Apagar Conta
    </h1>
    <div class="p-5 bg-white shadow-md rounded-xl">
      <h1 class="text-gray-700">
        Apaga todos os dados e histórico da conta.
      </h1>
      <div class="flex">
        <div class="w-2/5 md:w-3/4" />
        <div class="w-3/5 md:w-1/4">
          <FormButton btn-type="submit" icon="fa-regular fa-trash-can" description="Apagar" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useVuelidate } from '@vuelidate/core';
import { useEventListener } from '@vueuse/core';
import {
  required, email, sameAs, minLength, helpers,
} from '@vuelidate/validators';
import { reactive, computed } from 'vue';
import BaseInput from '../components/BaseInput.vue';
import FormButton from '../components/FormButton.vue';

const formData = reactive({
  userName: '',
  userEmail: '',
  cellphone: '',
  password: '',
  confirmPassword: '',
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
  userName: { required: helpers.withMessage('Campo obrigatório', required) },
  userEmail: {
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
    sameAs: helpers.withMessage('As senhas não são iguais', sameAs(formData.password)),
  },
}));

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  const result = await v$.value.$validate();

  if (result) {
    console.log('fomr enviado!');
  } else {
    console.log('nao enviado!');
  }
};

</script>
