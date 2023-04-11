import { createApp } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import router from './router';
import './index.css';

/* add icons to the library */
library.add(faBars);

createApp(App)
  .use(router, VueSweetalert2)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
