<template>
  <div class="flex min-h-screen bg-white ">
    <div class="flex-1 hidden lg:block relative w-0 bg-gray-700">
      <div class="flex h-full justify-center items-center">
        <img src="../../assets/undraw_authentication_re_svpt.svg" alt="">
      </div>
    </div>
    <div class="flex flex-1 flex-col justify-center py-10 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px24">
      <div class="mx-auto w-full max-w-sm lg:w-80">
        <div>
          <img src="../../assets/undraw_authentication_re_svpt.svg" alt="" class="lg:hidden h-20 w-auto">
          <h2 class="mt-6 text-3xl font-semibold text-blue-700">
            Entrar
          </h2>
          <p class="mt-2 text-sm text-gray-700 max-w">
            Primeiro acesso?
          </p>
          <router-link class="font-medium text-blue-700" to="/create-account">
            Cadastre-se
          </router-link>
        </div>
        <div>
          <form action="">
            <div class="mb-4">
              <label><input class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white borde border-gray-200 rounded focus:outline-none" type="text" placeholder="login" /></label>
            </div>
            <div class="mb-4">
              <label><input class="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white borde border-gray-200 rounded focus:outline-none" type="password" placeholder="senha"></label>
            </div>
            <div class="mb-4">
              <button class="inline-block w-full py-4 px-8 leading-none text-white bg-blue-700 hover:bg-blue-900 font-semibold rounded shadow" type="submit">
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
