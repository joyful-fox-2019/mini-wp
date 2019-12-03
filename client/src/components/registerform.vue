<template>
  <div class="card" style="border-radius:10px;">
    <section style="padding:10px;">
      <div class="title" style="display: flex; justify-content: center">Register</div>

      <b-field label="Username"
        :label-position="labelPosition"
        >
        <b-input
          placeholder="John" 
          icon="account"
          maxlength="30"
          v-model="username">
          </b-input>

      </b-field>

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
        v-model="password"
        ></b-input>
      </b-field>

      <div class="container" >
        <div style="display: flex; justify-content: center">
          <!-- <b-button @click.prevent="register" type="is-primary" id="register-btn">Register</b-button> -->
          <b-button @click.prevent="register" rounded type="is-info" outlined>Register</b-button>
          <b-button @click.prevent="login" rounded type="is-danger" outlined style="margin-left:20px;">Cancel</b-button>
          <!-- <b-button @click.prevent="register" type="is-primary" id="register-btn" style="margin-left:20px;">Cancel</b-button> -->
          <!-- <small><a href="#" @click.prevent="login" style="text-align:center;">← Back to login</a></small> -->
        </div>
      </div>
      <small style="display: flex; justify-content: center; margin-top:10px;">Already have account?<a href="#" @click.prevent="login" style="text-align:center;"> Login here.</a></small>
    </section>
  </div>
</template>

<script>
import axios from "../config/axios";
import Swal from "sweetalert2";

export default {
  name:'Registerform',
  data() {
    return {
      labelPosition: 'on-border',
      email: '',
      password: '',
      username: ''
    }
  },
  methods: {
    register() {
      axios({
        method: "POST",
        url: "/user/register",
        data: {
          email: this.email,
          name: this.username,
          password: this.password
        }
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        this.$emit("set-login");
        this.email = "";
        this.username = "";
        this.password = "";
        Swal.fire({
          type: 'success',
          title: 'Success!',
          text: 'Success Register'
        })
      })
      .catch(({response}) => {this.next(response.data)});
    },
    login() {
        this.$emit("set-page", false);
    }
  }
}
</script>

<style>

</style>