import Vue from 'vue';
import Swal from 'sweetalert2';
import VueRouter from "vue-router"
import routes from "./routes"
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'bulma/css/bulma.css'
import wysiwyg from "vue-wysiwyg";
import App from './App.vue';
import truncate from 'vue-truncate-collapsed';
import { LoaderPlugin } from 'vue-google-login';
import GSignInButton from 'vue-google-signin-button'





Vue.mixin({
  methods: {
    next(err) {
      if (typeof err == 'string') {
        return Swal.fire('', err, 'error')
      } else {
        if (Array.isArray(err.message)) {
          err.message = err.message.join('<br/>')
        }
        Swal.fire({
          title: '',
          html: err.message,
          type: 'error'
        })
      }
    }
  }
})

Vue.use(VueRouter)
Vue.use(Buefy)
Vue.use(wysiwyg)
Vue.use(truncate)
Vue.use(LoaderPlugin, {
  client_id: "855643906309-f81bj3grnf1qkfp46uov5g5utekmhp3p.apps.googleusercontent.com"
});
Vue.use(GSignInButton)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
