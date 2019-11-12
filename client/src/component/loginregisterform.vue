<template>
  <div>
    <div class="signup" :class="{'slide-up': loginSite}">
      <form @submit.prevent="signUp">
        <h2 class="form-title" id="signup" @click="siteSwap">
          <span>or</span>Create Account
        </h2>
        <div class="form-holder">
          <input type="text" class="input" placeholder="Name" v-model="regname" />
          <input type="email" class="input" placeholder="Email" v-model="regemail" />
          <input type="password" class="input" placeholder="Password" v-model="regpassword" />
        </div>
        <br />
        <div v-if="errorsReg.length != 0" class="error">
          <h5>
            <strong>We had some issues</strong>
          </h5>
          <ul>
            <li v-for="err in errorsReg" :key="err">{{err}}</li>
          </ul>
        </div>
        <input class="submit-btn" type="submit" value="Sign up" />
      </form>
    </div>
    <div class="login" :class="{'slide-up': !loginSite}">
      <div class="center">
        <form @submit.prevent="signIn">
          <h2 class="form-title" id="login" @click="siteSwap">
            <span>or</span>Log in
          </h2>
          <div class="form-holder">
            <input type="email" class="input" placeholder="Email" v-model="logemail" />
            <input type="password" class="input" placeholder="Password" v-model="logpassword" />
          </div>
          <br />
          <div v-if="errorsLog.length != 0" class="error">
            <h5>We had some issues</h5>
            <ul>
              <li>{{errorsLog}}</li>
            </ul>
          </div>
          <input class="submit-btn" type="submit" value="Log in" />
          <googleLogin @set-login="setLogin"></googleLogin>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import vue from "vue";
import axios from "../config/axios";
import googleLogin from "./googleLogin";

export default {
  name: "loginregisterform",
  components: {
    googleLogin
  },
  data() {
    return {
      regname: "",
      regemail: "",
      regpassword: "",
      logemail: "",
      logpassword: "",
      errorsLog: [],
      errorsReg: [],
      loginSite: false
    };
  },
  methods: {
    siteSwap() {
      this.errorsLog = [];
      this.errorsReg = [];
      this.loginSite = !this.loginSite;
    },
    signUp() {
      this.errorsLog = [];
      axios({
        method: "post",
        url: "/register",
        data: {
          name: this.regname,
          email: this.regemail,
          password: this.regpassword
        }
      })
        .then(({ data }) => {
          this.loginSite = !this.loginSite;
          this.regemail = "";
          this.regname = "";
          this.regpassword = "";
          this.errorsReg = [];
        })
        .catch(({ response }) => {
          console.log(response);
          this.errorsReg = response.data.message;
        })
        .finally(() => {
          this.regpassword = "";
        });
    },
    signIn() {
      this.errorsReg = [];
      axios({
        method: "post",
        url: "/login",
        data: {
          email: this.logemail,
          password: this.logpassword
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.name);
          localStorage.setItem("email", data.email);
          this.$emit("set-login");
          this.logemail = "";
          this.logpassword = "";
          this.errorsLog = [];
        })
        .catch(({ response }) => {
          console.log(response);
          this.errorsLog = response.data.message;
        })
        .finally(() => {});
    },
    setLogin() {
      this.$emit("set-login");
    }
  },
  created() {
    if (localStorage.getItem("token")) this.$emit("set-login");
  }
};
</script>

<style>
</style>



