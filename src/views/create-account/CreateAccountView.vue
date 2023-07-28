<template>
  <div class="flex min-h-screen bg-white ">
    <div class="flex-1 hidden lg:block relative w-0 px-20">
      <div class="flex h-full justify-center items-center">
        <img src="../../assets/undraw_sign_up_n6im.svg" alt="">
      </div>
    </div>
    <div class="flex flex-1 flex-col justify-center py-10 px-4 sm:px-6 lg:px-20">
      <div class="mx-auto w-full max-w-sm">
        <div class="p-5 bg-white sm:shadow-2xl sm:rounded">
          <img src="../../assets/undraw_sign_up_n6im.svg" alt="" class="lg:hidden h-20 w-auto">
          <h2 class="mt-6 mb-6 text-3xl font-semibold text-gray-700">
            Criar seu cadastro
          </h2>
          <form action="" @submit.prevent="submitForm">
            <BaseInput id="username" v-model="formData.userName" label="Nome Completo" type="text" placeholder="Nome Completo" :errors="v$.userName.$errors" />
            <BaseInput id="userEmail" v-model="formData.userEmail" label="Email" type="email" placeholder="Email" :errors="v$.userEmail.$errors" />
            <BaseInput id="password" v-model="formData.password" label="Senha" type="password" placeholder="Senha de no mínimo 8 caracteres" :errors="v$.password.$errors" />
            <BaseInput id="confirmPassword" v-model="formData.confirmPassword" label="Insira novamente a Senha" type="password" placeholder="Confirmação da senha" :errors="v$.confirmPassword.$errors" />
            <div class="mb-4">
              <button
                class="inline-block w-full py-4 px-8 leading-none text-white bg-gray-700 hover:bg-gray-900 font-semibold rounded"
                type="submit"
              >
                Cadastrar
              </button>
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
import { reactive, computed } from 'vue';
import BaseInput from '../../components/BaseInput.vue';

const formData = reactive({
  userName: '',
  userEmail: '',
  password: '',
  confirmPassword: '',
});

const rules = computed(() => ({
  userName: { required: helpers.withMessage('Campo obrigatório', required) },
  userEmail: {
    required: helpers.withMessage('Campo obrigatório', required),
    email: helpers.withMessage('Insira um email válido', email),
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
