<template>
  <div>
    <div v-if="!isLogin">
      <login-page @setLogin="loginStatus"></login-page>
    </div>
    <div v-if="isLogin && !newArticle">
      <main-page @nowLogout="finallyLogout"></main-page>
    </div>
  </div>
</template>


<script>
//token - eyJhbGciOiJIUzI1NiJ9.NWRjODQ5MWQzNGU1MzY0ODkyMjU5NjNk.R8hqubB28oteALL0ygCAEJsT2PG47or0cr-p0OzlpIs
import loginPage from "./views/loginPage";
import mainPage from "./views/mainPage";

export default {
  name: "App",
  components: {
    loginPage,
    mainPage
  },
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    loginStatus() {
      this.isLogin = true;
    },
    finallyLogout() {
      localStorage.clear();
      this.isLogin = false;
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
};
</script>

<style scoped>
</style>

