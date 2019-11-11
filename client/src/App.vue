<template>
  <div>
    <loginpage v-show="!isLogin" @set-login="setLogin"></loginpage>
    <dashboard v-show="isLogin" @logout="logout"></dashboard>
  </div>
</template>

<script>
import vue from "vue";
import loginpage from "./views/loginpage";
import dashboard from "./views/dashboard";

export default {
  components: {
    loginpage,
    dashboard
  },
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    setLogin() {
      console.log(`masuk`);
      this.isLogin = true;
    },
    login() {
      if (localStorage.getItem("token")) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    logout() {
      localStorage.clear();
      this.isLogin = false;
    }
  },
  created() {
    this.login();
  }
};
</script>

<style scoped>
</style>