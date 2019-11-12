import Vue from 'vue';
import App from './App.vue';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import { LoaderPlugin } from 'vue-google-login';
import GSignInButton from 'vue-google-signin-button'
import VueQuill from 'vue-quill'

Vue.use(Buefy)
Vue.use(LoaderPlugin, {
  client_id: '910242603213-7er4umrrrnigsq9q4jve2drgcbl4avvm.apps.googleusercontent.com'
});
Vue.use(GSignInButton)
Vue.use(VueQuill)

new Vue(App).$mount('#app');