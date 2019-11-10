import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vDialogs from 'v-dialogs'

Vue.use(BootstrapVue)
Vue.use(vDialogs, {
    language: 'en'
})


new Vue({
    render: h => h(App),
}).$mount('#app')