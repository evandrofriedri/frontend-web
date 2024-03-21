import { createApp } from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import './index.css';
import mitt from 'mitt';
import vue3GoogleLogin from 'vue3-google-login';
import App from './App.vue';
import router from './router';
import icons from './assets/icons';

// eslint-disable-next-line import/no-relative-packages
import '../node_modules/nprogress/nprogress.css';
import 'sweetalert2/dist/sweetalert2.min.css';

import DefaultLayout from './layouts/DefaultLayout.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';

library.add({ ...icons });

const emitter = mitt();

const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;

createApp(App)
  .use(router)
  .use(vue3GoogleLogin, { clientId: CLIENT_ID })
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('default-layout', DefaultLayout)
  .component('empty-layout', EmptyLayout)
  .provide('emitter', emitter)
  .mount('#app');
