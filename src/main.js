import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import App from './App.vue'
import store from './store'

import ElementQueries from "css-element-queries/src/ElementQueries"
ElementQueries.listen();

const req = require.context('./assets/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#kv-app')
