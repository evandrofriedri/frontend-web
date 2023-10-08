<template>
  <div v-if="market.length > 0" class="fixed z-10 inset-x-0 bottom-2 right-2 left-2">
    <div id="cart" :class="{ shake: animationBtn }">
      <FormButton
        icon="fa-solid fa-cart-shopping"
        description="Carrinho"
        @click="isModalCartOpen = true"
      />
      <div class="absolute leading-none text-white font-semibold top-0 right-0 -mt-2 -mr-2 px-2 py-1 bg-red-500 rounded-full">
        {{ market.length }}
      </div>
    </div>
  </div>
  <ModalWrapper :modal-open="isModalCartOpen">
    <div class="flex mb-2">
      <ReturnButton @click="isModalCartOpen = false" />
      <h1 class="text-lg text-gray-800 font-semibold text-justify">
        Itens Adicionados
      </h1>
    </div>
    <div class="flex flex-col max-h-72 md:max-h-[400px] overflow-auto border rounded p-2">
      <div v-for="(item, index) in market" :key="index" class="text-base text-gray-800 border rounded p-2 mt-1">
        <div class="flex justify-between text-justify">
          <p class="font-medium">
            {{ item.qtde }}x {{ item.name }}&nbsp;&nbsp;
            <button type="button" @click="deleteItemCart(index)">
              <font-awesome-icon icon="fa-regular fa-trash-can" />
            </button> &nbsp;
            <!-- <button type="button">
              <font-awesome-icon icon="fa-regular fa-pen-to-square" />
            </button> -->
          </p>
          <p class="font-medium">
            {{ item.totalProduct.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
          </p>
        </div>
        <p v-if="item.additionals.length !== 0" class="text-base pl-5">
          Adicionais:
        </p>
        <div v-for="(add, idx) in item.additionals" :key="idx">
          <div class="flex justify-between text-base text-justify pl-5">
            <p class="font-light">
              {{ add.multCount }}x {{ add.name }}
            </p>
            <p class="font-medium">
              {{ add.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
            </p>
          </div>
        </div>
        <p v-if="item.observation !== ''" class="text-base pl-5">
          Observações: {{ item.observation }}
        </p>
        <div class="flex justify-between text-base font-medium text-right">
          <p>Total Item</p> <p>{{ item.totalItemCart.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
        </div>
      </div>
      <CardNotFound :found="market.length" label="Nenhum item no carrinho, retorne ao cardápio para adicionar seu produto!" />
    </div>
    <div v-if="market.length > 0" class="flex justify-between text-lg text-gray-800 font-semibold pb-4">
      <p>Subtotal</p> <p>{{ subTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
    </div>
    <div v-if="market.length > 0" class="flex justify-between items-center p-2 border rounded">
      <div class="flex flex-col items-baseline text-gray-800">
        <div class="flex items-center">
          <input id="delivery-radio-1" :checked="forDelivery" type="radio" value="" name="delivery-radio" class="w-4 h-4 focus:ring-gray-600 focus:ring-2" @change="updateDelivery('deliver')">
          <label for="delivery-radio-1" :checked="!forDelivery" class="w-full ml-2 text-base font-medium">Para entregar</label>
        </div>
        <div class="flex items-center">
          <input id="delivery-radio-2" type="radio" value="" name="delivery-radio" class="w-4 h-4 border-gray-300 focus:ring-gray-600 focus:ring-2" @change="updateDelivery('local')">
          <label for="delivery-radio-2" class="w-full ml-2 text-base font-medium">Retirar na loja</label>
        </div>
      </div>
      <AddressLayout icon="fa-solid fa-map-location-dot" :item="deliveryAddress" />
    </div>
    <div v-if="market.length > 0" class="flex justify-between text-lg text-gray-800 font-semibold text-right pb-4">
      <p>Entrega</p><p> {{ delivery.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
    </div>
    <div v-if="market.length > 0" class="flex justify-between items-center text-gray-800 pb-4">
      <p class="text-lg font-semibold">
        Forma de Pagamento
      </p>
      <p class="italic">
        Na entrega do pedido
      </p>
    </div>
    <div v-if="market.length > 0" class="flex justify-between text-lg text-gray-800 font-semibold pb-4">
      <p>Total</p> <p>{{ total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
    </div>
    <div class="grid grid-cols-12 text-justify items-center">
      <div v-if="market.length > 0" class="col-start-6 md:col-start-8 col-end-13">
        <FormButton
          icon="fa-solid fa-check"
          description="Confirmar Pedido"
          @click="confirmOrder();cleanCart();isModalCartOpen = false"
        />
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup>
import {
  ref,
  inject,
  onMounted,
} from 'vue';
import AddressLayout from './AddressLayout.vue';
import FormButton from './FormButton.vue';
import ReturnButton from './ReturnButton.vue';
import CardNotFound from './CardNotFound.vue';
import ModalWrapper from './ModalWrapper.vue';
import AddressService from '../services/AddressService';
import ConfigurationService from '../services/ConfigurationService';

const market = ref([]);
const subTotal = ref(0);
const total = ref(0);
const delivery = ref(0);
const deliveryAddress = ref({
  label: null,
  description: null,
});
const forDelivery = ref(true);
const systemParams = ref({
  storeAddress: null,
  deliveryValue: null,
});
const accountAddress = ref({});
const isModalCartOpen = ref(false);
const animationBtn = ref(false);
const emitter = inject('emitter');

emitter.on('setModalFalse', () => {
  isModalCartOpen.value = false;
});

function warnDisabled() {
  animationBtn.value = true;
  setTimeout(() => {
    animationBtn.value = false;
  }, 1500);
}

function updateCart() {
  const items = JSON.parse(localStorage.getItem('itemsCart'));
  if (items === null) {
    market.value = {};
  } else {
    market.value = items;
  }

  if (items !== null) {
    subTotal.value = items.map((i) => i.totalItemCart).reduce((prev, curr) => prev + curr, 0);
  }

  total.value = (subTotal.value + delivery.value);
  warnDisabled();
}

async function loadData() {
  systemParams.value.storeAddress = await ConfigurationService.getConfigurationID('storeAddress');
  systemParams.value.deliveryValue = await ConfigurationService.getConfigurationID('deliveryValue');

  const response = await AddressService.getAddressID(1); // conta logada ou passar -1
  if (response.length === 0) {
    accountAddress.value = response;
  }

  const filterResponse = response.filter((element) => element.favorite === true);
  if (filterResponse.length === 0) {
    // eslint-disable-next-line prefer-destructuring
    accountAddress.value = response[0];
  } else {
    // eslint-disable-next-line prefer-destructuring
    accountAddress.value = filterResponse[0];
  }

  deliveryAddress.value = accountAddress.value;
  delivery.value = systemParams.value.deliveryValue;
  updateCart();

  return accountAddress;
}

function deleteItemCart(index) {
  const itemsCart = JSON.parse(localStorage.getItem('itemsCart'));
  itemsCart.splice(index, 1);
  localStorage.setItem('itemsCart', JSON.stringify(itemsCart));
  updateCart();
}

function confirmOrder() {
  console.log('pedido confirmado');
}

function cleanCart() {
  const itemsCart = JSON.parse(localStorage.getItem('itemsCart'));

  while (itemsCart.length > 0) {
    itemsCart.splice(0, 1);
  }
  localStorage.setItem('itemsCart', JSON.stringify(itemsCart));
  updateCart();
}

function updateDelivery(option) {
  if (option === 'deliver') {
    deliveryAddress.value = accountAddress.value;
    delivery.value = systemParams.value.deliveryValue;
    forDelivery.value = true;
  } else {
    deliveryAddress.value = systemParams.value.storeAddress;
    delivery.value = 0;
    forDelivery.value = false;
  }
  updateCart();
}

onMounted(async () => {
  await loadData();
});

emitter.on('update', () => {
  updateCart();
});

</script>

<style scoped>

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
