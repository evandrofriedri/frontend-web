import { createApp } from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueSweetalert2 from 'vue-sweetalert2';

import './index.css';
import mitt from 'mitt';
import App from './App.vue';
import router from './router';
import icons from './assets/icons';

// eslint-disable-next-line import/no-relative-packages
import '../node_modules/nprogress/nprogress.css';

import DefaultLayout from './layouts/DefaultLayout.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';

library.add({ ...icons });

const emitter = mitt();

createApp(App)
  .use(router, VueSweetalert2)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('default-layout', DefaultLayout)
  .component('empty-layout', EmptyLayout)
  .provide('emitter', emitter)
  .mount('#app');
