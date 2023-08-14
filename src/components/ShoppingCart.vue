<template>
  <div v-if="market.length > 0" class="fixed z-10 inset-x-0 bottom-2 right-2 left-2">
    <div id="cart" :class="{ shake: animationBtn }">
      <button
        type="button"
        class="inline-block w-full p-3 leading-none text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-900 font-semibold rounded"
        @click="isModalCartOpen = true"
      >
        <font-awesome-icon icon="fa-solid fa-cart-shopping" />
        Carrinho
        <div class="absolute top-0 right-0 -mt-2 -mr-2 px-2 py-1 bg-red-500 rounded-full">
          {{ market.length }}
        </div>
      </button>
    </div>
  </div>
  <Teleport to="#modal">
    <Transition name="modal">
      <div v-if="isModalCartOpen" class="flex fixed top-0 left-0 z-10 w-screen h-screen bg-black/50 justify-center items-center">
        <div ref="modal" class="relative bg-white rounded shadow-lg">
          <button type="button" class="absolute top-0 right-0 -mt-5 -mr-5 bg-none" @click="isModalCartOpen = false">
            <font-awesome-icon icon="fa-solid fa-xmark" size="xl" />
          </button>
          <div class="p-4 mx-auto w-screen h-screen sm:h-auto md:w-[768px] lg:w-[1024px] bg-white shadow rounded">
            <h1 class="text-lg text-gray-800 font-semibold text-justify">
              Itens Adicionados
            </h1>
            <div class="flex flex-col h-72 md:h-[600px] overflow-auto">
              <div v-for="(item, index) in market" :key="index" class="text-base text-gray-800 border p-2 mt-1">
                <div class="flex justify-between text-justify">
                  <p class="font-medium">
                    {{ item.qtde }}x {{ item.name }}&nbsp;&nbsp;
                    <button type="button">
                      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
                    </button> &nbsp;
                    <button type="button" @click="deleteItemCart(index)">
                      <font-awesome-icon icon="fa-regular fa-trash-can" />
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
              <div class="flex justify-between text-lg text-gray-800 font-semibold pt-2">
                <p>Subtotal</p> <p>{{ subTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
              </div>
            </div>
            <div class="flex justify-between text-lg text-gray-800 font-semibold text-right pt-2">
              <p>Entrega</p><p> {{ delivery.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
            </div>
            <h1 class="text-lg text-gray-800 font-medium text-justify">
              Para entrega ou Buscar no local:
            </h1>
            <h1 class="text-lg text-gray-800 font-medium text-justify">
              Forma de Pagamento:
            </h1>
            <div class="flex text-justify items-center">
              <div class="w-2/5">
                teste
              </div>
              <div v-if="market.length > 0" class="w-3/5">
                <button
                  id="btnConfirmOrder"
                  type="button"
                  class="inline-block w-full p-3 leading-none text-white bg-gray-700 disabled:bg-slate-300 hover:bg-gray-800 active:bg-gray-900 font-semibold rounded"

                  @click="confirmOrder();cleanCart();isModalCartOpen = false"
                >
                  <font-awesome-icon icon="fa-solid fa-check" size="lg" />
                  Confirmar Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, inject } from 'vue';
import { onClickOutside } from '@vueuse/core';

const market = ref([]);
const subTotal = ref(0);
const delivery = ref(0);
const isModalCartOpen = ref(false);
const modal = ref(null);
const animationBtn = ref(false);
const emitter = inject('emitter');

onClickOutside(modal, () => {
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

emitter.on('update', () => {
  updateCart();
});

</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

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
