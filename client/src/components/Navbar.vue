<template>
  <div class="container">
    <b-navbar>
      <template slot="brand">
          <div @click="$router.push('/')" class="logo clickable">
            <strong>Spotlight</strong>
          </div>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <router-link v-if="!isLogin" to="/login">
              <a class="button is-light">
                Sign in
              </a>
            </router-link>
              <a v-if="isLogin" @click="logout" class="button is-light">
                Sign out
              </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: ['isLogin'],
  methods: {
    logout() {
      this.$emit('logout')
    }
  }
}
</script>

<style scoped>
.container {
  font-family: 'Yeseva One', cursive;
}
.logo {
  margin-top: 3px;
  font-size: 28px;
}
</style>