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
    path: '/about',
    name: 'About',
    component: lazyLoad('AboutView'),
  },
  {
    path: '/account',
    name: 'ListAccount',
    component: lazyLoad('account/ListAccountView'),
  },
  {
    path: '/account/createAccount',
    name: 'CreateAccount',
    component: lazyLoad('account/CreateAccountView'),
    meta: { layout: 'empty-layout' },
  },
  {
    path: '/account/order',
    name: 'Order',
    component: lazyLoad('account/OrdersView'),
  },
  {
    path: '/account/address',
    name: 'Address',
    component: lazyLoad('account/AddressView'),
  },
  {
    path: '/admin/order',
    name: 'OrderAdmin',
    component: lazyLoad('admin/OrderAdminView'),
  },
  {
    path: '/admin/user',
    name: 'userAdmin',
    component: lazyLoad('admin/UserAdminView'),
  },
  {
    path: '/admin/menu',
    name: 'MenuAdmin',
    component: lazyLoad('admin/MenuAdminView'),
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
