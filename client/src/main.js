import Vue from 'vue'
import App from '../src/App.vue'
import Buefy from 'buefy'
import router from './router'
import 'buefy/dist/buefy.css'
import 'bulma/css/bulma.css'
import wysiwyg from "vue-wysiwyg";
import GSignInButton from 'vue-google-signin-button'
import Swal from 'sweetalert2'
import VueCrontab from 'vue-crontab'


Vue.use(GSignInButton)
Vue.use(Buefy)
Vue.use(wysiwyg)
Vue.use(VueCrontab)
new Vue({
  router,
  Swal,
  render: h => h(App)
}).$mount('#app')