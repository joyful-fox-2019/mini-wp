import Vue from 'vue'
import App from './App.vue'
import '../tailwind.css'
import '../style.css'
import router from './router'
import VueQuillEditor from 'vue-quill-editor'
import VueNoty from 'vuejs-noty'
import VuejsDialog from 'vuejs-dialog';

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'vuejs-noty/dist/vuejs-noty.css'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

Vue.use(VueQuillEditor)
Vue.use(VueNoty, {
  timeout: 4000,
  progressBar: true,
  layout: 'topRight'
})
Vue.use(VuejsDialog)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')