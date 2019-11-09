import Vue from 'vue';
import { LoaderPlugin } from 'vue-google-login';
import GSignInButton from 'vue-google-signin-button'
import VueQuill from 'vue-quill'
 

import App from './App.vue';

// impor buefy
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import SocialSharing from 'vue-social-sharing'
 

Vue.use(SocialSharing);
Vue.use(Buefy)
Vue.use(LoaderPlugin, {
    client_id: "472366340893-1d0sajo3etaeietgu9c3f7t28iq6a4cb.apps.googleusercontent.com"
});
Vue.use(GSignInButton)
Vue.use(VueQuill)


new Vue(App).$mount('#app');

