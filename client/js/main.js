import Vue from 'vue'
import App from '../src/App.vue'
import GSignInButton from 'vue-google-signin-button'
import VueMoment from 'vue-moment'

Vue.use(GSignInButton)
Vue.use(VueMoment);

const vm = new Vue({
  render: create => create(App)
}).$mount('#app')