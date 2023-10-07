<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
      Dados da Conta
    </h1>
    <div class="p-5 bg-white shadow-md rounded mb-3">
      <form action="" @submit.prevent="submitForm">
        <div class="flex flex-col md:flex-row">
          <div class="basis-1/2 pr-0 md:pr-2">
            <BaseInput id="name" v-model="user.name" label="Nome Completo" type="text" placeholder="Nome Completo" :errors="v$.name.$errors" />
            <BaseInput id="email" v-model="user.email" label="E-mail" type="email" placeholder="E-mail" :errors="v$.email.$errors" />
            <BaseInput id="cellphone" v-model="user.cellphone" name="cellphone" label="Celular" type="text" placeholder="Ex: (xx) xxxxx-xxxx" :errors="v$.cellphone.$errors" />
          </div>
          <div class="basis-1/2">
            <BaseInput id="password" v-model="user.password" label="Nova senha" type="password" placeholder="Senha de no mínimo 8 caracteres" :errors="v$.password.$errors" />
            <BaseInput id="confirmPassword" v-model="user.confirmPassword" label="Confirmar senha" type="password" placeholder="Confirmação da senha" :errors="v$.confirmPassword.$errors" />
          </div>
        </div>
        <div class="grid grid-cols-12">
          <div class="col-start-6 md:col-start-10 col-end-13">
            <FormButton btn-type="submit" icon="fa-regular fa-floppy-disk" description="Salvar Dados" />
          </div>
        </div>
      </form>
    </div>
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
      Apagar Conta
    </h1>
    <div class="p-5 bg-white shadow-md rounded mb-3">
      <h1 class="text-gray-800">
        Apaga todos os dados e histórico da conta.
      </h1>
      <div class="grid grid-cols-12">
        <div class="col-start-6 md:col-start-10 col-end-13">
          <FormButton
            icon="fa-regular fa-trash-can"
            description="Apagar"
            @click="deleteUser(user)"
          />
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import BaseInput from '../../components/BaseInput.vue';
import FormButton from '../../components/FormButton.vue';
import UserService from '../../services/UserService';

const router = useRouter();

const user = ref({
  user_id: null,
  name: null,
  email: null,
  cellphone: null,
  password: null,
  active: null,
  confirmPassword: null,
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
    sameAs: helpers.withMessage('As senhas não são iguais', sameAs(user.value.password)),
  },
}));

const v$ = useVuelidate(rules, user);

const submitForm = async () => {
  const validated = await v$.value.$validate();

  if (!validated) {
    return false;
  }

  const response = await UserService.updateUser(user.value);
  if (response) {
    Swal.fire({
      icon: 'success',
      title: 'Cadastro alterado com sucesso!',
      showConfirmButton: true,
      confirmButtonColor: '#374151',
    }).then(() => {
      router.push({ name: 'Home' });
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Erro ao editar usuário, tente mais tarde!',
      showConfirmButton: true,
      confirmButtonColor: '#374151',
    });
  }

  return true;
};

function deleteUser(User) {
  Swal.fire({
    title: 'Deseja apagar sua conta?',
    text: 'Não poderá reverter após confirmação!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#374151',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Voltar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      // eslint-disable-next-line no-param-reassign
      User.active = false;
      const response = await UserService.updateUser(User);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Usuário excluído com sucesso!',
          text: `Usuário ${User.name} excluído.`,
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        }).then(() => {
          router.push({ name: 'Home' });
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir produto, tente mais tarde!',
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        });
      }
    }
  });
  return true;
}

async function loadData() {
  const response = await UserService.getUserID(29);
  return response;
}

onMounted(async () => {
  user.value = await loadData();
});

</script>
