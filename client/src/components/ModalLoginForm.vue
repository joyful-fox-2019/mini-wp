<template>
  <div>
    <b-button class="square" @click="loginTab">
        Sign In
    </b-button>
    <b-button class="square" @click="registerTab">
        Sign Up
    </b-button>
    <div class="modal-card square" style="width: 30rem">
          <header class="modal-card-head square" >
              <p class="modal-card-title">{{type}}</p>
          </header>
          <section class="modal-card-body">
            <!-- loginForm -->
        <div v-show="loginForm">
          <form @submit.prevent="loginUser">
            <b-field label="Email">
                <b-input
                    type="email"
                    v-model='email'
                    placeholder="Your email"
                    required>
                </b-input>
            </b-field>
            <b-field label="Password">
                <b-input
                    type="password"
                    v-model='password'
                    password-reveal
                    placeholder="Your password"
                    required>
                </b-input>
            </b-field>
              <b-message type="is-danger" size="is-small" has-icon :auto-close="isActive" :duration="err.duration" :active.sync="isActive">
                  {{ err.message }}
              </b-message>
            <!-- <button class="button" type="button" @click="$parent.close()">Close</button> -->
            <button class="button is-primary" type="submit">Login</button>
          </form>
        </div> 
        <!-- register Form -->
        <div v-show="!loginForm">
          <form @submit.prevent="registerUser">
            <b-field label="Username">
              <b-input
                v-model="usernameRegister"
                type="text"
                placeholder="Your username"
                required>
              </b-input>  
            </b-field>
            <b-field label="Email">
                <b-input
                    type="email"
                    v-model='emailRegister'
                    placeholder="Your email"
                    required>
                </b-input>
            </b-field>
            <b-field label="Password">
                <b-input
                    type="password"
                    v-model='passwordRegister'
                    password-reveal
                    placeholder="Your password"
                    required>
                </b-input>
            </b-field>
              <b-message type="is-danger" size="is-small" has-icon :auto-close="isActive" :duration="err.duration" :active.sync="isActive">
                  {{ err.message }}
              </b-message>
            <!-- <button class="button" type="button" @click="$parent.close()">Close</button> -->
            <button class="button is-primary" type="submit">Sign Up</button>
          </form>
        </div> 
        <!-- <br> -->
          or
          <br>
        <b-button icon-left="google"  class="square" @click="oauthGoogle">
            Sign in using Google
        </b-button>
       <b-button icon-left="github-box"  class="square">
            <a href="https://github.com/login/oauth/authorize?client_id=9c5162d6a0cb6566526e&scope=user">
            Sign in using Github
            </a>
        </b-button>
      </section>
    </div>
  </div>
</template>

<script>
import axios from '../../config/axios'

export default {
  name : "ModalLoginForm",
  props : ['tab'],
  data(){
    return {
      email : '',
      password : '',
      emailRegister : '',
      passwordRegister : '',
      usernameRegister : '',
      err : {
        message : '',
        duration: 5000
      },
      isActive : false,
      type : "Sign In",
      loginForm : true,
      googleSignInParams: {
        client_id: '349672121477-hflgrrs8fv8l7ucqfjg8skvtccjm4pgo.apps.googleusercontent.com'
      }
      
    }
  },
  methods : {
    loginUser(){
      axios({
        method: 'post',
        url : '/users/login',
        data : {
          email : this.email,
          password : this.password,
        }
      })
        .then(({ data })=>{
          localStorage.setItem('token',data.token)
          this.$emit('gotuser')
          this.$parent.close()
          this.$buefy.toast.open({
                    message: 'Welcome Back!',
                    type: 'is-success'
                })
        })
        .catch((error)=>{
          this.isActive = true
          this.err.message = error.response.data.message
        })
    },
    registerUser(){
      axios({
        method: 'post',
        url : '/users/register',
        data : {
          username : this.usernameRegister,
          email : this.emailRegister,
          password : this.passwordRegister,
        }
      })
        .then(({ data })=>{
          localStorage.setItem('token',data.token)
          this.$emit('gotuser')
          this.$parent.close()
          this.$buefy.toast.open({
                    message: 'Welcome!',
                    type: 'is-success'
                })
        })
        .catch((error)=>{
          this.isActive = true
          this.err.message = error.response.data.message
        })
    },
    loginTab(){
      this.loginForm = true
      this.type = "Sign In"
    },
    registerTab(){
      this.loginForm = false
      this.type = "Sign Up"
    },
    oauthGoogle(){
      this.$gAuth.signIn()
      .then(GoogleUser => {
        this.isSignIn = this.$gAuth.isAuthorized
        let id_token = GoogleUser.getAuthResponse().id_token
        // let profile = GoogleUser.getBasicProfile()
        axios({
          url : '/users/login/google',
          method : 'post',
          data : {
            id_token
          }
        })
        .then(({ data })=>{
          localStorage.setItem('token',data.token)
           this.$emit('gotuser')
          this.$parent.close()
          this.$buefy.toast.open({
                    message: 'Welcome!',
                    type: 'is-success'
                })
        })
        .catch(err=>{
        console.log(err.response.data.message)
        this.$buefy.toast.open({
                    duration: 4000,
                    message: `${err.response.data.message}`,
                    type: 'is-danger'
                })
        })
      })
      .catch(err=>{
        console.log(err)
      })
    },
    logout(){
      this.$gAuth.signOut()
        .then(() => {
          console.log('user signed out');
          // things to do when sign-out succeeds
        })
        .catch(error  => {
          console.log(error);
          // things to do when sign-out fails
        })
    }
  },
  watch : {
    tab(val){
      if(val === 'login'){
        this.loginForm = true
      } else {
        this.loginForm = false
      }
    }
  }

}
</script>

<style>
.modal-card-body{
  display: flex;
  flex-direction: column
}
.square{
  border-radius: 0 !important
}

</style>