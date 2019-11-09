import Vue from 'vue';
import App from './App.vue'
import GSignInButton from 'vue-google-signin-button'

var filter = function(text, length, clamp){
    clamp = clamp || '...';
    var node = document.createElement('div');
    node.innerHTML = text;
    var content = node.textContent;
    return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);
Vue.use(GSignInButton)

new Vue(App).$mount('#app')

