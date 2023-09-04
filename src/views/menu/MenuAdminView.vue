<template>
  <div class="flex w-full h-48" />
  <div class="flex flex-col container mx-auto py-10 px-4 sm:px-6 lg:px-20">
    <h1 class="mb-5 text-xl font-semibold text-gray-700">
      Produtos Cadastrados
    </h1>
    <div class="grid grid-cols-12 items-center mb-2">
      <div class="col-start-1 col-end-2">
        <BaseButton icon="fa-solid fa-file-circle-plus" description="" @click="isModalAddOpen = true" />
      </div>
      <div class="col-start-6 md:col-start-10 col-end-13">
        <SearchInput id="accountAdminSearch" v-model="search" placeholder="Digite o nome do produto" />
      </div>
    </div>
    <div v-show="foundMenu !== 0" class="p-5 bg-white shadow-md rounded-xl mb-3 overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-700">
        <thead class="text-xs text-gray-900 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-2 py-2">
              Produto
            </th>
            <th scope="col" class="px-2 py-2">
              Descrição
            </th>
            <th scope="col" class="px-2 py-2">
              Categoria
            </th>
            <th scope="col" class="px-2 py-2">
              <!-- talvez um status Pago|nao pago pode ser necessario ser criado e retirado
                 botao Ações -->
              Status
            </th>
            <th scope="col" class="px-2 py-2">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredList()" :key="index" class="bg-white border-b">
            <MenuAdminItem :menu="item" />
          </tr>
        </tbody>
      </table>
    </div>
    <CardNotFound :found="foundMenu" label="Produto não encontrado!" />
  </div>
  <Teleport to="#modal">
    <Transition name="modal">
      <div v-if="isModalAddOpen" class="flex fixed top-0 left-0 z-10 w-screen h-screen bg-black/50 justify-center items-center">
        <div ref="modal" class="relative bg-white rounded-xl shadow-2xl">
          <div class="mx-auto w-full max-w-xs md:max-w-md lg:max-w-lg bg-white shadow-2xl rounded-xl">
            <form action="" @submit.prevent="submitForm">
              <div class="p-4 flex flex-col">
                <h1 class="text-lg text-gray-800 font-medium text-justify mb-2">
                  Novo Produto
                </h1>
                <div class="flex flex-col">
                  <BaseInput id="name" v-model="newProduct.name" label="Nome Produto" type="text" placeholder="Nome Produto" :errors="v$.name.$errors" />
                  <BaseInput id="description" v-model="newProduct.description" label="Descrição" type="text" placeholder="Descrição" :errors="v$.description.$errors" />
                  <SelectInput id="category" v-model="newProduct.category_id" :items="categories" label="Categoria" :errors="v$.category_id.$errors" />
                  <div class="text-base text-gray-700">
                    Adicionais
                  </div>
                  <div class="max-h-[200px] overflow-auto rounded-xl mb-4">
                    <div v-for="(item, index) in additionals" :key="index">
                      <div class="flex justify-between pt-2 text-gray-700">
                        <AddCheckboxlItem
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
              <div class="p-4 grid grid-cols-12">
                <div class="col-start-6 md:col-start-8 col-end-13">
                  <FormButton
                    btn-type="submit"
                    icon="fa-regular fa-floppy-disk"
                    description="Cadastrar Produto"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { onClickOutside } from '@vueuse/core';
import {
  required, helpers, between,
} from '@vuelidate/validators';
import SearchInput from '../../components/SearchInput.vue';
import CardNotFound from '../../components/CardNotFound.vue';
import MenuAdminItem from '../../components/MenuAdminItem.vue';
import BaseButton from '../../components/BaseButton.vue';
import FormButton from '../../components/FormButton.vue';
import BaseInput from '../../components/BaseInput.vue';
import SelectInput from '../../components/SelectInput.vue';
import AddCheckboxlItem from '../../components/AddCheckboxlItem.vue';

const isModalAddOpen = ref(false);
const modal = ref(null);
const search = ref('');
let products = [];
let categories = [];
let additionals = [];
const foundMenu = ref(0);

const newProduct = ref({
  id: -1,
  name: '',
  description: '',
  category_id: '',
  additionals: [],
  imageUrl: '',
  price: 0,
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

onClickOutside(modal, () => {
  isModalAddOpen.value = false;
});

const submitForm = async () => {
  const result = await v$.value.$validate();

  if (result) {
    console.log('fomr enviado!');
  } else {
    console.log('nao enviado!');
  }
};

function updateAdditional(data) {
  const searchIndex = newProduct.value.additionals.indexOf(data);
  if (searchIndex === -1) {
    newProduct.value.additionals.push(data);
  } else {
    newProduct.value.additionals.splice(searchIndex, 1);
  }
}

function loadProduct() {
  const data = [
    {
      product_id: '01',
      name: 'Hamburguer da casa',
      description: 'Melhor hamburguer de todos os tempos',
      category: 'Promoções',
      status_id: 1,
    },
    {
      product_id: '02',
      name: 'Budweiser',
      description: 'Cerveja gelada e de qualidade',
      category: 'Cervejas',
      status_id: 1,
    },
  ];

  return data;
}

function loadCategories() {
  const data = [
    {
      id: '',
      name: 'Selecione',
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
    },
    {
      id: 4,
      name: 'Hamburguer',
      price: 2.00,
    }];

  return data;
}

function thereIsMenu(obj) {
  foundMenu.value = Object.values(obj).length;
}

function filteredList() {
  products = loadProduct();
  categories = loadCategories();
  additionals = loadAdditionals();

  // eslint-disable-next-line vue/max-len
  const filtData = products.filter((d) => d.name.toLowerCase().includes(search.value.toLowerCase()));
  thereIsMenu(filtData);
  return filtData;
}

</script>
