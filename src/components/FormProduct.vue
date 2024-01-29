<template>
  <form action="" @submit.prevent="submitForm">
    <div class="flex flex-col">
      <div class="flex mb-2">
        <ReturnButton @click="closeModal()" />
        <h1 class="text-lg text-gray-800 font-medium text-justify">
          {{ labelForm }}
        </h1>
      </div>
      <div class="flex flex-col">
        <BaseInput id="name" v-model="product.name" label="Nome Produto" type="text" placeholder="Nome Produto" :errors="v$.name.$errors" />
        <BaseInput id="description" v-model="product.description" label="Descrição" type="text" placeholder="Descrição" :errors="v$.description.$errors" />
        <SelectInput id="category_id" v-model="product.category_id" name="category" :items="categories" label="Categoria" :errors="v$.category_id.$errors" />
        <div class="text-base text-gray-800">
          Adicionais
        </div>
        <div class="max-h-[200px] overflow-auto rounded mb-4">
          <div v-for="(item, index) in additionals" :key="index">
            <div class="flex justify-between pt-2 text-gray-800">
              <CheckboxInput
                :item="item"
                @update-checkbox="updateAdditional"
              />
            </div>
          </div>
        </div>
        <BaseInput id="image_url" v-model="product.image_url" label="Url da Imagem" type="text" placeholder="Url da Imagem" maxlength="300" :errors="v$.image_url.$errors" />
        <BaseInput id="price" v-model="product.price" label="Preço" type="number" step="0.01" placeholder="Preço do Produto" max="99999" :errors="v$.price.$errors" />
      </div>
    </div>
    <div class="grid grid-cols-12">
      <div class="col-start-6 md:col-start-8 col-end-13">
        <FormButton
          btn-type="submit"
          icon="fa-regular fa-floppy-disk"
          :description="labelBtn"
        />
      </div>
    </div>
  </form>
</template>
<script setup>
import {
  ref,
  computed,
  onMounted,
  inject,
} from 'vue';
import { useVuelidate } from '@vuelidate/core';
import {
  required, helpers, between,
} from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import CheckboxInput from './CheckboxInput.vue';
import BaseInput from './BaseInput.vue';
import SelectInput from './SelectInput.vue';
import FormButton from './FormButton.vue';
import ReturnButton from './ReturnButton.vue';
import CategoryService from '../services/CategoryService';
import AdditionalService from '../services/AdditionalService';
import ProductService from '../services/ProductService';

const router = useRouter();
const emitter = inject('emitter');
const categories = ref([]);
const additionals = ref([]);

const product = ref({
  id: null,
  name: null,
  description: null,
  category_id: null,
  additionals: [],
  image_url: null,
  price: null,
});

const props = defineProps({
  product: {
    type: Object,
    default() {
      return { msg: 0 };
    },
  },
  labelForm: {
    type: String,
    default: '',
  },
  labelBtn: {
    type: String,
    default: '',
  },
});

function closeModal() {
  emitter.emit(`closeModal-FormProduct-${props.product.product_id}`);
}

async function loadCategories() {
  const response = await CategoryService.getCategories();
  const data = [];
  response.forEach(element => {
    data.push({
      id: element.category_id,
      name: element.name,
    });
  });
  return data;
}

async function loadAdditionals() {
  const responseAdd = await AdditionalService.getAdditionals();

  let responsePrdAdd = [];
  const result = [];
  if (product.value.product_id !== undefined) {
    responsePrdAdd = await ProductService.getProductAdditionals(product.value.product_id);
    responsePrdAdd.forEach((element) => {
      // eslint-disable-next-line dot-notation
      result.push(element['additional_id']);
    });
  }
  responseAdd.forEach((element) => {
    if (result.includes(element.additional_id)) {
      // eslint-disable-next-line no-param-reassign
      element.checked = true;
    } else {
      // eslint-disable-next-line no-param-reassign
      element.checked = false;
    }
  });

  return responseAdd;
}

function updateAdditional(data) {
  const searchIndex = product.value.additionals.indexOf(parseInt(data, 10));
  if (searchIndex === -1) {
    product.value.additionals.push(parseInt(data, 10));
  } else {
    product.value.additionals.splice(searchIndex, 1);
  }
}

onMounted(async () => {
  product.value = await props.product;
  categories.value = await loadCategories();
  additionals.value = await loadAdditionals();
});

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  description: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  price: {
    required: helpers.withMessage('Campo obrigatório', required),
    betweenValue: helpers.withMessage('Valor deverá estar entre 5 e 100', between(5, 100)),
  },
  category_id: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  image_url: {
    required: helpers.withMessage('Campo obrigatório ', required),
  },
}));

const v$ = useVuelidate(rules, product);

const submitForm = async () => {
  const validated = await v$.value.$validate();

  if (!validated) {
    return false;
  }

  if (product.value.product_id === 0) {
    const response = await ProductService.createProduct(product.value);
    if (!response) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar novo produto, tente mais tarde!',
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      });
      return false;
    }

    if (product.value.additionals.length > 0) {
      product.value.additionals.forEach(async (element) => {
        // eslint-disable-next-line vue/max-len
        const result = await ProductService.createProductAdditional(response.return[0].product_id, element);

        if (!result) {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao cadastrar adicional no produto, tente mais tarde!',
            showConfirmButton: true,
            confirmButtonColor: '#374151',
          });
        }
      });
    }

    Swal.fire({
      icon: 'success',
      title: 'Cadastro realizado com sucesso!',
      showConfirmButton: true,
      confirmButtonColor: '#374151',
    }).then(() => {
      router.go(0);
    });
  } else {
    const response = await ProductService.updateProduct(product.value);
    if (!response) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao editar produto, tente mais tarde!',
        showConfirmButton: true,
        confirmButtonColor: '#374151',
      });
      return false;
    }

    await ProductService.deleteProductAdditionals(product.value.product_id);
    await product.value.additionals.forEach(async (element) => {
      await ProductService.createProductAdditional(product.value.product_id, element);
    });

    Swal.fire({
      icon: 'success',
      title: 'Alteração realizada com sucesso!',
      showConfirmButton: true,
      confirmButtonColor: '#374151',
    }).then(() => {
      router.go(0);
    });
  }

  return true;
};

</script>
