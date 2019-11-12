import Vue from 'vue';
import App from './App.vue';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import wysiwyg from "vue-wysiwyg";
import "../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";
import GSignInButton from 'vue-google-signin-button'

new Vue({
  render: h => h(App),
}).$mount('#app');


Vue.use(Buefy)

Vue.use(wysiwyg, {});

Vue.use(GSignInButton)
