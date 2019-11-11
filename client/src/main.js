import Vue from 'vue';
import App from './App.vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import GSignInButton from "vue-google-signin-button"
import { ToastProgrammatic as Toast } from "buefy";


Vue.use(Buefy)
Vue.use(GSignInButton)

Vue.mixin({
    methods: {
        toast() {
            this.$buefy.toast.open('success')
        },
        success() {
            this.$buefy.toast.open({
                message: 'Something happened correctly!',
                type: 'is-success'
            })
        },
        danger(err) {
            if (typeof err === "string") {
                return this.$buefy.toast.open({
                    duration: 2000,
                    message: err,
                    position: 'is-center',
                    type: 'is-danger'
                })
            } else if (Array.isArray(err.message)) {
                err.message = err.message.join('<br/>')
                this.$buefy.toast.open({
                    duration: 2000,
                    message: err.message,
                    position: 'is-center',
                    type: 'is-danger'
                })
            }


        }
    }
})
new Vue(App).$mount("#app")
