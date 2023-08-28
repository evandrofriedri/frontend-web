<template>
  <div class="flex min-h-screen bg-white ">
    <div class="flex-1 hidden lg:block relative w-0 px-20">
      <div class="flex h-full justify-center items-center">
        <img src="../assets/login.svg" alt="">
      </div>
    </div>
    <div class="flex flex-1 flex-col justify-center py-10 px-4 sm:px-6 lg:px-20">
      <div class="mx-auto w-full max-w-sm">
        <div class="p-5 bg-white sm:shadow-2xl sm:rounded-xl">
          <img src="../assets/login.svg" alt="" class="lg:hidden h-20 w-auto">
          <h2 class="mt-6 lg:mt-0 text-3xl font-semibold text-gray-700">
            Entrar
          </h2>
          <div class="mt-4 mb-4">
            <button class="inline-block w-full p-3.5 leading-none text-gray-700 bg-gray-50 border hover:bg-gray-200 font-semibold rounded-xl" type="submit">
              <font-awesome-icon icon="fa-brands fa-google" /> Fazer login com o Google
            </button>
          </div>
          <div class="flex py-3 items-center">
            <div class="flex-grow border-t border-gray-200" />
            <span class="mx-4 text-gray-200">ou</span>
            <div class="flex-grow border-t border-gray-200" />
          </div>
          <form action="" @submit.prevent="submitForm">
            <BaseInput id="email" v-model="formData.userEmail" label="E-mail" type="email" placeholder="E-mail" :errors="v$.userEmail.$errors" />
            <BaseInput id="senha" v-model="formData.password" label="Senha" type="password" placeholder="Senha" :errors="v$.password.$errors" />
            <div class="mb-4">
              <FormButton
                btn-type="submit"
                icon="fa-solid fa-arrow-right-to-bracket"
                description="Entrar"
              />
            </div>
            <div class="mb-4">
              <p><a href="" class="font-semibold text-gray-900">Esqueceu a senha?</a></p>
            </div>
            <div class="py-3 items-center">
              <div class="flex-grow border-t border-gray-200" />
            </div>
            <div class="mb-4">
              <span class="text-sm text-gray-700 max-w">
                Primeiro acesso?
              </span>
              <router-link class="font-semibold text-gray-900" to="/create-account">
                Cadastre-se
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import {
  required, email, helpers,
} from '@vuelidate/validators';
import BaseInput from '../components/BaseInput.vue';
import FormButton from '../components/FormButton.vue';

const formData = reactive({
  userEmail: '',
  password: '',
});

const rules = computed(() => ({
  userEmail: {
    required: helpers.withMessage('Campo obrigatório', required),
    email: helpers.withMessage('Insira um email válido', email),
  },
  password: {
    required: helpers.withMessage('Campo obrigatório', required),
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
