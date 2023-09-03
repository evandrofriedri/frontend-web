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
  <Teleport to="#modal">
    <Transition name="modal">
      <div v-if="isModalCartOpen" class="flex fixed top-0 left-0 z-10 w-screen h-screen bg-black/50 justify-center items-center">
        <div ref="modal" class="relative bg-white rounded-xl shadow-2xl">
          <CloseButton @click="isModalCartOpen = false" />
          <div class="p-4 mx-auto w-screen h-screen sm:h-auto md:w-[768px] lg:w-[1024px] bg-white shadow-2xl rounded-xl">
            <div class="flex">
              <button class="sm:hidden pr-3" type="button" @click="isModalCartOpen = false">
                <font-awesome-icon icon="fa-solid fa-chevron-left" size="lg" />
              </button>
              <h1 class="text-lg text-gray-800 font-semibold text-justify">
                Itens Adicionados
              </h1>
            </div>
            <div class="flex flex-col max-h-72 md:max-h-[600px] overflow-auto border rounded-xl p-2">
              <div v-for="(item, index) in market" :key="index" class="text-base text-gray-800 border rounded-xl p-2 mt-1">
                <div class="flex justify-between text-justify">
                  <p class="font-medium">
                    {{ item.qtde }}x {{ item.name }}&nbsp;&nbsp;
                    <button type="button" @click="deleteItemCart(index)">
                      <font-awesome-icon icon="fa-regular fa-trash-can" />
                    </button> &nbsp;
                    <button type="button">
                      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
                    </button>
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
                <p v-if="item.observation !== ''" class="text-base pl-4">
                  Observações: {{ item.observation }}
                </p>
                <div class="flex justify-between text-base font-medium text-right">
                  <p>Total Item</p> <p>{{ item.totalItemCart.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
                </div>
              </div>
              <div v-if="market.length == 0" class="flex justify-center items-center italic text-xl text-gray-800 p-4">
                <font-awesome-icon icon="fa-solid fa-store" size="2xl" />
                <h1>Nenhum item no carrinho, retorne ao cardápio para adicionar seu produto!</h1>
              </div>
            </div>
            <div v-if="market.length > 0" class="flex justify-between text-lg text-gray-800 font-semibold pb-4">
              <p>Subtotal</p> <p>{{ subTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
            </div>
            <div v-if="market.length > 0" class="flex justify-between items-center p-2 border rounded-xl">
              <div class="flex flex-col items-baseline">
                <div class="flex items-center">
                  <input id="delivery-radio-1" :checked="forDelivery" type="radio" value="" name="delivery-radio" class="w-4 h-4 text-gray-800 focus:ring-gray-600 focus:ring-2" @change="updateDelivery('deliver')">
                  <label for="delivery-radio-1" :checked="!forDelivery" class="w-full ml-2 text-base font-medium text-gray-900">Para entregar</label>
                </div>
                <div class="flex items-center">
                  <input id="delivery-radio-2" type="radio" value="" name="delivery-radio" class="w-4 h-4 text-gray-800 border-gray-300 focus:ring-gray-600 focus:ring-2" @change="updateDelivery('local')">
                  <label for="delivery-radio-2" class="w-full ml-2 text-base font-medium text-gray-900">Buscar na loja</label>
                </div>
              </div>
              <LayoutItem icon="fa-solid fa-map-location-dot" :label="address.label" :description="address.description" />
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
              <div v-if="market.length > 0" class="col-start-6 md:col-start-10 col-end-13">
                <FormButton
                  icon="fa-solid fa-check"
                  description="Confirmar Pedido"
                  @click="confirmOrder();cleanCart();isModalCartOpen = false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import {
  ref,
  inject,
  reactive,
  onMounted,
} from 'vue';
import { onClickOutside } from '@vueuse/core';
import LayoutItem from './LayoutItem.vue';
import FormButton from './FormButton.vue';
import CloseButton from './CloseButton.vue';

const market = ref([]);
const subTotal = ref(0);
const total = ref(0);
const delivery = ref(0);
const forDelivery = ref(true);
const address = reactive({
  label: '',
  description: '',
});
const isModalCartOpen = ref(false);
const modal = ref(null);
const animationBtn = ref(false);
const emitter = inject('emitter');

onClickOutside(modal, () => {
  isModalCartOpen.value = false;
});

function loadData() {
  address.label = 'Rua Dona Lucia, 145';
  address.description = 'Jardim Porto Alegre';
  delivery.value = 14.9;
}

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
  console.log('carrinho limpo');
}

function updateDelivery(option) {
  if (option === 'deliver') {
    address.label = 'Rua Dona Lucia, 145';
    address.description = 'Jardim Porto Alegre';
    delivery.value = 14.90;
    forDelivery.value = true;
  } else {
    address.label = 'Rua Santo Dumont, 1234';
    address.description = 'Centro';
    delivery.value = 0;
    forDelivery.value = false;
  }
  updateCart();
}

onMounted(() => {
  loadData();
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
