import Vue from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";

import { LoaderPlugin } from 'vue-google-login';
import GSignInButton from 'vue-google-signin-button'

Vue.config.productionTip = false

Vue.use(LoaderPlugin, {
  client_id: '835988076186-0o5h8715je7p6amc2vg6v1qrigubhin4.apps.googleusercontent.com'
});
Vue.use(GSignInButton)

Vue.use(wysiwyg, {});
Vue.use(BootstrapVue)


new Vue({
  render: h => h(App),
}).$mount('#app')

