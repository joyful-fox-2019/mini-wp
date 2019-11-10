<template>
  <div>
    <AuthPage v-if=" page === 'auth'  " @setPage="setPage" ></AuthPage>
    <MainPage v-if="page === 'main' " @setPage="setPage" ></MainPage>
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
      page : 'auth'

    }
  },
  methods : {
    setPage(page) {
      console.log(`masuk page di app.vue`);
      this.page = page
    }
  },
  components : {
    AuthPage,
    MainPage
  },
  created() {
    if (localStorage.getItem('token')) {
      this.page = 'main'
    }
  }
}
</script>

<style scoped>

</style>