import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/LoginView.vue'),
  },
  {
    path: '/create-account',
    name: 'createAccount',
    component: () => import('../views/create-account/CreateAccountView.vue'),
  },
  // {
  //   path: '/list-account',
  //   name: 'Lista Contas',
  //   component: () => import('../components/create-account/ListAccountComponent')
  // },
  // {
  //   path: '/edit-account/:id',
  //   name: 'Editar Conta',
  //   component: () => import('../components/create-account/EditAccountComponent')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
