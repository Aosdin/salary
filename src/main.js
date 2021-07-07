import Vue from 'vue'
import App from './App.vue'
import store from './store'
import '@/misc/register-service-worker'
import '@/misc/handle-network-status'
import '@/misc/handle-apple-install-prompt'
import 'pwacompat'

/**
 * Plugin
 */
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
