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
            <router-link to="/login">
              <a class="button is-light">
                Sign in
              </a>
            </router-link>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.container {
  width: 70% !important;
  font-family: 'Yeseva One', cursive;
}
.logo {
  margin-top: 3px;
  font-size: 28px;
}
@media only screen and (max-width: 600px) {
  .container {
    width: 90% !important;
  }
}
</style>