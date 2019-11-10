<template>
  <div id="register-page">
        <publicNavbar @changePage="$emit('changePage', $event)" ></publicNavbar>
        <div class="login-container d-flex flex-column justify-content-center align-items-center">
            <h1>NotWordPress</h1>
            <form @submit.prevent="register" class="d-flex flex-column justify-content-center align-items-center">
                <h3>Register</h3>
                <input v-model="email" type="text" placeholder="Enter Email">
                <input v-model="password" type="password" placeholder="Enter Password">
                <input class="btn btn-info" type="submit">
            </form>
            <h3>or</h3>
                <g-signin-button
                    :params="googleSignInParams"
                    @success="onSignInSuccess"
                    @error="onSignInError">
                    Sign in with Google
                </g-signin-button>
            <span @click="changePage" >Already have account? login</span>
        </div>
    </div>
</template>

<script>
import axios from '../config/axios'
import publicNavbar from '../components/public-navbar'
export default {
    name: 'register-page',
    components: {
        publicNavbar
    },
    data(){
        return {
            email: '',
            password: '',
            googleSignInParams: {
                client_id: '968620734708-j37uh5edi8sd8lv3jf52kirgfeqjp086.apps.googleusercontent.com'
            }
        }
    },
    methods: {
        changePage(){
            this.$emit('changePage', 'login')
        },
        register(){
            axios({
                method: 'post',
                url: '/users/register',
                data: {
                    email : this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                this.changePage()
                this.$noty.info("Success Register, Please Login to continue")
            })
            .catch(({ response }) => {
                this.$noty.error(response.data.message)
            })
            .finally(()=>{
                this.email = ''
                this.password = ''
            })
        },
        onSignInSuccess(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;
            axios({
                method: "post",
                url: `/users/googleLogin`,
                data: {
                    id_token
                }
            })
            .then(({ data }) => {
                localStorage.setItem('token', data.token)
                this.$emit('changePage', 'home')
                this.$noty.info("Welcome to NotWordpress")
            })
            .catch(({ response }) => {
                this.$noty.error(response.data.message)
            })
        },
        onSignInError (error) {
        // `error` contains any error occurred.
        console.log('OH NOES', error)
        }
    }
}
</script>

<style>

</style>