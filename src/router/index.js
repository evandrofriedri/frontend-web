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
    path: '/user',
    name: 'ListUser',
    component: lazyLoad('user/ListUserView'),
  },
  {
    path: '/createUser',
    name: 'CreateUser',
    component: lazyLoad('user/CreateUserView'),
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
    path: '/userAdmin',
    name: 'userAdmin',
    component: lazyLoad('user/UserAdminView'),
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
