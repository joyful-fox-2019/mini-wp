<template>
  <div class="container" style="min-height: 87vh">
    <form style="padding-top: 18vh" @submit.prevent="register()">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" placeholder="Enter name" v-model="name">
      </div>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control" placeholder="Enter email" v-model="email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" placeholder="*******" v-model="password">
      </div>
      <div class="d-flex">
        <button type="submit" class="btn btn-primary m-2">Register</button>
      </div>
      <div>
        <a href="" @click.prevent="toLogin()">
          i already have an account
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import axiosNpm from '../config/axios'
export default {
  data(){
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    toLogin(){
      this.$router.push('/login')
    },
    register(){
      axiosNpm({
        url: '/users/register',
        method: 'post',
        data:{
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data })=>{
          return axiosNpm({
            url: '/users/login',
            method: 'post',
            data: {
              email: data.email,
              password: this.password
            }
          })
        })
        .then(({ data })=>{
          console.log(data)
          this.$router.push('/')
          localStorage.setItem('token', data.token)
          this.$emit('changeLogin', true)
        })
        .catch(err=>{
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>