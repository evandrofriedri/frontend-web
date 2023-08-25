import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';

function lazyLoad(view) {
  return () => import(`../views/${view}.vue`);
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: lazyLoad('HomeView'),
  },
  {
    path: '/account',
    name: 'ListAccount',
    component: lazyLoad('account/ListAccountView'),
  },
  {
    path: '/orders',
    name: 'Orders',
    component: lazyLoad('OrdersView'),
  },
  {
    path: '/address',
    name: 'Address',
    component: lazyLoad('AddressView'),
  },
  {
    path: '/login',
    name: 'Login',
    component: lazyLoad('LoginView'),
    meta: { layout: 'empty-layout' },
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: lazyLoad('account/CreateAccountView'),
    meta: { layout: 'empty-layout' },
  },
  {
    path: '/about',
    name: 'About',
    component: lazyLoad('AboutView'),
    meta: { layout: 'empty-layout' },
  },
  {
    path: '/:patchMatch(.*)',
    name: 'NotFound',
    component: lazyLoad('NotFoundView'),
    meta: { layout: 'empty-layout' },
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

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
    NProgress.configure({ speed: 700 });
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
