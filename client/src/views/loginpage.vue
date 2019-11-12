<template>
  <div id="login-register-page">
    <div>
      <img src alt />
    </div>
    <div class="form-structor">
      <loginregisterform @set-login="setLogin"></loginregisterform>
    </div>
  </div>
</template>

<script>
import vue from "vue";
import axios from "../config/axios";
import loginregisterform from "../component/loginregisterform.vue";
import googleLogin from "../component/googleLogin";

export default {
  name: "loginPage",
  components: {
    loginregisterform,
    googleLogin
  },
  methods: {
    setLogin() {
      this.$emit("set-login");
    }
  }
};
</script>

<style>
</style>