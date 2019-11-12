import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'moment'
import Swal from 'sweetalert2'

Vue.use(BootstrapVue)
Vue.prototype.moment = moment

Vue.mixin({
  methods: {
    next(err) {
      if (typeof err == 'string') {
        console.log(err)
        Swal.fire({
          title: 'Error!',
          text: err,
          icon: 'error'
        })
      } else {
        console.log(JSON.stringify(err, null, 2))
        if (Array.isArray(err)) {
          err.message = err.join('<br/>')
          console.log(err,"array errot type")
        }
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error'
        })
      }
    },
    successToast(message){
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'success',
        title: message
      })
    }
  }
})

// For Truncate
var filter = function(text, length, clamp){
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};
Vue.filter('truncate', filter);

new Vue ({
  router,
  render : h => h(App)
}).$mount('#app')