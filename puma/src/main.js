import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';

import ModalDetalhamentoProjeto from './views/modal-detalhamento-projeto';
import BaseButton from "./views/BaseButton";

import environment from './config/environment';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
environment.configUser();

Vue.component('modal-detalhamento-projeto', ModalDetalhamentoProjeto);
Vue.component('base-button', BaseButton);


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export default axios;

