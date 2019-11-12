<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    <i class="fab fa-google"></i>&nbsp;&nbsp;&nbsp;Sign in with Google
  </g-signin-button>
</template>
 
<script>
import axios from '../../helpers/axios'

export default {
  data () {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object} 
       */
      googleSignInParams: {
        client_id: '862210012752-1kbbk8gllgp86463pi5sp8m5apa6ntgo.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile() // etc etc
      const firstName = profile.ofa
      const lastName = profile.wea
      var id_token = googleUser.getAuthResponse().id_token;
      console.log(id_token)
      axios.post('users/g-signin', {
        id_token,
        firstName,
        lastName
      })
        .then(({data}) => {
          console.log(data)
          localStorage.setItem('_id', data._id)
          localStorage.setItem('email', data.email)
          localStorage.setItem('access_token', data.access_token)
          this.$router.push('/')
          this.$emit('login')
        })
        .catch(err => {
          this.$emit('alert', err)
        })
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    }
  }
}
</script> 
 
<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #2F2D41;
  color: var(--primary-color);
  box-shadow: 0 3px 0 #525360;
}
</style> 