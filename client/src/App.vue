<template>
<div>
  <LandingPage v-if="!isLogin" @loggedIn="loggedIn"></LandingPage>
  <HomePage v-else @logout="loggedOut" ></HomePage>
</div>
</template>

<script>
import LandingPage from './views/LandingPage'
import HomePage from './views/HomePage'
import axios from './config/axios'
export default {
  components: {
    LandingPage, HomePage
  },
  data() {
    name: 'App'
    return {
      isLogin: false
    }
  },
  methods: {
    loggedIn () {
      this.isLogin = true
      this.$router.push('/articles')
    },
    loggedOut () {
      localStorage.removeItem('token')
      this.isLogin = false
    },
    verifyToken () {
      axios({
        method: 'GET',
        url: '/users/verify',
        headers: {
          token : localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.loggedIn()
      })
      .catch(({ response }) => {
        this.$noty.error(response.data)
      })
    }
  },
  created () {
    if(localStorage.getItem('token')){
      this.verifyToken()
    }
  }
}
</script>

<style>

</style>