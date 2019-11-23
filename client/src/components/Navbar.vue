<template>
  <nav class="menubar">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-md-2 d-flex">
          <a
            v-if="isLogin"
            class="navbar-brand py-2 px-3"
            style="color: white; margin-left: -1rem; cursor: default"
          >
            <i class="fas fa-bacon"></i>
            <span>&nbsp; Hacktiv WP</span>
          </a>
        </div>
        <div class="col-md-10 text-right">
          <div v-if="isLogin">
            <a
              @click.prevent="showWritePage"
              class="navbar-brand navbar-head py-1 px-2 mr-3"
              style="background-color: white; color: #245a72; border-radius: 5px; cursor: pointer"
            >
              <i class="far fa-edit"></i>
              <span class="text-link">&nbsp; Write</span>
            </a>
            <a
              @click.prevent="userSignout"
              class="navbar-brand navbar-head py-2 px-3"
              style="color: white; margin-right: -0.2rem; cursor: pointer"
            >
              <i class="fas fa-sign-out-alt"></i>
              <span class="text-link">&nbsp; Sign Out</span>
            </a>
          </div>
          <div v-if="!isLogin">
            <a
              href
              @click.prevent="showRegisterForm"
              v-if="loginForm"
              class="navbar-brand navbar-head py-2 px-3"
              style="color: white; margin-right: -1rem; cursor: pointer"
            >
              <i class="fas fa-user-plus"></i>
              <span class="text-link">Sign Up</span>
            </a>
            <a
              href
              @click.prevent="showLoginForm"
              v-if="!loginForm"
              class="navbar-brand navbar-head py-2 px-3"
              style="color: white; margin-right: -1rem; cursor: pointer"
            >
              <i class="fas fa-door-open"></i>
              <span class="text-link">Login</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    isLogin: Boolean,
    loginForm: Boolean
  },
  methods: {
    showLoginForm() {
      this.$emit("show-login-form");
    },
    showRegisterForm() {
      this.$emit("show-register-form");
    },
    showWritePage() {
      this.$emit("show-write-page");
    },
    userSignout() {
      this.$emit("user-signout");
    }
  }
};
</script>

<style>
</style>