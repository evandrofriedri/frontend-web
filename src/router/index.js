import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
const localStorageExpires = require("../midllewares/localStorageExpires");

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
    name: 'Account',
    component: lazyLoad('account/AccountView'),
    meta: { requireAuth: true },
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
    meta: { requireAuth: true },
  },
  {
    path: '/account/address',
    name: 'Address',
    component: lazyLoad('account/AddressView'),
    meta: { requireAuth: true },
  },
  {
    path: '/admin/order',
    name: 'OrderAdmin',
    component: lazyLoad('admin/OrderAdminView'),
    meta: { requireAuth: true },
  },
  {
    path: '/admin/account',
    name: 'AccountAdmin',
    component: lazyLoad('admin/AccountAdminView'),
    meta: { requireAuth: true },
  },
  {
    path: '/admin/menu',
    name: 'MenuAdmin',
    component: lazyLoad('admin/MenuAdminView'),
    meta: { requireAuth: true },
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

router.beforeEach((to, from, next) => {
  localStorageExpires();
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/',
      });
    } else {
      next();
    }
  } else {
    next();
  }
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
