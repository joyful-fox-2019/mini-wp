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
      <button type="button" class="bg-gray-200 rounded cursor-pointer p-2 mx-2 g-signin2" @click.prevent="onSignin" data-onsuccess="onSignIn">Google</button>
    </div>
  </form>
</template>

<script>
import axios from '../config/axios'
export default {
  data() {
    return {
      email: '',
      password: ''
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
      axios({
        method: 'POST',
        url: `/users/glogin`,
        data: {
          id_token
      }
      .then(({ data }) => {
        this.$noty.success(data.message)
        localStorage.setItem('token', data.token)
        this.$emit('loggedIn')
        
      })
      .catch(({ response }) => {
        this.$noty.error(response.data.message)
      })
    })
    }
  },
}
</script>

<style>

</style>