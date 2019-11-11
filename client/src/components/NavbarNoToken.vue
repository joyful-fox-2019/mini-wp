<template>
  <div id="navbar-no-token" class="navbar-fixed">
    <nav class role="navigation">
      <div class="nav-wrapper container">
        <ul class="left">
          
          <li>
            <a id="link-to-home"   
              @click="showOnlyHome" 
              href="#">
              <img
                class="nav-logo"
                src="https://s.w.org/style/images/about/WordPress-logotype-simplified.png"
                alt="logo"
              />
              <p class="nav-link-title">
                MiniWordpress.com
              </p>
            </a>
          </li>
          
        </ul>

        <ul class="right">
          <li>
            <a id="link-to-register"
              @click="toggleRegisterForm" href="#">Register</a>
          </li>
          <li>
            <a id="link-to-sign-in"
              @click="toggleSignInForm"
              href="#">Sign in</a>
          </li>
        </ul>

      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navbar-no-token",
  methods: {
    showOnlyHome() {
      this.$emit('show-only-home')
    },
    toggleRegisterForm() {
      this.$emit('toggle-register-form')
    },
    toggleSignInForm() {
      this.$emit('toggle-sign-in-form')
    }
  }
};
</script>

<style scoped>
</style>