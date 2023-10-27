<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-800">
      Acompanhar Pedidos
    </h1>
    <div class="grid grid-cols-12 items-center mb-2">
      <div class="col-start-6 md:col-start-10 col-end-13">
        <SearchInput id="OrdersSearch" v-model="search" placeholder="Digite o número do pedido" />
      </div>
    </div>
    <div v-show="foundOrders !== 0" class="p-5 bg-white shadow-md rounded mb-3 overflow-x-auto">
      <div v-for="(item, index) in filteredList(orderList)" :key="index" class="p-5 bg-white shadow-md rounded mb-3">
        <h1 class="mb-3 text-base font-semibold text-gray-800">
          Pedido #{{ item.order_id }}, feito no dia {{ item.date }}
        </h1>
        <div class="flex items-center">
          <span class="mr-2 text-base text-gray-800 font-semibold text-justify">Status</span>
          <div class="flex-grow border-t border-gray-200" />
        </div>
        <div class="container mb-2">
          <ol class="grid grid-cols-1 sm:grid-cols-4 divide-x divide-gray-300 overflow-hidden rounded-lg border text-sm text-gray-500">
            <div v-for="(data, idx) in item.statuses" :key="idx">
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
        <div class="flex items-center">
          <span class="mr-2 text-base text-gray-800 font-semibold text-justify">Itens</span>
          <div class="flex-grow border-t border-gray-200" />
        </div>
        <div class="flex flex-col max-h-72 md:max-h-[400px] overflow-auto border rounded p-2">
          <div v-for="(pdt, indx) in item.products" :key="indx" class="text-sm text-gray-800 border rounded p-2 mt-1">
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
          <p>Subtotal</p> <p>{{ parseFloat(item.total_value - item.delivery).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
        </div>
        <div class="flex justify-between text-base text-gray-800 font-semibold text-right pb-2">
          <p>Entrega</p><p> {{ parseFloat(item.delivery).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
        </div>
        <div class="flex justify-between text-base text-gray-800 font-semibold">
          <p>Total</p> <p>{{ parseFloat(item.total_value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
        </div>
      </div>
    </div>
    <CardNotFound :found="foundOrders" label="Nenhum pedido encontrado!" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import OrderService from '../../services/OrderService';
import CardNotFound from '../../components/CardNotFound.vue';
import SearchInput from '../../components/SearchInput.vue';

const search = ref('');
const orderList = ref([]);
const foundOrders = ref(1);

async function loadData() {
  orderList.value = await OrderService.getOrderID(1); // usuario logado
  console.log(orderList.value);

  orderList.value.forEach(async (order) => {
    // eslint-disable-next-line no-param-reassign
    order.statuses = [];
    const statusResponse = await OrderService.getOrderStatuses(order.order_id);
    statusResponse.map((element) => order.statuses.push(element));

    // eslint-disable-next-line no-param-reassign
    order.products = [];
    const orderProductResponse = await OrderService.getOrderProducts(order.order_id);
    orderProductResponse.map((element) => order.products.push(element));

    order.products.forEach(async (product) => {
      // eslint-disable-next-line no-param-reassign
      product.additionals = [];
      // eslint-disable-next-line vue/max-len
      const orderProductAdditional = await OrderService.getOrderProductAdditionals(product.order_product_id);
      orderProductAdditional.map((element) => product.additionals.push(element));
    });
  });

  console.log(orderList.value);
  return orderList.value;
}

function thereIsOrders(obj) {
  foundOrders.value = Object.values(obj).length;
}

function filteredList(data) {
  // eslint-disable-next-line vue/max-len
  const filtData = data.filter((d) => d.order_id.toString().toLowerCase().includes(search.value.toLowerCase()));
  thereIsOrders(filtData);
  return filtData;
}

onMounted(async () => {
  orderList.value = await loadData();
  orderList.value = await filteredList(orderList.value);
});
</script>
