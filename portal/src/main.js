import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import ElementUI from 'element-ui'
import VCharts from 'v-charts'

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)

new Vue({
  router,
  store,
  apolloProvider: createProvider({
    httpEndpoint: 'http://localhost:3000/graphql',
    wsEndpoint: 'ws://localhost:3000/subscriptions',
    tokenName: '1111',
    getAuth: (data) => data
  }),
  render: h => h(App)
}).$mount('#app')
