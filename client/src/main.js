import Vue from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'

Vue.config.productionTip = false

Vue.use(axios)
Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')