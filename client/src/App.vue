<template>
    <div>
      <login v-if="!isLogin" @changeLogin="changeLogin(true)" @showHome="changeLogin(false)"></login>
      <home v-else @showlogin="changeLogin(false)"></home>
    </div>
</template>

<script>
import login from './views/login'
import home from './views/home'

export default {
    components: {
        login,
        home
    },
    data() {
        return {
           isLogin : false 
        }
    },
    methods: {
      cekLogin() {
        if (localStorage.getItem('token')) {
          this.isLogin = true
        } else {
          this.isLogin = false
        }
      },
      changeLogin(status) {
        if (!status) {
          localStorage.removeItem('token')
        }
        console.log('masuk changelogin')
        this.isLogin = status
      },
    },
    created() {
      this.cekLogin()
    },
    watch : {
      isLogin() {}
    },
    // mounted() {
    //   this.cekLogin(),
    //   this.changeLogin(status)
    // }
}
</script>

<style>

</style>