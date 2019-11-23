<template>
  <div class="container" id="register-content" v-if="!loginForm">
    <div class="row justify-content-center mb-2">
      <h2 style="color: white">
        <i class="fas fa-bacon"></i>&nbsp; Hacktiv WP
      </h2>
    </div>
    <div class="row justify-content-center mb-2">
      <h4 style="color: white">Let's Get Started</h4>
    </div>
    <div class="row justify-content-center">
      <form
        id="register-form"
        style="background-color: white; color: black; width: 20vw; padding: 3rem; border-radius: 0.5rem;"
      >
        <div class="form-group">
          <label for="name">Your name</label>
          <input
            type="text"
            v-model="name"
            class="form-control"
            id="register-name"
            placeholder="Name"
          />
        </div>
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
          type="submit"
          @click.prevent="userRegister"
          class="btn btn-light mt-3"
          style="width: 100%; background-color: #fc5a8d; color: white; border-radius: 0.5rem;"
        >Register</button>
      </form>
    </div>
    <div class="row justify-content-center">
      <span class="nav-link active" style="color: white">Or</span>
    </div>
    <div class="row justify-content-center" style="cursor: pointer">
      <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError"
      >
        <img
          src="https://img.icons8.com/plasticine/100/000000/google-logo.png"
          alt="Google"
          width="40"
        />Sign in with Google
      </g-signin-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loginForm: Boolean
  },
  components: {},
  data() {
    return {
      googleSignInParams: {
        client_id:
          "384105640106-lbc4qa1jd56r4hgtcfblmt50cijg33qe.apps.googleusercontent.com"
      },
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      const profile = googleUser.getBasicProfile();
      const idToken = googleUser.getAuthResponse().id_token
      this.$emit('google-auth', idToken)
    },
    onSignInError(error) {
      console.log(error);
    },
    userRegister() {
      this.$emit("user-register", {
        name: this.name,
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style>
.g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  color: #fff;
}
</style>