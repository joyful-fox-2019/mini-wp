import Vue from 'vue';
import Vuex from 'vuex'
import Vueditor from 'vueditor'
import App from './App.vue';

import 'vueditor/dist/style/vueditor.min.css'
let config = {
    toolbar: [
        'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
        'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
        'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
        'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'tables', '|', 'switchView'
    ],
    fontName: [{
            val: 'arial black'
        },
        {
            val: 'times new roman'
        },
        {
            val: 'Courier New'
        }
    ],
    fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
    uploadUrl: ''
};

Vue.use(Vuex);
Vue.use(Vueditor, config);

let parent = new Vue({
    render: h => h(App),
}).$mount('#app');

// let editor = parent.$children[0];
// editor.setContent('your content here');
// editor.getContent();