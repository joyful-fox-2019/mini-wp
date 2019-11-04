import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import wysiwyg from "vue-wysiwyg"
import "../node_modules/vue-wysiwyg/dist/vueWysiwyg.css"

Vue.use(Buefy)
Vue.use(wysiwyg, {});

new Vue(App).$mount('#app');