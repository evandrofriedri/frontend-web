<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
  <div>
  <h1 class="mb-4 text-3xl font-bold text-blue-200 ">
    Tailwind CSS 3 with vue js 3
  </h1>
  <button class="px-6 py-2 text-sm text-green-100 bg-indigo-600 rounded">Next</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
