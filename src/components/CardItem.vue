<template>
  <div class="p-3 flex rounded bg-white shadow-md hover:shadow-2xl hover:cursor-pointer hover:bg-gray-50 duration-300" @click="isModalCardItemOpen = true" @keydown="isModalCardItemOpen = true">
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
  <ModalWrapper :modal-open="isModalCardItemOpen">
    <div class="flex mb-2">
      <ReturnButton @click="isModalCardItemOpen = false" />
      <h1 class="text-lg text-gray-800 font-semibold text-justify">
        {{ props.product.name }}
      </h1>
    </div>
    <div class="bg-gray-50 justify-between bg-cover bg-center rounded">
      <img :src="props.product.image" class="object-cover h-48 w-full rounded-t" alt="" />
    </div>
    <div class="flex flex-col">
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
      <label class="mt-2">
        <div class="text-base text-gray-800">Observações</div>
        <textarea
          v-model="observation"
          class="w-full"
          rows="2"
          placeholder="Ex:Retirar cebola, retirar molho..."
          maxlength="80"
          @change="setObservation"
        /></label>
    </div>
    <div class="flex text-justify items-center">
      <div class="w-2/5">
        <ToggleCount @toggle-qtde-product="toggleQtdeProduct" />
      </div>
      <div class="w-3/5">
        <FormButton
          icon="fa-solid fa-cart-shopping"
          :description="'Adicionar ' + totalItemCart.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })"
          @click="addItemCart();updateCart();isModalCardItemOpen = false"
        />
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup>
import { ref, inject, reactive } from 'vue';
import ToggleCount from './ToggleCount.vue';
import AddItem from './AddItem.vue';
import FormButton from './FormButton.vue';
import ReturnButton from './ReturnButton.vue';
import ModalWrapper from './ModalWrapper.vue';

const props = defineProps({
  product: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
});

const isModalCardItemOpen = ref(false);
const emitter = inject('emitter');
const qtdeProduct = ref(1);
const totalAdditional = ref(0);
const observation = ref('');
const totalProduct = ref(qtdeProduct.value * props.product.price);
const totalItemCart = ref(qtdeProduct.value * props.product.price);

const itemCart = reactive({
  id: props.product.id,
  qtde: qtdeProduct.value,
  name: props.product.name,
  additionals: [],
  observation: '',
  totalProduct: totalProduct.value,
  totalItemCart: totalItemCart.value,
});

emitter.on('setModalFalse', () => {
  isModalCardItemOpen.value = false;
});

function updateTotal() {
  itemCart.additionals.forEach((item) => {
    let countTemp = 0;
    let totalTemp = 0;
    countTemp = item.count * qtdeProduct.value;
    totalTemp = countTemp * item.price;
    // eslint-disable-next-line no-param-reassign
    item.multCount = countTemp;
    // eslint-disable-next-line no-param-reassign
    item.total = totalTemp;
  });
  // eslint-disable-next-line
  totalAdditional.value = itemCart.additionals.map((item) => item.total).reduce((prev, curr) => prev + curr, 0);

  totalProduct.value = (qtdeProduct.value * props.product.price);
  totalItemCart.value = ((qtdeProduct.value * props.product.price) + totalAdditional.value);

  itemCart.qtde = qtdeProduct.value;
  itemCart.totalProduct = totalProduct.value;
  itemCart.totalItemCart = totalItemCart.value;
}

function toggleQtdeProduct(data) {
  qtdeProduct.value = data.qtde;

  updateTotal();
}

function decrementAdditional(data) {
  const searchIndex = itemCart.additionals.findIndex((s) => s.name === data.additional.name);

  if (searchIndex !== -1) {
    if (data.count !== 0) {
      itemCart.additionals[searchIndex].count = data.count;
      itemCart.additionals[searchIndex].multCount = data.count;
      itemCart.additionals[searchIndex].price = data.additional.price;
      // eslint-disable-next-line vue/max-len
      itemCart.additionals[searchIndex].total = data.count * data.additional.price;
    } else {
      itemCart.additionals.splice(searchIndex, 1);
    }
  }
  updateTotal();
}

function incrementAdditional(data) {
  const searchIndex = itemCart.additionals.findIndex((s) => s.name === data.additional.name);
  if (searchIndex !== -1) {
    if (data.count !== 0) {
      itemCart.additionals[searchIndex].count = data.count;
      itemCart.additionals[searchIndex].multCount = data.count;
      itemCart.additionals[searchIndex].price = data.additional.price;
      // eslint-disable-next-line vue/max-len
      itemCart.additionals[searchIndex].total = data.count * data.additional.price;
    }
  } else {
    itemCart.additionals.push({
      id: data.additional.id,
      count: 1,
      multCount: 1,
      price: data.additional.price,
      name: data.additional.name,
      total: data.additional.price,
    });
  }
  updateTotal();
}

function setObservation() {
  itemCart.observation = observation.value;
}

function resetItem() {
  qtdeProduct.value = 1;
  totalAdditional.value = 0;
  observation.value = '';
  totalProduct.value = (qtdeProduct.value * props.product.price);
  totalItemCart.value = (qtdeProduct.value * props.product.price);

  itemCart.qtde = qtdeProduct.value;
  itemCart.additionals = [];
  itemCart.observation = '';
  itemCart.totalProduct = qtdeProduct.value * props.product.price;
  itemCart.totalItemCart = qtdeProduct.value * props.product.price;
}

function addItemCart() {
  let itemsCart;
  if (localStorage.getItem('itemsCart') === null) {
    itemsCart = [];
  } else {
    itemsCart = JSON.parse(localStorage.getItem('itemsCart'));
  }

  itemsCart.push(itemCart);
  localStorage.setItem('itemsCart', JSON.stringify(itemsCart));

  resetItem();
}

function updateCart() {
  emitter.emit('update');
}
</script>
