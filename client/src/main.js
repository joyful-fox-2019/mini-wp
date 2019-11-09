import Vue from 'vue';
import App from './App.vue';
import VueQuillEditor from 'vue-quill-editor'
import VueNoty from 'vuejs-noty'
import GSignInButton from 'vue-google-signin-button'

Vue.use(VueNoty, {
  timeout: 4000,
  progressBar: true,
  layout: 'topRight',
})

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'vuejs-noty/dist/vuejs-noty.css'

Vue.use(VueQuillEditor)
Vue.use(GSignInButton)


new Vue({
  render: h => h(App),
}).$mount('#app');