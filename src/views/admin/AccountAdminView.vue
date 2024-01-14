<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <TabWrapper>
      <PageTab title="Contas">
        <Suspense>
          <AccountAdminPage />
          <template #fallback>
            <CardLoading />
          </template>
        </Suspense>
      </PageTab>
      <PageTab title="Funções">
        <Suspense>
          <RoleAdminPage />
          <template #fallback>
            <CardLoading />
          </template>
        </Suspense>
      </PageTab>
    </TabWrapper>
  </div>
</template>
<script setup>
import TabWrapper from '../../components/TabWrapper.vue';
import PageTab from '../../components/PageTab.vue';
import AccountAdminPage from './AccountAdminPage.vue';
import RoleAdminPage from './RoleAdminPage.vue';
import CardLoading from '../../components/CardLoading.vue';
</script>
