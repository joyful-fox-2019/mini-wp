<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Google
  </g-signin-button>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'

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
        client_id: '268889458312-kbk0br8l633kctie8utt8rto0kfkqg3n.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile() // etc etc
      let id_token = googleUser.Zi.id_token

      axios({
          method: "POST",
          url: "http://localhost:3000/users/googleSignIn",
          data: {
              token: id_token
          }
      })
        .then(({ data }) => {
            console.log(data)
            localStorage.setItem('token', data.token)
            Swal.fire({
                    icon: 'success',
                    title: `Login Successful, Welcome`,
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$emit("set-login")
        })
        .catch( err => {
            console.log(err);
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong..'
        })
        })

    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
      Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong..'
        })
    }
  }
}
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>