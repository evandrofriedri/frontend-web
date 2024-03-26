<template>
  <div class="grid gap-1 grid-cols-12 items-center mb-2">
    <div class="col-start-1 md:col-end-2 col-end-3">
      <BaseButton id="newPayment" icon="fa-solid fa-file-circle-plus" description="" title="Criar nova forma de pagto" @click="isModalPaymentOpen = true" />
    </div>
    <div class="col-start-5 md:col-start-9 col-end-7 md:col-end-10">
      <PrintButton id="exportData" :data="filteredList" filename="paymentList" />
    </div>
    <div class="col-start-7 md:col-start-10 col-end-13">
      <SearchInput id="paymentAdminSearch" v-model="search" placeholder="Digite a forma de pagto..." @keyup.stop="filter()" />
    </div>
  </div>
  <div v-show="foundPayment !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
    <table id="print-document" class="w-full text-sm text-left text-gray-800">
      <thead class="text-xs text-gray-900 uppercase bg-gray-200">
        <tr>
          <th scope="col" class="px-2 py-2">
            Forma de Pagto
          </th>
          <th scope="col" class="px-2 py-2">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in filteredList" :key="item" class="bg-white border-b hover:bg-gray-200 duration-300">
          <PaymentAdminItem :payment="item" />
        </tr>
      </tbody>
    </table>
  </div>
  <CardNotFound :found="foundPayment" label="Forma de Pagto não encontrado!" />
  <ModalWrapper :modal-open="isModalPaymentOpen" screen="FormPayment-0">
    <FormPayment label-form="Nova Forma de Pagto" label-btn="Cadastrar" :payment="newPayment" />
  </ModalWrapper>
</template>
<script setup>
import { ref, inject } from 'vue';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import PaymentAdminItem from '../../components/PaymentAdminItem.vue';
import BaseButton from '../../components/BaseButton.vue';
import FormPayment from '../../components/FormPayment.vue';
import ModalWrapper from '../../components/ModalWrapper.vue';
import PaymentService from '../../services/PaymentService';
import PrintButton from '../../components/PrintButton.vue';

const search = ref('');
const paymentList = ref([]);
const filteredList = ref([]);
const isModalPaymentOpen = ref(false);
const foundPayment = ref(0);
const newPayment = ref({
  payment_id: 0,
  name: null,
});

const emitter = inject('emitter');

emitter.on('setModalFalse-FormPayment-0', () => {
  newPayment.value = {
    payment_id: 0,
    name: null,
  };
  isModalPaymentOpen.value = false;
});

emitter.on('reloadPayment', async () => {
  search.value = '';
  await loadData();
});

const loadData = async () => {
  paymentList.value = await PaymentService.getPayments();
  thereIsPayment(paymentList.value);

  filteredList.value = JSON.parse(JSON.stringify(paymentList.value));
}

function thereIsPayment(obj) {
  foundPayment.value = Object.values(obj).length;
}

const filter = async () => {
  if (search.value.trim() !== '') {
    filteredList.value = await PaymentService.getPaymentName(search.value);
  } else {
    filteredList.value = JSON.parse(JSON.stringify(paymentList.value));
  }
  thereIsPayment(filteredList.value);
}

await loadData();
</script>
