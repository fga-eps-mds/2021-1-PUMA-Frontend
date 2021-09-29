import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';
import {BootstrapVue, IconsPlugin} from "bootstrap-vue"
Vue.config.productionTip = false

Vue.prototype.$http = Axios;


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


export default axios;
