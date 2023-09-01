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
    path: '/login',
    name: 'Login',
    component: lazyLoad('LoginView'),
    meta: { layout: 'empty-layout' },
  },
  {
    path: '/account',
    name: 'ListAccount',
    component: lazyLoad('account/ListAccountView'),
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: lazyLoad('account/CreateAccountView'),
    meta: { layout: 'empty-layout' },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: lazyLoad('order/OrdersView'),
  },
  {
    path: '/address',
    name: 'Address',
    component: lazyLoad('address/AddressView'),
  },
  {
    path: '/orderAdmin',
    name: 'OrderAdmin',
    component: lazyLoad('order/OrderAdminView'),
  },
  {
    path: '/accountAdmin',
    name: 'AccountAdmin',
    component: lazyLoad('account/AccountAdminView'),
  },
  {
    path: '/menuAdmin',
    name: 'MenuAdmin',
    component: lazyLoad('menu/MenuAdminView'),
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
