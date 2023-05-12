<template>
  <div class="flex min-h-screen bg-white ">
    <div class="flex-1 hidden lg:block relative w-0 px-20">
      <div class="flex h-full justify-center items-center">
        <img src="../../assets/undraw_sign_up_n6im.svg" alt="">
      </div>
    </div>
    <div class="flex flex-1 flex-col justify-center py-10 px-4 sm:px-6 lg:px-20">
      <div class="mx-auto w-full max-w-sm">
        <div class="p-5 bg-white sm:shadow-2xl sm:rounded-xl">
          <img src="../../assets/undraw_sign_up_n6im.svg" alt="" class="lg:hidden h-20 w-auto">
          <h2 class="mt-6 mb-6 text-3xl text-center font-semibold text-gray-700">
            Criar seu cadastro
          </h2>
          <form action="" @submit.prevent="submitForm">
            <div class="mb-4">
              <label class="text-base text-gray-700 max-w"> Nome Completo
                <input
                  id="username2"
                  v-model.trim="formData.userName"
                  name="name"
                  class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white borde border-gray-200 rounded-md focus:outline-none"
                  type="text"
                />
              </label>
              <span v-for="error in v$.userName.$errors" :key="error.$uid" class="text-sm text-red-600">
                {{ error.$message }}
              </span>
            </div>
            <div class="mb-4">
              <p class="text-base text-gray-700 max-w">
                Email
              </p>
              <label>
                <input
                  id="userEmail2"
                  v-model.trim="formData.userEmail"
                  name="email"
                  class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white borde border-gray-200 rounded-md focus:outline-none"
                  type="text"
                />
              </label>
              <span v-for="error in v$.userEmail.$errors" :key="error.$uid" class="text-sm text-red-600">
                {{ error.$message }}
              </span>
            </div>
            <div class="mb-4">
              <p class="mt-3 text-base text-gray-700 max-w">
                Senha
              </p>
              <label>
                <input
                  id="password"
                  v-model="formData.password"
                  name="password"
                  class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white borde border-gray-200 rounded-md focus:outline-none"
                  type="password"
                />
              </label>
              <span v-for="error in v$.password.$errors" :key="error.$uid" class="text-sm text-red-600">
                {{ error.$message }}
              </span>
            </div>
            <div class="mb-4">
              <p class="mt-3 text-base text-gray-700 max-w">
                Insira novamente a Senha
              </p>
              <label>
                <input
                  id="confirmPassword"
                  v-model="formData.confirmPassword"
                  name="confirmPassword"
                  class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white borde border-gray-200 rounded-md focus:outline-none"
                  type="password"
                />
              </label>
              <span v-for="error in v$.confirmPassword.$errors" :key="error.$uid" class="text-sm text-red-600">
                {{ error.$message }}<br>
              </span>
            </div>
            <div class="mb-4">
              <button
                class="inline-block w-full py-4 px-8 leading-none text-white bg-blue-700 hover:bg-blue-900 font-semibold rounded-md"
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
