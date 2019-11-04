<template>
  <div class="container">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item class="logo">
          <strong>SPOTLIGHT</strong>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-light">
              Sign in
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<style scoped>
.container {
  width: 70% !important;
  font-family: 'Yeseva One', cursive;
}
.logo {
  font-size: 25px;
  text-shadow: 0 0 5px #FFDD56;
}
@media only screen and (max-width: 600px) {
  .container {
    width: 90% !important;
  }
}
</style>