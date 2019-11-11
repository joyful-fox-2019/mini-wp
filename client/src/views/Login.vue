<template>
  <div class="container" style="min-height: 87vh">
    <form style="padding-top: 18vh" @submit.prevent="login()">
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control" placeholder="Enter email" v-model="email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" placeholder="*******" v-model="password">
      </div>
      <div class="d-flex">
        <button type="submit" class="btn btn-primary m-2">Login</button>
        <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" class="m-2"></GoogleLogin>
      </div>
      <div>
        <a href="" @click.prevent="toRegister()">
          i don't have an account
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import axiosNpm from '../config/axios'

export default {
  data(){
    return {
      params: {
          client_id: "1064661640914-1aefku5io65dqkgj9tm0u0dmjumidkvk.apps.googleusercontent.com"
      },
      renderParams: {
          width: 250,
          height: 50,
          longtitle: true
      },
      email: '',
      password: ''
    }
  },
  methods: {
    onSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token
      axiosNpm({
        url: '/users/goauth',
        method: 'post',
        data: {
          id_token
        }
      })
        .then(({ data })=>{
          localStorage.setItem('token', data.token)
          this.$router.push('/')
          this.$emit('changeLogin', true)
        })
        .catch(err=>{
          console.log(err)
          
        })
    },
    login(){
      axiosNpm({
        url: '/users/login',
        method: 'post',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data })=>{
          localStorage.setItem('token', data.token)
          this.$router.push('/')
          this.$emit('changeLogin', true)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    toRegister(){
      this.$router.push('/register')
    }
  },
  components: {
    GoogleLogin
  }
}
</script>

<style>

</style>