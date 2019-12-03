<template>
   <div id="login-page" class="flex justify-center items-center">
     <div class="flex m-10 w-2/5 p-4 flex-wrap">
      <RegisterForm v-if="!toLogin" @goLogin="goLogin" ></RegisterForm>
      <LoginForm v-else @goRegister="goRegister" @loggedIn="loggedIn" ></LoginForm>
     </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
export default {
  components: {
    LoginForm, RegisterForm
  },
  data() {
    return {
      toLogin : true
    }
  },
  methods: {
    goRegister () {
      this.toLogin = false
    },
    goLogin () {
      this.toLogin = true
    },
    loggedIn () {
      this.$emit('loggedIn')
    }
  }
}
</script>

<style>

</style>