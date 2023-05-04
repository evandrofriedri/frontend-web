import { createApp } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import router from './router';
import './index.css';
// eslint-disable-next-line import/no-relative-packages
import '../node_modules/nprogress/nprogress.css';
/* add icons to the library */
library.add(faUser, faBars, faXmark);

createApp(App)
  .use(router, VueSweetalert2)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
