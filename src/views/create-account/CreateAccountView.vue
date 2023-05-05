<template>
  <div class="flex min-h-screen bg-white ">
    <div class="flex-1 hidden lg:block relative w-0 bg-gray-700">
      <div class="flex h-full justify-center items-center">
        <img src="../../assets/undraw_sign_up_n6im.svg" alt="">
      </div>
    </div>
    <div class="flex flex-1 flex-col justify-center py-10 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px24">
      <div class="mx-auto w-full max-w-sm lg:w-80">
        <div class="p-5 bg-white shadow-2xl rounded-xl">
          <img src="../../assets/undraw_sign_up_n6im.svg" alt="" class="lg:hidden h-20 w-auto">
          <h2 class="mt-6 text-3xl text-center font-semibold text-gray-700">
            Criar seu cadastro
          </h2>
          <form action="">
            <div class="mb-4">
              <p class="mt-2 text-sm text-gray-700 max-w">
                * Nome Completo
              </p>
              <label><input class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white borde border-gray-200 rounded-md focus:outline-none" type="text" placeholder="Insira seu Nome" /></label>
            </div>
            <div class="mb-4">
              <p class="mt-2 text-sm text-gray-700 max-w">
                * E-mail
              </p>
              <label><input class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white borde border-gray-200 rounded-md focus:outline-none" type="text" placeholder="Insira seu E-mail" /></label>
            </div>
            <div class="mb-4">
              <p class="mt-2 text-sm text-gray-700 max-w">
                * Senha
              </p>
              <label><input class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white borde border-gray-200 rounded-md focus:outline-none" type="password" placeholder="Insira sua Senha"></label>
            </div>
            <div class="mb-4">
              <p class="mt-2 text-sm text-gray-700 max-w">
                * Repita a Senha
              </p>
              <label><input class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white borde border-gray-200 rounded-md focus:outline-none" type="password" placeholder="Insira sua Senha novamente"></label>
            </div>
            <div class="mb-4">
              <button class="inline-block w-full py-4 px-8 leading-none text-white bg-blue-700 hover:bg-blue-900 font-semibold rounded-md" type="submit">
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: { },
  data() {
    return {};
  },
};
</script>
