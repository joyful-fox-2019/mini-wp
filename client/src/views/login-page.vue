<template>
  <div id="login-page">
        <div class="login-container d-flex flex-column justify-content-center align-items-center">
            <h1>NotWordPress</h1>
            <form @submit.prevent="login" class="d-flex flex-column justify-content-center align-items-center">
                <h3>Login</h3>
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
            <span @click="changePage" >Don't have account? register</span>
        </div>
    </div>
</template>

<script>
import axios from '../config/axios'

export default {
    name: 'login-page',
    data (){
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
            this.$emit('changePage', 'register')
        },
        login(){
            axios({
                method: 'post',
                url: '/users/login',
                data: {
                    email : this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                localStorage.setItem('token', data.token)
                this.$emit('changePage', 'home')
                this.$noty.info("Welcome to NotWordpress")
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
.login-container{
    width: 100%;
    height: 100vh;
    font-family: 'Poppins', sans-serif;
}

.login-container h1{
    font-family: 'Righteous', cursive;
}

.login-container form{
    width: 400px;
    height: 250px;
}

.login-container input{
    outline: none;
    width: 90%;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
}

.login-container input:last-child{
    background-color: rgba(187, 12, 231, 0.404);
    box-shadow: 10px 10px 38px -9px rgba(240,118,240,1);
}

.login-container input:not(:last-child){
    color: white;
    padding: 10px 10px;
    background-color: rgb(37, 37, 37);
    box-shadow: 10px 10px 38px -9px rgba(196,196,196,1);
}

.login-container span{
    font-size: 10px;  
    margin-top: 10px;
    cursor: pointer;
    transition: 300ms;
}

.login-container span:hover{
    color: blue;
}

.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  cursor: pointer;
}
</style>