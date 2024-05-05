<template>
  <form action="" @submit.prevent="submitForm">
    <div class="flex flex-col">
      <div v-if="showLabel" class="flex mb-2">
        <ReturnButton @click="closeModal()" />
        <h1 class="text-lg text-gray-800 font-medium text-justify">
          {{ labelForm }}
        </h1>
      </div>
      <div class="max-h-[560px] overflow-auto">
        <div :id="`print-document-detail-${props.order.order_id}`" class="bg-white rounded mb-3">
          <div class="flex justify-between">
            <h1 class="mb-3 text-base font-semibold text-gray-800">
              Pedido #{{ order.order_id }}, feito no dia {{ order.date }}
            </h1>
            <button type="button" title="Exportar Dados" @click="exportData()">
              <font-awesome-icon icon="fa-solid fa-print" size="xl" />
            </button>
          </div>
          <div class="flex items-center">
            <span class="mr-2 text-base text-gray-800 font-semibold text-justify">Status</span>
            <div class="flex-grow border-t border-gray-200" />
          </div>
          <div v-if="order.active == 1" class="container mb-2">
            <ol class="grid grid-cols-1 sm:grid-cols-4 divide-x divide-gray-300 overflow-hidden rounded-lg border text-sm text-gray-500">
              <div v-for="(data, idx) in order.statuses" :key="idx">
                <li :class="`relative flex items-center justify-center h-full gap-2 p-4 ${data.date == null ? 'text-gray-300' : 'text-gray-800'} `">
                  <span class="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-300 border-b-0 border-s-0 bg-white sm:block" />
                  <font-awesome-icon
                    :class="`h-6 w-6 shrink-0 ${data.date == null ? 'text-gray-300' : 'text-green-600'} `"
                    :icon="`fa-regular ${data.date == null ? 'fa-hourglass-half' : 'fa-circle-check'}`"
                  />
                  <p class="leading-none w-1/3 sm:w-auto">
                    <strong class="block font-medium"> {{ data.name }} </strong>
                    <small class="mt-1"> {{ data.date }} </small>
                  </p>
                </li>
              </div>
            </ol>
          </div>
          <div v-else>
            <ol class="grid grid-cols-1 divide-x divide-gray-300 overflow-hidden rounded-lg border text-sm text-gray-500">
              <li class="relative flex items-center justify-center h-full gap-2 p-4 text-gray-800">
                <span class="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-300 border-b-0 border-s-0 bg-white sm:block" />
                <font-awesome-icon
                  class="h-6 w-6 shrink-0 text-red-600"
                  icon="fa-solid fa-ban"
                />
                <p class="leading-none w-1/3 sm:w-auto">
                  <strong class="block font-medium"> Pedido Cancelado </strong>
                </p>
              </li>
            </ol>
          </div>
          <div class="flex items-center">
            <span class="mr-2 text-base text-gray-800 font-semibold text-justify">Itens</span>
            <div class="flex-grow border-t border-gray-200" />
          </div>
          <div class="flex flex-col max-h-72 md:max-h-[400px] overflow-auto border rounded p-2">
            <div v-for="(pdt, indx) in order.products" :key="indx" class="text-sm text-gray-800 border rounded p-2 mt-1">
              <div class="flex justify-between text-justify">
                <p class="font-medium">
                  {{ pdt.qtde }}x {{ pdt.name }}&nbsp;&nbsp;
                </p>
                <p class="font-medium">
                  {{ (pdt.qtde * pdt.unit_value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                </p>
              </div>
              <p v-if="pdt.additionals.length !== 0" class="text-sm pl-5">
                Adicionais:
              </p>
              <div v-for="(add, idx) in pdt.additionals" :key="idx">
                <div class="flex justify-between text-sm text-justify pl-5">
                  <p class="font-light">
                    {{ pdt.qtde * add.qtde }}x {{ add.name }}
                  </p>
                  <p class="font-medium">
                    {{ (pdt.qtde * add.qtde * add.unit_value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                  </p>
                </div>
              </div>
              <p v-if="pdt.observation !== ''" class="text-sm pl-5">
                Observações: {{ pdt.observation }}
              </p>
            </div>
          </div>
          <div class="py-3 items-center">
            <div class="flex-grow border-t border-gray-200" />
          </div>
          <div class="flex justify-between text-base text-gray-800 font-semibold pb-2">
            <p>Subtotal</p> <p>{{ parseFloat(order.total_value - order.delivery).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
          </div>
          <div class="flex justify-between text-base text-gray-800 font-semibold text-right pb-2">
            <p>Entrega</p><p> {{ parseFloat(order.delivery).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
          </div>
          <div class="flex justify-between text-base text-gray-800 font-semibold text-right pb-2">
            <p>Forma de Pagamento</p><p> {{ order.payment }}</p>
          </div>
          <div class="flex justify-between text-base text-gray-800 font-semibold">
            <p>Total</p> <p>{{ parseFloat(order.total_value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup>
import {
  ref,
  onMounted,
  inject,
} from 'vue';
import ReturnButton from './ReturnButton.vue';
import html2pdf from 'html2pdf.js';

const emitter = inject('emitter');

const order = ref({
  id: null,
  observation: null,
});

const props = defineProps({
  order: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
  labelForm: {
    type: String,
    default: '',
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
});

function closeModal() {
  emitter.emit(`closeModal-OrderDetail-${props.order.order_id}`);
}

function exportData(){
  var element = document.getElementById(`print-document-detail-${props.order.order_id}`);
  let opt = {
    margin:       1,
    filename:     `order_${props.order.order_id}`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}

onMounted(async () => {
  order.value = await props.order;
});

</script>
