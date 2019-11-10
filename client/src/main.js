import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import GSignInButton from "vue-google-signin-button";
import VueQuillEditor from "vue-quill-editor";

// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

Vue.use(VueQuillEditor, /* { default global options } */);
Vue.use(Buefy);
Vue.use(GSignInButton);

new Vue({
    render: h => h(App)
}).$mount("#app");