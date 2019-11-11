<template>
  <form @submit.prevent="login" id="login-form" class="flex flex-wrap bg-white shadow-2xl rounded p-10 justify-center">
    <div class="w-full"><h1 style="text-align: center;">Login into WordRide</h1></div>
    <div class="w-full"><h4 style="text-align: center;">Or <span class="hover:text-blue-500 cursor-pointer" style="text-decoration: underline;" @click="goRegister">create Account</span></h4></div>
    <input v-model="email" type="email" class="p-2 mx-4 mt-10 w-3/4" placeholder="Email Address">
    <input v-model="password" type="password" class="p-2 mx-4 my-4 w-3/4" placeholder="Password">
    <div class="w-3/4 flex justify-center my-2">
      <input id="login-btn" type="submit" class="p-2 rounded cursor-pointer hover:bg-gray-600 bg-gray-400 text-white w-full" value="Login">
    </div>
    <div class="flex flex-wrap justify-center w-3/4 m-4">
      <h4 style="display: block; width: 100%; text-align: center; margin-bottom: 20px;">Or continue with</h4>
      <!-- <button type="button" class="bg-gray-200 rounded cursor-pointer p-2 mx-2 g-signin2" @click.prevent="onSignin" data-onsuccess="onSignIn">Google</button> -->
      <g-signin-button
    :params="googleSignInParams"
    @success="onSignIn"
    @error="onSignInError">
    Sign in with Google
  </g-signin-button>
    </div>
  </form>
</template>

<script>
import axios from '../config/axios'
export default {
  data() {
    return {
      email: '',
      password: '',
      googleSignInParams: {
        client_id: '787337526653-vfj255cc58soapb885s5ug7rqeb6aboh.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    goRegister() {
      this.$emit('goRegister')
    },
    login () {
      const email = this.email
      const password = this.password
      
      axios({
        method: 'POST',
        url: `/users/login`,
        data: { email, password }
      })
      .then(({ data }) => {
        this.$noty.success(data.message)
        localStorage.setItem('token', data.token)
        this.$emit('loggedIn')
      })
      .catch(({ response }) => {
        this.$noty.error(response.data.message)
      })
    },
    onSignIn (googleUser) {
        var id_token = googleUser.getAuthResponse().id_token;
        // console.log(id_token, 'MASUK');
      axios({
        method: 'POST',
        url: `/users/glogin`,
        data: { id_token }
      })
      .then(({ data }) => {
        // console.log('masuk ');
        this.$noty.success(data.message)
        localStorage.setItem('token', data.token)
        this.$emit('loggedIn')
        
      })
      .catch(({ response }) => {
        this.$noty.error(response.data.message)
      })
    },
    onSignInError () {
      console.log('Error');
    }
  },
}
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #dfe3e9;
  color: rgb(56, 55, 55);
  cursor: pointer;
  /* box-shadow: 0 3px 0 #0f69ff; */
}
.g-signin-button:hover{
  background-color: rgb(255, 148, 148)
}
</style>