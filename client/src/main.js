import Vue from 'vue';

import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap-vue/dist/'
import { LoaderPlugin } from 'vue-google-login'

import VueSweetalert2 from 'vue-sweetalert2';
 
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
 
Vue.use(VueSweetalert2);


Vue.use(LoaderPlugin, {
    client_id: "907041340854-ma59s73mevnrp9vv6u2ohmfopln2gt0i.apps.googleusercontent.com"
});
Vue.use(BootstrapVue)
new Vue ({
    render: h => h(App)
}).$mount('#app')
