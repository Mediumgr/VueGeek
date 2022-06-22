import Vue from 'vue'
import App from './App.vue'
import dateFilter from '@/filters/date.filter'

Vue.config.productionTip = false

import context from './plugins/ContextMenu'
import modal from './plugins/ModalWindow'
import store from './store'
import router from './router'

Vue.use(context)
Vue.use(modal)
Vue.filter('date', dateFilter)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')