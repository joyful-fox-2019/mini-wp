<template>
  <div class="row justify-content-center section py-5" id="signinPage">
    <div class="col-8 text-center mt-5">
      <h1>Wordpress Mini</h1>
      <div class="dropdown-divider"></div>
      <h3>Sign In</h3>
    </div>

    <form class="col-8 my-5" @submit.prevent="signIn">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="emailUsername"
          placeholder="Email or Username"
          :class="{ 'is-invalid': emailUsernameStatus }"
          @focus="emailUsernameStatus = false"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          v-model="password"
          placeholder="Password"
          :class="{ 'is-invalid': passwordStatus }"
          @focus="passwordStatus = false"
        />
        <small class="invalid-feedback">Username/Password wrong.</small>
      </div>
      <div class="d-flex align-items-center">
        <button type="submit" class="btn btn-primary">Sign In</button>
        <span class="mx-3">Or</span>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
      </div>
      <small class="d-block mt-3">
        Don't have account?
        <a href @click.prevent="switchPage">Sign Up</a>
      </small>
    </form>
  </div>
</template>

<script>
import axios from "axios";
const http = axios.create({
  baseURL: "http://localhost:3000"
});

export default {
  data() {
    return {
      emailUsername: "",
      password: "",
      emailUsernameStatus: false,
      passwordStatus: false
    };
  },
  methods: {
    signIn() {
      http({
        method: "post",
        url: "/user/signin",
        data: {
          emailUsername: this.emailUsername,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          this.$emit("signed-in");
        })
        .catch(({ response }) => {
          console.log(response.data.messages);
          if (response.data.messages.includes("Invalid")) {
            (this.emailUsernameStatus = true), (this.passwordStatus = true);
          }
        });
    },
    switchPage() {
      this.$emit("switch-page");
    }
  }
};
</script>

<style>
#signinPage {
  position: fixed;
  width: 40%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>