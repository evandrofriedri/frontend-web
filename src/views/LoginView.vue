<template>
  <div class="flex min-h-screen bg-white ">
    <div class="flex-1 hidden lg:block relative w-0 px-20">
      <div class="flex h-full justify-center items-center">
        <img src="../assets/undraw_fingerprint_login_re_t71l.svg" alt="">
      </div>
    </div>
    <div class="flex flex-1 flex-col justify-center py-10 px-4 sm:px-6 lg:px-20">
      <div class="mx-auto w-full max-w-sm">
        <div class="p-5 bg-white sm:shadow-2xl sm:rounded-xl">
          <img src="../assets/undraw_fingerprint_login_re_t71l.svg" alt="" class="lg:hidden h-20 w-auto">
          <h2 class="mt-6 lg:mt-0 text-3xl font-semibold text-gray-700">
            Entrar
          </h2>
          <p class="mt-2 text-sm text-gray-700 max-w">
            Primeiro acesso?
          </p>
          <router-link class="font-medium text-blue-700" to="/create-account">
            Cadastre-se
          </router-link>
          <form action="">
            <div class="mb-4">
              <label><input class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white borde border-gray-200 rounded-md focus:outline-none" type="text" placeholder="E-mail" /></label>
            </div>
            <div class="mb-4">
              <label><input class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white borde border-gray-200 rounded-md focus:outline-none" type="password" placeholder="Senha"></label>
            </div>
            <div class="mb-4">
              <button class="inline-block w-full py-4 px-8 leading-none text-white bg-blue-700 hover:bg-blue-900 font-semibold rounded-md" type="submit">
                Entrar
              </button>
            </div>
            <div class="mb-4">
              <p><a href="" class="text-blue-700">Esqueceu a senha?</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
