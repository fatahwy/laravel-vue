import './bootstrap';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App';
import store from "./store/index";
import router from './router';

Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios);

axios.defaults.baseURL = window.location.origin;
  
const app = new Vue(Vue.util.extend({router, store}, App)).$mount("#app");