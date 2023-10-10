<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <TabWrapper>
      <PageTab title="Produtos">
        <ProductAdminPage />
      </PageTab>
      <PageTab title="Categorias">
        <CategoryAdminPage />
      </PageTab>
      <PageTab title="Adicionais">
        <AdditionalAdminPage />
      </PageTab>
      <PageTab title="Status do Pedido">
        <StatusAdminPage />
      </PageTab>
    </TabWrapper>
  </div>
</template>
<script setup>
import TabWrapper from '../../components/TabWrapper.vue';
import PageTab from '../../components/PageTab.vue';
import ProductAdminPage from './ProductAdminPage.vue';
import CategoryAdminPage from './CategoryAdminPage.vue';
import AdditionalAdminPage from './AdditionalAdminPage.vue';
import StatusAdminPage from './StatusAdminPage.vue';
</script>
