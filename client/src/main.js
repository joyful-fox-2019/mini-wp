import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import GSignInButton from 'vue-google-signin-button'
import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css"

import jQuery from 'jquery'
import 'bootstrap'

import 'bootstrap/dist/css/bootstrap.css'
global.jQuery = jQuery
global.$ = jQuery

Vue.config.productionTip = false

Vue.use(wysiwyg, {});
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2);
Vue.use(GSignInButton)

new Vue({
  render: h => h(App),
}).$mount('#app')