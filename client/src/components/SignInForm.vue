<template>
  <transition id="sign-in-form" name="bounce">
      <!-- v-show="signInFormActive" -->
      <div id="login-page" class="row">
        <div class="col card-panel">
          <form class="login-form">
            <div class="row"></div>

            <div class="row">
              <div class="top input-field col s12">
                <i class="material-icons prefix">mail_outline</i>

                <input    
                  v-model="email"
                  class="validate"
                  id="email"
                  type="email" />
                <label for="email" data-error="wrong" data-success="right">Email</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">lock_outline</i>

                <input 
                  v-model="password"
                  id="password" 
                  type="password" />
                <label for="password">Password</label>
              </div>
            </div>

            <div class="sign-in-buttons">
              <div class="row">

                <div class="input-field">

                  <a 
                    @click="login"
                    href="#" 
                    class="btn waves-effect waves-light col s12">Sign in</a>
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
  name: 'sign-in-form',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function() {
      axios({
        method: 'post',
        url: process.env.HOST_SERVER + '/users/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({data}) => {
          console.log("ini data di sign in form", data);
          this.$emit('check-token')
          localStorage.setItem("access_token", data.access_token)
          M.toast({html: data.message})
        })
        .catch(err => {
          M.toast({html: err.response.data.messages[0]})
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