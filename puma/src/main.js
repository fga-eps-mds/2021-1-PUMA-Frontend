import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import environment from '../src/config/environment';

Vue.config.productionTip = false
Vue.prototype.$http = Axios;
environment.configUser();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default Axios;