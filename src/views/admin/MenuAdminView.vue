<template>
  <LogoContainer />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <TabWrapper>
      <PageTab title="Produtos">
        <Suspense>
          <ProductAdminPage />
          <template #fallback>
            <CardLoading typeBox="hidden" />
          </template>
        </Suspense>
      </PageTab>
      <PageTab title="Categorias">
        <Suspense>
          <CategoryAdminPage />
          <template #fallback>
            <CardLoading typeBox="hidden" />
          </template>
        </Suspense>
      </PageTab>
      <PageTab title="Adicionais">
        <Suspense>
          <AdditionalAdminPage />
          <template #fallback>
            <CardLoading typeBox="hidden" />
          </template>
        </Suspense>
      </PageTab>
      <PageTab title="Status do Pedido">
        <Suspense>
          <StatusAdminPage />
          <template #fallback>
            <CardLoading typeBox="hidden" />
          </template>
        </Suspense>
      </PageTab>
      <PageTab title="Forma de Pagamento">
        <Suspense>
          <PaymentAdminPage />
          <template #fallback>
            <CardLoading typeBox="hidden" />
          </template>
        </Suspense>
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
import PaymentAdminPage from './PaymentAdminPage.vue';
import CardLoading from '../../components/CardLoading.vue';
import LogoContainer from '../../components/LogoContainer.vue';
</script>
