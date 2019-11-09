<template>
  <div>
    <AuthPage v-if="!isLogin" @setIsLogin="setIsLogin" ></AuthPage>
    <MainPage v-if="isLogin"></MainPage>
  </div>
</template>

<script>
import AuthPage from "./views/AuthPage"
import MainPage from "./views/MainPage"

export default {
  name: 'App',
  data() {
    return {
      message : `Hello world`,
      isLogin : false

    }
  },
  methods : {
    setIsLogin(status) {
      this.isLogin = status
    }
  },
  components : {
    AuthPage,
    MainPage
  }
}
</script>

<style scoped>

</style>