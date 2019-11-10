import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import VueQuill from 'vue-quill'
import routes from './router'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueQuill)

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
