<template>
  <div class="card" style="border-radius:10px;">
    <section style="padding:10px;">
      <div class="title" style="display: flex; justify-content: center">Login</div>

      <b-field label="Email"
        :label-position="labelPosition"
        >
        <b-input 
          placeholder="john@gmail.com"
          icon="email" 
          type="email"
          maxlength="30"
          v-model="email">
        </b-input>
      </b-field>

      <b-field label="Password"
        :label-position="labelPosition"
        >
        <b-input
        placeholder="******"
        icon="key" 
        type="password" 
        maxlength="30"
        v-model="password"></b-input>
      </b-field>

      <div class="container" >
        <div style="display: flex; justify-content: center">
          <!-- <b-button @click.prevent="register" type="is-primary" id="register-btn">Register</b-button> -->
          <b-button @click.prevent="login" expanded rounded type="is-info" outlined>Login</b-button>
          <!-- <b-button @click.prevent="register" rounded type="is-danger" outlined style="margin-left:20px;">Cancel</b-button> -->
          <!-- <small><a href="#" @click.prevent="login" style="text-align:center;">← Back to login</a></small> -->
        </div>
            <b-button expanded round class="g-button"
              :params="googleSignInParams"
              @success="onSignInSuccess"
              @error="onSignInError">
              Sign in with Google
            </b-button>
      </div>
      <small style="display: flex; justify-content: center; margin-top:10px;">Dont have an account?<a href="#" @click.prevent="register" style="text-align:center;"> Register here.</a></small>
    </section>
  </div>
</template>

<script>
import axios from '../config/axios';
import Swal from "sweetalert2";

export default {
  name:'Loginform',
  data() {
    return {
      labelPosition: 'on-border',
      email: '',
      password:'',
      googleSignInParams: {
        client_id: '855643906309-f81bj3grnf1qkfp46uov5g5utekmhp3p.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    login(){
      axios({
        method: "POST",
        url: "/user/login",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.username);
          this.$emit("set-login");
          this.email = "";
          this.password = "";
          Swal.fire({
            type: 'success',
            title: 'Success!',
            text: 'Success Login',
          })
        })
        .catch(({response}) => {this.next(response.data)});
    },
    register() {
      this.$emit("set-page", true);
    },
    onSignInSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token
      
      axios({
        url : '/user/google',
        method : 'POST',
        data : {
          token: id_token
        }
      })
          .then(({data})=>{
            localStorage.setItem('token',data.token)
            localStorage.setItem('username',data.username)
            this.$emit("set-login-google");
            Swal.fire({
              type: 'success',
              title: 'Success!',
              text: 'Success Login',
            })
          })
          .catch(({response})=>{
            this.next(response.data)
          })
        },
        onSignInError() {
          this.next('error login google')
        }
  }
}
</script>

<style>
  .g-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  margin-top: 5px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>