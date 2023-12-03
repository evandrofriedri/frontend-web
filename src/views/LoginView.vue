<template>
  <div class="flex min-h-screen bg-white ">
    <div class="flex-1 hidden lg:block relative w-0 px-20">
      <div class="flex h-full justify-center items-center">
        <img src="../assets/login.svg" alt="">
      </div>
    </div>
    <div class="flex flex-1 flex-col justify-center py-10 px-4 sm:px-6 lg:px-20">
      <div class="mx-auto w-full max-w-sm">
        <div class="p-5 bg-white sm:shadow-2xl sm:rounded">
          <img src="../assets/login.svg" alt="" class="lg:hidden h-20 w-auto">
          <h2 class="mt-6 lg:mt-0 text-3xl font-semibold text-gray-800">
            Entrar
          </h2>
          <div class="mt-4 mb-4">
            <div class="flex items-center">
              <GoogleLogin class="w-full" :callback="callback" prompt auto-login />
            </div>
            <!-- <button @click="callback">teste google</button> -->
          </div>
          <div class="flex py-3 items-center">
            <div class="flex-grow border-t border-gray-200" />
            <span class="mx-4 text-gray-200">ou</span>
            <div class="flex-grow border-t border-gray-200" />
          </div>
          <form action="" @submit.prevent="submitForm">
            <BaseInput id="email" v-model="formData.email" label="E-mail" type="email" placeholder="E-mail" :errors="v$.email.$errors" />
            <BaseInput id="senha" v-model="formData.password" label="Senha" type="password" placeholder="Senha" :errors="v$.password.$errors" />
            <div class="mb-4">
              <span v-if="erroMsg" class="text-sm text-red-600">
                <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="pl-1" />
                {{ erroMsg }}
              </span>
            </div>
            <div class="mb-4">
              <FormButton
                btn-type="submit"
                icon="fa-solid fa-arrow-right-to-bracket"
                description="Entrar"
              />
            </div>
            <div class="mb-4">
              <!-- TODO Criar pagina de esquecer senha -->
              <p><a href="" class="font-semibold text-gray-900">Esqueceu a senha?</a></p>
            </div>
            <div class="py-3 items-center">
              <div class="flex-grow border-t border-gray-200" />
            </div>
            <div class="mb-4">
              <span class="text-sm text-gray-800 max-w">
                Primeiro acesso?
              </span>
              <router-link class="font-semibold text-gray-900" to="/account/createAccount">
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
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import Swal from 'sweetalert2';
import {
  required, email, helpers,
} from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import BaseInput from '../components/BaseInput.vue';
import FormButton from '../components/FormButton.vue';
import AccountService from '../services/AccountService';
import { GoogleLogin, decodeCredential } from 'vue3-google-login';

const router = useRouter();

const formData = ref({
  email: '',
  password: '',
});

const erroMsg = ref(false);

const callback = async (response) => {
  const decodedCredential = decodeCredential(response.credential);
  // const decodedCredential = {
  //   "iss": "https://accounts.google.com",
  //   "azp": "519751075738-n94t0c9sntjousroj2bl2tejtiktnaju.apps.googleusercontent.com",
  //   "aud": "519751075738-n94t0c9sntjousroj2bl2tejtiktnaju.apps.googleusercontent.com",
  //   "sub": "103883578831345354607",
  //   "email": "evandrofriedri@gmail.com",
  //   "email_verified": true,
  //   "nbf": 1701461018,
  //   "name": "Evandro Friedrichsen",
  //   "picture": "https://lh3.googleusercontent.com/a/ACg8ocLTB_-KXlYj2GOmzd3zQNhqP45K-zQX0U8_jvwVUlrhAKw=s96-c",
  //   "given_name": "Evandro",
  //   "family_name": "Friedrichsen",
  //   "locale": "pt-BR",
  //   "iat": 1701461318,
  //   "exp": 1701464918,
  //   "jti": "6c9205c570b60e4a2604eb3512ac200a7937081f"
  // }
  if (decodedCredential.email_verified) {
    await loginWithGoogle(decodedCredential);
  }
}

const rules = computed(() => ({
  email: {
    required: helpers.withMessage('Campo obrigatório', required),
    email: helpers.withMessage('Insira um email válido', email),
  },
  password: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
}));

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
  const validated = await v$.value.$validate();

  if (validated) {
    const response = await AccountService.validateLogin({
      email: formData.value.email,
      password: formData.value.password,
    });

    if (response.response.data.token) {
      localStorage.setItem('jwt', response.response.data.token);
      Swal.fire({
        icon: 'success',
        title: 'Login realizado com sucesso!',
        text: `Olá ${response.response.data.account.name}!`,
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      }).then(() => {
        router.push({ name: 'Home' });
      });
    } else {
      erroMsg.value = response.response.data.message;
    }
  }
};

async function loginWithGoogle(user) {

  const response = await AccountService.validateGoogleLogin({
    name: user.name,
    email: user.email,
    password: user.azp,
    image_url: user.picture,
  });

  if (response.response.data.token) {
    localStorage.setItem('jwt', response.response.data.token);
    Swal.fire({
      icon: 'success',
      title: 'Login realizado com sucesso!',
      text: `Olá ${response.response.data.account.name}!`,
      showConfirmButton: true,
      confirmButtonColor: '#374151',
    }).then(() => {
      router.push({ name: 'Home' });
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Erro ao efetuar login!',
      text: `${response.response.data.message}`,
      showConfirmButton: true,
      confirmButtonColor: '#374151',
    });
  }
}

</script>
