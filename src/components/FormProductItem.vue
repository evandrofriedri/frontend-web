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
        <BaseInput id="name" v-model="newProduct.name" label="Nome Produto" type="text" placeholder="Nome Produto" :errors="v$.name.$errors" />
        <BaseInput id="description" v-model="newProduct.description" label="Descrição" type="text" placeholder="Descrição" :errors="v$.description.$errors" />
        <SelectInput id="category_id" v-model="newProduct.category_id" name="category" :items="categories" label="Categoria" :errors="v$.category_id.$errors" />
        <div class="text-base text-gray-700">
          Adicionais
        </div>
        <div class="max-h-[200px] overflow-auto rounded mb-4">
          <div v-for="(item, index) in additionals" :key="index">
            <div class="flex justify-between pt-2 text-gray-700">
              <CheckboxInput
                :item="item"
                @update-checkbox="updateAdditional"
              />
            </div>
          </div>
        </div>
        <BaseInput id="imageUrl" v-model="newProduct.imageUrl" label="Url da Imagem" type="text" placeholder="Url da Imagem" :errors="v$.imageUrl.$errors" />
        <BaseInput id="price" v-model="newProduct.price" label="Preço" type="number" placeholder="Preço do Produto" :errors="v$.price.$errors" />
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
import Swal from 'sweetalert2';
import CheckboxInput from './CheckboxInput.vue';
import BaseInput from './BaseInput.vue';
import SelectInput from './SelectInput.vue';
import FormButton from './FormButton.vue';
import ReturnButton from './ReturnButton.vue';

const emitter = inject('emitter');
const categories = ref([]);
const additionals = ref([]);
const newProduct = ref({
  id: -1,
  name: '',
  description: '',
  category_id: -1,
  additionals: [],
  imageUrl: '',
  price: 0,
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
  imageUrl: {
    required: helpers.withMessage('Campo obrigatório ', required),
  },
}));

const v$ = useVuelidate(rules, newProduct);

function closeModal() {
  emitter.emit('closeModal');
}

function updateAdditional(data) {
  const searchIndex = newProduct.value.additionals.indexOf(parseInt(data, 10));
  if (searchIndex === -1) {
    newProduct.value.additionals.push(parseInt(data, 10));
  } else {
    newProduct.value.additionals.splice(searchIndex, 1);
  }
}
function loadCategories() {
  const data = [
    {
      id: '',
      name: '--- Selecione uma Categoria ---',
    },
    {
      id: 1,
      name: 'Promoções',
    },
    {
      id: 2,
      name: 'Combos',
    },
    {
      id: 3,
      name: 'Clássicos',
    },
    {
      id: 4,
      name: 'Cervejas',
    },
    {
      id: 5,
      name: 'Refrigerantes',
    },
  ];

  return data;
}

function loadAdditionals() {
  const data = [
    {
      id: 1,
      name: 'Rúcula',
      price: 2.00,
    },
    {
      id: 2,
      name: 'Bacon',
      price: 2.00,
    },
    {
      id: 3,
      name: 'Tomate',
      price: 2.00,
    },
    {
      id: 4,
      name: 'Ovo',
      price: 2.00,
    },
    {
      id: 5,
      name: 'Alface',
      price: 2.00,
    },
    {
      id: 6,
      name: 'Queijo',
      price: 2.00,
    },
    {
      id: 7,
      name: 'Cebola',
      price: 2.00,
    }];

  data.forEach((element) => {
    if (newProduct.value.additionals.includes(element.id)) {
      // eslint-disable-next-line no-param-reassign
      element.checked = true;
    } else {
      // eslint-disable-next-line no-param-reassign
      element.checked = false;
    }
  });

  return data;
}

onMounted(async () => {
  newProduct.value = await props.product;
  categories.value = await loadCategories();
  additionals.value = await loadAdditionals();
});

const submitForm = async () => {
  const result = await v$.value.$validate();

  if (result) {
    console.log('fomr enviado!');
    console.log(newProduct.value);
    Swal.fire({
      icon: 'success',
      title: 'Produto salvo com sucesso!',
      text: `Produto ${newProduct.value.name} salvo.`,
      confirmButtonColor: '#374151',
    }).then(() => {
      closeModal();
    });
  } else {
    console.log('nao enviado!');
  }
};

</script>
