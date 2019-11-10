import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import GSignInButton from 'vue-google-signin-button'
import GAuth from 'vue-google-oauth2';

Vue.use(Buefy)
const gauthOption = {
  clientId: `349672121477-hflgrrs8fv8l7ucqfjg8skvtccjm4pgo.apps.googleusercontent.com`,
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
// Vue.use(GSignInButton)
// new Vue(App).$mount('#app')

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')