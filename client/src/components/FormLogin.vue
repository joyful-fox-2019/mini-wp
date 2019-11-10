<template>
  <div class="card">
    <!-- <h5 class="card-header">Mini Wordpress</h5> -->
      <div class="card-body">
        <h5 class="card-title">Do you have an account?</h5>
        <p class="card-text">Meet your friends and share what you want ! Create your account now !</p>
        <a href="#" class="btn btn-success" v-on:click.prevent="showSignup">Go Sign Up</a>
        <div class="form-layout">
        <form v-on:submit.prevent="login">
          <h3>Login</h3>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input v-model="emailLog" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ex: example@mail.com">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="passwordLog" type="password" class="form-control" id="exampleInputPassword1" placeholder="Ex: Password123">
          </div>
          <button type="submit" class="btn btn-warning"><span class="login">Login</span></button>
        </form>
        </div>
      </div>
  </div>
</template>
<script>

import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    data(){
        return {
            emailLog: "",
            passwordLog: "",
            baseURL: "http://localhost:3000"
        }
    },
    methods:{
      login(){
          Swal.showLoading()
          axios({
            url: `${this.baseURL}/users/login`,
            method: 'POST',
            data:{
              email: this.emailLog,
              password: this.passwordLog
            }
          })
          .then(response => {
            let data = response.data;
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);
            localStorage.setItem('image', data.image);
            Swal.close()
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "User logged in!"
            });
            this.showMainPage()
            this.emailLog = ""
            this.passwordLog = ""
          })
          .catch(err => {
            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: `${err.response.data.message}`
            });
            this.emailLog = ""
            this.passwordLog = ""
          })
      },
      showSignup(){
        this.$emit('show-signup')
      },
      showMainPage(){
        this.$emit('show-mainpage')
      }
    }
}
</script>
<style scoped>
.card{
  border: none;
}

.form-layout{
  margin-top: 10%;
}

.btn{
  border-radius: 25px;
}

.card-header{
  background-color: white;
  border: none
}

.login{
  padding: 0px 20px;
}
</style>