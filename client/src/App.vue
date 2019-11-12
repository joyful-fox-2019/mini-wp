<template>
  <div>
    <loginpage v-show="!isLogin" @set-login="setLogin"></loginpage>
    <dashboard v-show="isLogin" :name="name" @logout="logout" :isLogin="isLogin"></dashboard>
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
      isLogin: false,
      name: ""
    };
  },
  methods: {
    fetchLocalStorage() {
      this.name = localStorage.getItem("name");
    },
    setLogin() {
      console.log(`masuk`);
      this.isLogin = true;
      this.fetchLocalStorage();
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