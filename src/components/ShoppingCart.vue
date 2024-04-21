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
        Resumo do Pedido
      </h1>
    </div>
    <div class="flex flex-col max-h-64 md:max-h-[270px] overflow-auto border rounded p-2">
      <div v-for="(item, index) in market" :key="index" class="text-sm text-gray-800 border rounded p-2 mt-1">
        <div class="flex justify-between text-justify">
          <p class="font-medium">
            {{ item.qtde }}x {{ item.name }}&nbsp;&nbsp;
            <button type="button" @click="deleteCartItem(index)">
              <font-awesome-icon icon="fa-regular fa-trash-can" />
            </button>
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
          <p>Total Item</p> <p>{{ item.totalCartItem.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
        </div>
      </div>
    </div>
    <div class="flex justify-between text-base text-gray-800 font-semibold pb-2">
      <p>Subtotal</p> <p>{{ subTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
    </div>
    <div v-if="user">
      <div class="flex flex-col max-h-72 md:max-h-[270px] overflow-auto border rounded p-2">
        <div class="flex justify-center">
          <div :class="`w-24 border-2 rounded ${forDelivery == true ? 'border-gray-800' : 'border-white'}`">
            <DescriptionButton icon="fa-solid fa-motorcycle" description="Entregar" @click="selectDelivery('deliver')" />
          </div>
          <div :class="`w-24 border-2 rounded ${forDelivery == false ? 'border-gray-800' : 'border-white'}`">
            <DescriptionButton icon="fa-solid fa-bag-shopping" description="Retirar" @click="selectDelivery('local')" />
          </div>
        </div>
        <div v-if="forDelivery != null">
          <div v-if="forDelivery">
            <div v-if="accountAddress">
              <AddressLayout icon="fa-solid fa-location-dot" :item="deliveryAddress" to="account/address" title="Editar endereço" />
            </div>
            <div v-else>
              <FormAddress :show-label="false" :confirm-registration="false" label-btn="Cadastrar" :address="newAddress" />
            </div>
          </div>
          <div v-else>
            <AddressLayout icon="fa-solid fa-location-dot" :item="deliveryAddress" />
          </div>
        </div>
      </div>
      <div v-if="deliveryAddress" class="flex justify-between text-base text-gray-800 font-semibold text-right pb-2">
        <p>Entrega</p><p> {{ delivery.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
      </div>
      <div v-if="deliveryAddress" class="flex justify-between items-center text-gray-800 pb-2">
        <p class="text-base font-semibold">
          Forma de Pagamento
        </p>
        <p class="italic">
          Na entrega do pedido
        </p>
      </div>
      <div v-if="deliveryAddress" class="flex justify-between text-base text-gray-800 font-semibold pb-2">
        <p>Total</p> <p>{{ total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
      </div>
      <div class="grid grid-cols-12 text-justify items-center">
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
      <DescriptionButton icon="fa-solid fa-arrow-right-to-bracket" description="Faça Login para enviar o pedido" route="/login" />
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
import ModalWrapper from './ModalWrapper.vue';
import DescriptionButton from './DescriptionButton.vue';
import AddressService from '../services/AddressService';
import ConfigurationService from '../services/ConfigurationService';
import OrderService from '../services/OrderService';
import StatusService from '../services/StatusService';
import NotificationService from '../services/NotificationService';
import FormAddress from './FormAddress.vue';

const market = ref([]);
const subTotal = ref(0);
const total = ref(0);
const delivery = ref(0);
const deliveryAddress = ref(null);
const forDelivery = ref(null);
const systemParams = ref({
  storeAddress: null,
  deliveryValue: null,
});
const accountAddress = ref({});
const isModalCartOpen = ref(false);
const animationBtn = ref(false);
const emitter = inject('emitter');
const user = ref(getUser());
const newAddress = ref({
  address_id: 0,
  description: null,
  number: null,
  neighborhood: null,
  city: null,
  favorite: false,
  account_id: user.value ? user.value.account_id : null,
});

emitter.on('closeFormAddress', async () => {
  await getAccountAddress();
  await selectDelivery('deliver');

});

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
  if (localStorage.getItem('cartItems') === null) {
    market.value = {};
  } else {
    market.value = JSON.parse(localStorage.getItem('cartItems')).value;
  }

  if (localStorage.getItem('cartItems') !== null) {
    subTotal.value = JSON.parse(localStorage.getItem('cartItems')).value.map((i) => i.totalCartItem).reduce((prev, curr) => prev + curr, 0);
  }

  total.value = (subTotal.value + delivery.value);
  warnDisabled();
}

function getUser() {
  let tokenDecoded = null;
  if (localStorage.getItem('jwt') !== null) {
    const token = JSON.parse(localStorage.getItem('jwt')).value;
    tokenDecoded = jwtDecode(token);
  }
  return tokenDecoded;
}

async function getAccountAddress() {
  if (user.value == null) {
    user.value = getUser();
  }
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
}
async function loadData() {
  if (localStorage.getItem('systemParams') === null) {
    systemParams.value.storeAddress = await ConfigurationService.getConfigurationID('storeAddress');
    systemParams.value.deliveryValue = await ConfigurationService.getConfigurationID('deliveryValue');
    const expiresIn = new Date().getTime() + (parseInt(process.env.VUE_APP_MARKET_EXPIRATION_TIME, 10));

    if (systemParams.value.storeAddress != false && systemParams.value.deliveryValue != false) {
      localStorage.setItem('systemParams', JSON.stringify({value: systemParams.value, expires: expiresIn}));
    }

  } else {
    systemParams.value = JSON.parse(localStorage.getItem('systemParams')).value;
  }

  if (user.value !== null) {
    await getAccountAddress();
  }

  if (localStorage.getItem('cartDelivery') !== null) {
    forDelivery.value = (JSON.parse(localStorage.getItem('cartDelivery')).value == 'deliver');

    if (forDelivery.value) {
      deliveryAddress.value = accountAddress.value;
      delivery.value = systemParams.value.deliveryValue;
    } else {
      deliveryAddress.value = systemParams.value.storeAddress;
      delivery.value = 0;
    }
  }
  updateCart();
}

function deleteCartItem(index) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')).value;
  cartItems.splice(index, 1);
  const expiresIn = new Date().getTime() + (parseInt(process.env.VUE_APP_MARKET_EXPIRATION_TIME, 10));
  localStorage.setItem('cartItems', JSON.stringify({value: cartItems, expires: expiresIn}));
  if (cartItems.length == 0) {
    isModalCartOpen.value = false;
  }
  updateCart();
}

async function orderNotification(orderId) {

  const title = 'Novo Pedido!';
  const message = `Criado pedido nº ${orderId}!`;
  const url = 'admin-order';

  await NotificationService.sendNotificationRole(JSON.stringify({
    roleName: 'employee',
    title: title,
    message: message,
    url: url,
  }));
  await NotificationService.sendNotificationRole(JSON.stringify({
    roleName: 'admin',
    title: title,
    message: message,
    url: url,
  }));

  return true;
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

async function orderProduct(cartItems, orderId) {
  cartItems.forEach(async (product) => {
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
    didOpen: async () => {
      Swal.showLoading();

      const cartItems = JSON.parse(localStorage.getItem('cartItems')).value;

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

      const orderProductResponse = await orderProduct(cartItems, orderId);
      if (!orderProductResponse) {
        return false;
      }

      const orderStatusResponse = await orderStatus(orderId);
      if (!orderStatusResponse) {
        return false;
      }

      const orderNotificationResponse = await orderNotification(orderId);
      if (!orderNotificationResponse) {
        return false;
      }

      await Swal.close();
    },
  }).then(() => {
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
  }).then(() => {
    cleanCart();
  });

  return true;
};

function cleanCart() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')).value;

  while (cartItems.length > 0) {
    cartItems.splice(0, 1);
  }
  const expiresIn = new Date().getTime() + (parseInt(process.env.VUE_APP_MARKET_EXPIRATION_TIME, 10));
  localStorage.setItem('cartItems', JSON.stringify({value: cartItems, expires: expiresIn}));
  updateCart();
}

function selectDelivery(option) {

  const expiresIn = new Date().getTime() + (parseInt(process.env.VUE_APP_MARKET_EXPIRATION_TIME, 10));
  localStorage.setItem('cartDelivery', JSON.stringify({value: option, expires: expiresIn}));

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
