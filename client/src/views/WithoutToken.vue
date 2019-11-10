<template>
  <div id="without-token">

    <NavbarNoToken
      @show-only-home="showOnlyHome"
      @toggle-sign-in-form="toggleSignInForm"
      @toggle-register-form="toggleRegisterForm">
      </NavbarNoToken>

    <div class="main-image">
      <img src="../assets/undraw_wordpress_utxt.svg" alt srcset />
    </div>

    <RegisterForm 
     v-if="registerFormActive">
    </RegisterForm>

    <SignInForm
      v-if="signInFormActive">
    </SignInForm>

  </div>
</template>

<script>
import NavbarNoToken from "../components/NavbarNoToken"
import RegisterForm from "../components/RegisterForm"
import SignInForm from "../components/SignInForm"

export default {
  name: "without-token",
  data() {
    return {
      registerFormActive: false,
      signInFormActive: false
    };
  },
  methods: {
    showOnlyHome: function() {
      this.registerFormActive = false
      this.signInFormActive = false
    },
    toggleRegisterForm: function() {
      this.registerFormActive = !this.registerFormActive
      this.signInFormActive = false
    },
    toggleSignInForm: function() {
      this.registerFormActive = false
      this.signInFormActive = !this.signInFormActive
    }
  },
  components: {
    NavbarNoToken, RegisterForm, SignInForm
  }
};
</script>

<style scoped>
</style>