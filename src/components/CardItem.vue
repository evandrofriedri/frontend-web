<template>
  <div
    class="p-2 flex justify-between rounded max-h-28 bg-white shadow-md hover:shadow-2xl hover:cursor-pointer hover:bg-gray-50 duration-300"
    @click="isModalCardItemOpen = true" @keydown="isModalCardItemOpen = true">
    <div class="flex flex-col justify-between pr-5">
      <div>
        <p class="mb-2 text-base font-medium text-gray-900">
          {{ props.product.name }}
        </p>
        <p class="mb-2 text-xs text-gray-600">
          {{ props.product.description }}
        </p>
      </div>
      <p class="text-sm font-semibold text-gray-900">
        {{ parseFloat(props.product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
      </p>
    </div>
    <div class="min-w-fit rounded">
      <img :src="props.product.image_url" class="object-cover h-24 w-24 rounded" alt="" />
    </div>
  </div>
  <ModalWrapper :modal-open="isModalCardItemOpen" :screen="`CardItem-${props.product.product_id}`">
    <div class="flex mb-2">
      <ReturnButton @click="isModalCardItemOpen = false" />
      <h1 class="text-lg text-gray-800 font-semibold text-justify">
        {{ props.product.name }}
      </h1>
    </div>
    <div class="bg-gray-50 justify-between bg-cover bg-center rounded">
      <img :src="props.product.image_url" class="object-cover h-48 w-full rounded-t" alt="" />
    </div>
    <div class="flex flex-col max-h-[400px] overflow-auto">
      <p class="text-sm font-light text-gray-800 text-justify mt-2">
        {{ props.product.description }}
      </p>
      <p class="text-base text-gray-800 font-semibold text-right mt-2">
        {{ props.product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
      </p>
      <div v-if="props.product.additionals != ''" class="w-full mt-2">
        <div class="text-base text-gray-800">
          Adicionais
        </div>
        <div v-for="(item, index) in props.product.additionals" :key="index">
          <div class="flex justify-between pt-2 text-gray-800">
            <AddItem :additional="item" @decrement-count="decrementAdditional" @increment-count="incrementAdditional" />
          </div>
        </div>
      </div>
      <label class="mt-2">
        <div class="text-base text-gray-800">Observações</div>
        <textarea v-model="observation" class="w-full" rows="2" placeholder="Ex:Retirar cebola, retirar molho..."
          maxlength="80" @change="setObservation" />
      </label>
    </div>
    <div class="flex text-justify items-center">
      <div class="w-2/5">
        <ToggleCount @toggle-qtde-product="toggleQtdeProduct" />
      </div>
      <div class="w-3/5">
        <FormButton icon="fa-solid fa-cart-shopping"
          :description="'Adicionar ' + totalCartItem.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })"
          @click="addCartItem(); updateCart(); isModalCardItemOpen = false" />
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
const totalCartItem = ref(qtdeProduct.value * props.product.price);

const cartItem = reactive({
  product_id: props.product.product_id,
  qtde: qtdeProduct.value,
  name: props.product.name,
  unit_value: props.product.price,
  additionals: [],
  observation: '',
  totalProduct: totalProduct.value,
  totalCartItem: totalCartItem.value,
});

emitter.on(`setModalFalse-CardItem-${props.product.product_id}`, () => {
  isModalCardItemOpen.value = false;
});

function updateTotal() {
  cartItem.additionals.forEach((item) => {
    let countTemp = 0;
    let totalTemp = 0;
    countTemp = item.qtde * qtdeProduct.value;
    totalTemp = countTemp * item.unit_value;
    // eslint-disable-next-line no-param-reassign
    item.mult_qtde = countTemp;
    // eslint-disable-next-line no-param-reassign
    item.total = totalTemp;
  });
  // eslint-disable-next-line
  totalAdditional.value = cartItem.additionals.map((item) => item.total).reduce((prev, curr) => prev + curr, 0);

  totalProduct.value = (qtdeProduct.value * props.product.price);
  totalCartItem.value = ((qtdeProduct.value * props.product.price) + totalAdditional.value);

  cartItem.qtde = qtdeProduct.value;
  cartItem.totalProduct = totalProduct.value;
  cartItem.totalCartItem = totalCartItem.value;
}

function toggleQtdeProduct(data) {
  qtdeProduct.value = data.qtde;

  updateTotal();
}

function decrementAdditional(data) {
  const searchIndex = cartItem.additionals.findIndex((s) => s.name === data.additional.name);

  if (searchIndex !== -1) {
    if (data.count !== 0) {
      cartItem.additionals[searchIndex].qtde = data.count;
      cartItem.additionals[searchIndex].mult_qtde = data.count;
      cartItem.additionals[searchIndex].unit_value = data.additional.price;
      // eslint-disable-next-line vue/max-len
      cartItem.additionals[searchIndex].total = data.count * data.additional.price;
    } else {
      cartItem.additionals.splice(searchIndex, 1);
    }
  }
  updateTotal();
}

function incrementAdditional(data) {
  const searchIndex = cartItem.additionals.findIndex((s) => s.name === data.additional.name);
  if (searchIndex !== -1) {
    if (data.count !== 0) {
      cartItem.additionals[searchIndex].qtde = data.count;
      cartItem.additionals[searchIndex].mult_qtde = data.count;
      cartItem.additionals[searchIndex].unit_value = data.additional.price;
      // eslint-disable-next-line vue/max-len
      cartItem.additionals[searchIndex].total = data.count * data.additional.price;
    }
  } else {
    cartItem.additionals.push({
      additional_id: data.additional.additional_id,
      qtde: 1,
      mult_qtde: 1,
      unit_value: data.additional.price,
      name: data.additional.name,
      total: data.additional.price,
    });
  }
  updateTotal();
}

function setObservation() {
  cartItem.observation = observation.value;
}

function resetItem() {
  qtdeProduct.value = 1;
  totalAdditional.value = 0;
  observation.value = '';
  totalProduct.value = (qtdeProduct.value * props.product.price);
  totalCartItem.value = (qtdeProduct.value * props.product.price);

  cartItem.qtde = qtdeProduct.value;
  cartItem.additionals = [];
  cartItem.observation = '';
  cartItem.totalProduct = qtdeProduct.value * props.product.price;
  cartItem.totalCartItem = qtdeProduct.value * props.product.price;
}

function addCartItem() {
  let cartItems;
  if (localStorage.getItem('cartItems') === null) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(localStorage.getItem('cartItems')).value;
  }

  cartItems.push(cartItem);
  const expiresIn = new Date().getTime() + (parseInt(process.env.VUE_APP_MARKET_EXPIRATION_TIME, 10));
  localStorage.setItem('cartItems', JSON.stringify({ value: cartItems, expires: expiresIn }));

  resetItem();
}

function updateCart() {
  emitter.emit('update');
}
</script>
