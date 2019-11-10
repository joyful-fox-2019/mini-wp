<template>
  <div id="google-sign-in-button">
    <button 
      class="btn waves-effect waves-light white col s12 valign-wrapper"
      v-google-signin-button="clientId">
      <img id="google-icon" 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png" 
        alt="google-icon">
      Continue with Google
    </button>
  </div>
</template>

<script>
import GoogleSignInButton from 'vue-google-signin-button-directive'
import axios from 'axios'

export default {
  name: 'google-sign-in-button',
  directives: {
    GoogleSignInButton
  },
  data: () => ({
    clientId: process.env.GOOGLE_CLIENT_ID
  }),
  methods: {
    OnGoogleAuthSuccess (idToken) {
      axios({
        method: 'post',
        url: process.env.HOST_SERVER + '/users/googleSignIn',
        headers: {
          googleidtoken: idToken
        }
      })
        .then(({data}) => {
          console.log("ini data di google auth", data)
          localStorage.setItem('access_token', data.access_token)
          this.$emit('check-token')
          M.toast({html: data.message})
        })
        .catch(err => {
          console.log(err)
          M.toast({html: JSON.stringify(err.response.data.messages[0])})
        })
    },
    OnGoogleAuthFail (error) {
      M.toast({html: JSON.stringify(error)})
    }
  }
}
</script>

<style scoped>
  .btn {
    color: grey;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #google-icon {
    height: 20px;
    width: 20px;
    margin-right: 10px; 
  }
</style>