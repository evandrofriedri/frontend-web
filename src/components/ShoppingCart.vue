<template>
  <div v-if="market.length > 0" class="fixed z-10 inset-x-0 bottom-2 right-2 left-2">
    <div id="cart" :class="{ shake: animationBtn }">
      <FormButton
        icon="fa-solid fa-cart-shopping"
        description="Carrinho"
        @click="isModalCartOpen = true"
      />
      <div class="absolute leading-none text-white font-semibold top-0 right-0 -mt-2 -mr-2 px-2 py-1 bg-red-600 rounded-full">
        {{ market.length }}
      </div>
    </div>
  </div>
  <ModalWrapper :modal-open="isModalCartOpen" screen="ShoppingCart-0">
    <div class="flex mb-2">
      <ReturnButton @click="isModalCartOpen = false" />
      <h1 class="text-lg text-gray-800 font-semibold text-justify">
        Itens Adicionados
      </h1>
    </div>
    <div class="flex flex-col max-h-72 md:max-h-[400px] overflow-auto border rounded p-2">
      <div v-for="(item, index) in market" :key="index" class="text-sm text-gray-800 border rounded p-2 mt-1">
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
        <p v-if="item.additionals.length !== 0" class="text-sm pl-5">
          Adicionais:
        </p>
        <div v-for="(add, idx) in item.additionals" :key="idx">
          <div class="flex justify-between text-sm text-justify pl-5">
            <p class="font-light">
              {{ add.mult_qtde }}x {{ add.name }}
            </p>
            <p class="font-medium">
              {{ add.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
            </p>
          </div>
        </div>
        <p v-if="item.observation !== ''" class="text-sm pl-5">
          Observações: {{ item.observation }}
        </p>
        <div class="flex justify-between text-sm font-medium text-right">
          <p>Total Item</p> <p>{{ item.totalItemCart.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
        </div>
      </div>
      <CardNotFound :found="market.length" label="Nenhum item no carrinho, retorne ao cardápio para adicionar seu produto!" />
    </div>
    <div v-if="market.length > 0" class="flex justify-between text-base text-gray-800 font-semibold pb-2">
      <p>Subtotal</p> <p>{{ subTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
    </div>
    <div v-if="user">
      <div v-if="market.length > 0" class="flex justify-between items-center p-2 border rounded">
        <div v-if="deliveryAddress" class="flex flex-col items-center text-gray-800">
          <div class="flex items-center">
            <input id="delivery-radio-1" :checked="forDelivery" type="radio" value="" name="delivery-radio" class="w-4 h-4 focus:ring-gray-600 focus:ring-2" @change="updateDelivery('deliver')">
            <label for="delivery-radio-1" :checked="!forDelivery" class="w-full ml-2 text-sm font-medium">Para entregar</label>
          </div>
          <div class="flex items-center">
            <input id="delivery-radio-2" type="radio" value="" name="delivery-radio" class="w-4 h-4 border-gray-300 focus:ring-gray-600 focus:ring-2" @change="updateDelivery('local')">
            <label for="delivery-radio-2" class="w-full ml-2 text-sm font-medium">Retirar na loja</label>
          </div>
        </div>
        <div v-else class="w-screen">
          <DescriptionButton icon="fa-solid fa-address-card" description="Cadastre um endereço para confirmar o pedido!" route="/account/address" />
        </div>
        <div v-if="deliveryAddress">
          <AddressLayout icon="fa-solid fa-map-location-dot" :item="deliveryAddress" />
        </div>
      </div>
      <div v-if="market.length > 0">
        <div v-if="deliveryAddress" class="flex justify-between text-base text-gray-800 font-semibold text-right pb-2">
          <p>Entrega</p><p> {{ delivery.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
        </div>
      </div>
      <div v-if="market.length > 0">
        <div v-if="deliveryAddress" class="flex justify-between items-center text-gray-800 pb-2">
          <p class="text-base font-semibold">
            Forma de Pagamento
          </p>
          <p class="italic">
            Na entrega do pedido
          </p>
        </div>
      </div>
      <div v-if="market.length > 0">
        <div v-if="deliveryAddress" class="flex justify-between text-base text-gray-800 font-semibold pb-2">
          <p>Total</p> <p>{{ total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
        </div>
      </div>
      <div v-if="market.length > 0" class="grid grid-cols-12 text-justify items-center">
        <div v-if="deliveryAddress" class="col-start-6 md:col-start-8 col-end-13">
          <FormButton
            icon="fa-solid fa-check"
            description="Confirmar Pedido"
            @click="confirmOrder();isModalCartOpen = false"
          />
        </div>
      </div>
    </div>
    <div v-else class="mt-4 mb-4">
      <DescriptionButton icon="fa-solid fa-arrow-right-to-bracket" description="Faça Login para concluir o pedido" route="/login" />
    </div>
  </ModalWrapper>
</template>

<script setup>
import {
  ref,
  inject,
  onMounted,
} from 'vue';
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";
import AddressLayout from './AddressLayout.vue';
import FormButton from './FormButton.vue';
import ReturnButton from './ReturnButton.vue';
import CardNotFound from './CardNotFound.vue';
import ModalWrapper from './ModalWrapper.vue';
import DescriptionButton from './DescriptionButton.vue';
import AddressService from '../services/AddressService';
import ConfigurationService from '../services/ConfigurationService';
import OrderService from '../services/OrderService';
import StatusService from '../services/StatusService';

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
const user = ref(null);

emitter.on('setModalFalse-ShoppingCart-0', () => {
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

function getUser() {
  const token = JSON.parse(localStorage.getItem('jwt'));
  let tokenDecoded = null;
  if (token !== null) {
    tokenDecoded = jwtDecode(token);
  }
  return tokenDecoded;
}

async function loadData() {
  if (localStorage.getItem('systemParams') === null) {
    systemParams.value.storeAddress = await ConfigurationService.getConfigurationID('storeAddress');
    systemParams.value.deliveryValue = await ConfigurationService.getConfigurationID('deliveryValue');
    localStorage.setItem('systemParams', JSON.stringify(systemParams.value));
  } else {
    systemParams.value = JSON.parse(localStorage.getItem('systemParams'));
  }

  user.value = getUser();
  if (user.value !== null) {
    const response = await AddressService.getAddressID(user.value.account_id);
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
  }
  updateCart();
}

function deleteItemCart(index) {
  const itemsCart = JSON.parse(localStorage.getItem('itemsCart'));
  itemsCart.splice(index, 1);
  localStorage.setItem('itemsCart', JSON.stringify(itemsCart));
  updateCart();
}

async function orderStatus(orderId) {
  const statusResponse = await StatusService.getStatuses();
  // eslint-disable-next-line vue/max-len
  const createOrderStatusresponse = await OrderService.createOrderStatus(orderId, statusResponse[0].status_id);
  if (!createOrderStatusresponse) {
    Swal.fire({
      icon: 'error',
      title: 'Erro ao cadastrar novo Pedido, tente mais tarde!',
      showConfirmButton: true,
      confirmButtonColor: '#374151',
    });
    return false;
  }
  return true;
}

async function orderProductAdditional(product, orderProductId) {
  product.additionals.forEach(async (additional) => {
    const additionalId = additional.additional_id;
    // eslint-disable-next-line vue/max-len
    const orderProductAdditionalResponse = await OrderService.createOrderProductAdditional(orderProductId, additionalId, additional);
    if (!orderProductAdditionalResponse) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar novo Pedido, tente mais tarde!',
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      });
      return false;
    }
    return true;
  });
}

async function orderProduct(itemsCart, orderId) {
  itemsCart.forEach(async (product) => {
    const productId = product.product_id;
    const orderProductResponse = await OrderService.createOrderProduct(orderId, productId, product);
    if (!orderProductResponse) {
      // deletar o pedido e pedido produto se houver
      await OrderService.deleteOrderProducts(orderId);
      await OrderService.deleteOrder(orderId);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar novo Pedido, tente mais tarde!',
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      });
      return false;
    }
    const orderProductId = orderProductResponse.return[0].order_product_id;
    await orderProductAdditional(product, orderProductId);
    return true;
  });
  return true;
}

const confirmOrder = async () => {

  let orderId;
  Swal.fire({
    title: "Pedido sendo criado...",
    html: "Aguarde um instante.",
    timer: 3500,
    timerProgressBar: true,
    didOpen: async () => {
      Swal.showLoading();

      const itemsCart = JSON.parse(localStorage.getItem('itemsCart'));

      const order = {
        account_id: user.value.account_id,
        observation: '',
        delivery: delivery.value,
        total_value: total.value,
      };

      const orderResponse = await OrderService.createOrder(order);
      if (!orderResponse) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao cadastrar novo Pedido, tente mais tarde!',
          showConfirmButton: true,
          confirmButtonColor: '#374151',
        });
        return false;
      }

      orderId = orderResponse.return[0].order_id;

      const orderProductResponse = await orderProduct(itemsCart, orderId);

      if (!orderProductResponse) {
        return false;
      }

      const orderStatusResponse = await orderStatus(orderId);
      if (!orderStatusResponse) {
        return false;
      }

    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      Swal.fire({
        icon: 'success',
        title: 'Pedido realizado com sucesso!',
        html: `Pedido <b>#${orderId}</b> criado. <br>Acompanhe o pedido em <i>Meus pedidos</i>.`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#374151',
        confirmButtonText: '<a href="/account/order">Meus Pedidos</a>',
        cancelButtonText: 'Cardápio',
      });
    }
  }).then(() => {
    cleanCart();
  });

  return true;
};

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
