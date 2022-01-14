import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Lng from './lng'
import App from './App.vue'
import "css-container-queries"

Vue.config.productionTip = false

// Загрузка спрайта иконок
const req = require.context('./assets/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);

// Берем клиентский конфиг приложения из массива конфигов или объекта
// Конфиг помещаем в свойство Vue для доступа в любом месте
window.__KV_CONFIG = window.__KV_CONFIG || {};
if (Array.isArray(window.__KV_CONFIG )) {
  Vue.prototype.$__KV_CONFIG = window.__KV_CONFIG.shift()
} else if (typeof window.__KV_CONFIG === 'object') {
  Vue.prototype.$__KV_CONFIG = window.__KV_CONFIG
}

//Vue.prototype.$__KV_CONFIG.elementId = Vue.prototype.$__KV_CONFIG.elementId || 'kt-visa-app'

Vue.use(Vuelidate)
Vue.use(Lng, Vue.prototype.$__KV_CONFIG.lng || "ge")

new Vue({
  //store,
  render: h => h(App)
}).$mount(`#${Vue.prototype.$__KV_CONFIG.elementId}`)
