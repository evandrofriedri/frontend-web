<template>
  <LogoContainer />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
      Estatísticas
    </h1>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
      <Suspense>
        <CardStats />
      <template #fallback>
        <CardLoading />
      </template>
      </Suspense>
    </div>
    <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
      <Suspense>
        <ChartOne />
      <template #fallback>
        <CardLoading />
      </template>
      </Suspense>

      <Suspense>
        <ChartTwo />
      <template #fallback>
        <CardLoading />
      </template>
      </Suspense>

      <Suspense>
        <ChartThree />
      <template #fallback>
        <CardLoading />
      </template>
      </Suspense>
    </div>

  </div>
</template>
<script setup>
import CardLoading from '../../components/CardLoading.vue';
import LogoContainer from '../../components/LogoContainer.vue';
import CardStats from '../../components/CardStats.vue';
import ChartOne from '../../components/ChartOne.vue';
import ChartTwo from '../../components/ChartTwo.vue';
import ChartThree from '../../components/ChartThree.vue';

</script>
