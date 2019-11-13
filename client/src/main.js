import Vue from 'vue';
import App from './App.vue';


let parent = new Vue({
    render: h => h(App),
}).$mount('#app');

// let editor = parent.$children[0];
// editor.setContent('your content here');
// editor.getContent();