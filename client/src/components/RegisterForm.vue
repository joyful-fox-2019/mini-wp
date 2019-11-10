<template>
  <transition id='register-form' name="bounce">
      <div id="register-page" class="row">
        <div class="col card-panel">
          <form class="login-form">
            <div class="row"></div>
            <div class="row">
              <div class="top input-field col s12">
                <i class="material-icons prefix">account_circle</i>

                <input 
                  v-model="name"
                  class="validate" id="register-name" 
                  type="text" />

                  <label for="email" data-error="wrong" data-success="right">Name</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">mail_outline</i>

                <input 
                  v-model="email"
                  class="validate" id="register-email" 
                  type="email" />

                  <label for="email" data-error="wrong" data-success="right">Email</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">lock_outline</i>

                <!--  -->
                <input 
                  v-model="password"
                  id="register-password" type="password" />

                  <label for="password">Password</label>
              </div>
            </div>
            <div class="sign-in-buttons">
              <div class="row">

                <div class="input-field">
                  <a
                    @click="register"
                    href="#"
                    class="btn waves-effect waves-light col s12">
                    Register</a>
                </div>

                <p>- OR -</p>

                <GoogleSignInButton></GoogleSignInButton>

              </div>
            </div>
          </form>
        </div>
      </div>
    </transition>
</template>

<script>
import GoogleSignInButton from './GoogleSignInButton'
import axios from 'axios'

export default {
  name: 'register-form',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register: function() {
      console.log("ini env host server", process.env.HOST_SERVER);
      
      axios({
        method: 'post',
        url: process.env.HOST_SERVER + '/users/register',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
      .then(({data}) => {
        console.log("ini response di register", data);
        localStorage.setItem('access_token', data.access_token)
        this.$emit('check-token')
        M.toast({html: data.message})
      })
      .catch(err => {
        // console.log("ini err di register", err)
        M.toast({html: JSON.stringify(err.response.data.messages[0])})
      })
    }
  },
  components: {
    GoogleSignInButton
  }
}
</script>

<style>
</style>