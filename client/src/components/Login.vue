<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="centered-item">
          <img src="../../assets/login.png" style="margin:">
        </div>
        <form>
          <b-field>
            <b-input v-model="email" placeholder="Email">
          </b-field>
          <b-field>
            <b-input v-model="password" placeholder="Password">
          </b-field>
          <span>Don't have an account?</span>
          <router-link to="/register">
          <span class="text-dark-yellow">
            <b>Sign Up</b>
          </span>
          </router-link>
          <button class="button yellow-gradient float-right" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style scoped>
  .container {
    width: 70% !important;
  }
  .button {
    font-family: 'Yeseva One', cursive;
    font-weight: bold;
  }
  img {
    max-height: 300px;
  }
</style>