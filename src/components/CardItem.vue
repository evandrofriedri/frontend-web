<template>
  <div class="p-3 flex rounded bg-white shadow-md hover:shadow-2xl hover:cursor-pointer hover:bg-gray-50 duration-300" @click="isModalOpen = true" @keydown="isModalOpen = true">
    <div class="flex flex-col pr-5">
      <p class="mb-2 text-lg font-medium text-gray-900">
        {{ props.product.name }}
      </p>
      <p class="mb-2 text-sm text-gray-600">
        {{ props.product.description }}
      </p>
      <p class="text-base font-semibold text-gray-900">
        {{ props.product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
      </p>
    </div>
    <div class="min-w-fit rounded">
      <img :src="props.product.image" class="object-cover h-24 w-24 rounded" alt="" />
    </div>
  </div>
  <Teleport to="#modal">
    <Transition name="modal">
      <div v-if="isModalOpen" class="flex fixed top-0 left-0 z-10 w-screen h-screen bg-black/50 justify-center items-center">
        <div ref="modal" class="relative bg-white rounded shadow-lg">
          <button type="button" class="absolute top-3 right-3 bg-none cursor-pointer" @click="isModalOpen = false">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
          <div class="mx-auto w-full max-w-xs md:max-w-md lg:max-w-lg bg-white shadow rounded">
            <div class="bg-gray-50 justify-between bg-cover bg-center rounded">
              <img :src="props.product.image" class="object-cover h-48 w-full" alt="" />
            </div>
            <div class="p-4 flex flex-col">
              <h1 class="text-lg text-gray-800 font-medium text-justify mt-2">
                {{ props.product.name }}
              </h1>
              <p class="text-sm font-light text-gray-800 text-justify mt-2">
                {{ props.product.description }}
              </p>
              <p class="text-base text-gray-800 font-semibold text-right mt-2">
                {{ props.product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
              </p>
              <div v-if="props.product.additional" class="w-full mt-4">
                <div class="text-base text-gray-800">
                  Adicionais
                </div>
                <div v-for="(item, index) in props.product.additionals" :key="index">
                  <div class="flex justify-between pt-2 text-gray-800">
                    <AddItem
                      :additional="item"
                      @decrement-count="decrementAdditional"
                      @increment-count="incrementAdditional"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="p-4">
              <label>
                <div class="text-base text-gray-800">Observações</div>
                <textarea
                  class="w-full"
                  rows="2"
                  placeholder="Ex: Retirar cebola, retirar molho..."
                  maxlength="80"
                /></label>
            </div>
            <div class="p-4 flex text-justify items-center">
              <div class="w-2/5">
                <ToggleCount @toggle-qtde-product="toggleQtdeProduct" />
              </div>
              <div class="w-3/5">
                <button type="button" class="inline-block w-full p-3 leading-none text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-900 font-semibold rounded" @click="addCart();isModalOpen = false">
                  <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                  Adicionar
                  {{ totalProduct.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
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
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import ToggleCount from './ToggleCount.vue';
import AddItem from './AddItem.vue';

const props = defineProps({
  product: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

const isModalOpen = ref(false);
const modal = ref(null);

const qtdeProduct = ref(1);
const totalAdditional = ref(0);
const totalProduct = ref(qtdeProduct.value * props.product.price);

const itemCart = {
  id: props.product.id,
  qtde: qtdeProduct.value,
  name: props.product.name,
  additionals: [],
  total: totalProduct.value,
};

onClickOutside(modal, () => {
  isModalOpen.value = false;
});

function refreshTotal() {
  // eslint-disable-next-line
  totalAdditional.value = itemCart.additionals.map((item) => item.total).reduce((prev, curr) => prev + curr, 0);

  totalProduct.value = (qtdeProduct.value * (totalAdditional.value + props.product.price));
  itemCart.qtde = qtdeProduct.value;
  itemCart.total = totalProduct.value;
}

function toggleQtdeProduct(data) {
  qtdeProduct.value = data.qtde;

  refreshTotal();
}

function decrementAdditional(data) {
  const searchIndex = itemCart.additionals.findIndex((s) => s.name === data.additional.name);

  if (searchIndex !== -1) {
    if (data.count !== 0) {
      itemCart.additionals[searchIndex].count = data.count;
      itemCart.additionals[searchIndex].total = data.count * data.additional.price;
    } else {
      itemCart.additionals.splice(searchIndex, 1);
    }
  }
  refreshTotal();
}

function incrementAdditional(data) {
  const searchIndex = itemCart.additionals.findIndex((s) => s.name === data.additional.name);

  if (searchIndex !== -1) {
    if (data.count !== 0) {
      itemCart.additionals[searchIndex].count = data.count;
      itemCart.additionals[searchIndex].total = data.count * data.additional.price;
    }
  } else {
    itemCart.additionals.push({
      id: data.additional.id,
      count: 1,
      name: data.additional.name,
      total: data.additional.price,
    });
  }
  refreshTotal();
}

function addCart() {
  let cartItems;
  if (localStorage.getItem('cartItems') === null) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
  }

  cartItems.push(itemCart);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

</script>

<style scoped>.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}</style>
