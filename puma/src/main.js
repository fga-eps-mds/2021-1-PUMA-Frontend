import Vue from 'vue';
import axios from 'axios';
import dotenv from 'dotenv';
import App from './App.vue';
import router from './router';
import store from './store';
import environment from './config/environment';

dotenv.config();

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
environment.configUser();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export default axios;
