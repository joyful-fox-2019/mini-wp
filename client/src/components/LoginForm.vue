<template>
  <div class="container" id="login-content" v-if="loginForm">
    <div class="row justify-content-center mb-2">
      <h2 style="color: white">
        <i class="fas fa-bacon"></i>&nbsp; Hacktiv WP
      </h2>
    </div>
    <div class="row justify-content-center mb-2">
      <h4 style="color: white">Log into your account</h4>
    </div>
    <div class="row justify-content-center">
      <form
        id="register-form"
        style="background-color: white; color: black; width: 20vw; padding: 3rem; border-radius: 0.5rem;"
      >
        <div class="form-group">
          <label for="email">Your email address</label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            id="register-email"
            placeholder="Email"
          />
        </div>
        <div class="form-group">
          <label for="password">Your password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            id="register-password"
            placeholder="Password"
          />
        </div>
        <button
          @click.prevent="userLogin"
          class="btn btn-light mt-3"
          style="width: 100%; background-color: #fc5a8d; color: white; border-radius: 0.5rem;"
        >Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loginForm: Boolean
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    userLogin() {
      this.$emit("user-login", { email: this.email, password: this.password });
    }
  }
};
</script>

<style>
</style>