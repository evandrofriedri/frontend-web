import { createApp } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import router from './router';
import './index.css';

createApp(App).use(router, VueSweetalert2).mount('#app');
