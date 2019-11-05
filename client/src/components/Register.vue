<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="centered-item">
          <img src="../../assets/register.png">
        </div>
        <form>
          <b-field>
            <b-input v-model="email" placeholder="Email">
          </b-field>
          <b-field>
            <b-input v-model="password" placeholder="Password">
          </b-field>
          <button class="button yellow-gradient" type="submit">
            Sign Up
          </button>
          <span class="float-right">
            Already have an account?
            <router-link to="/login">
              <span class="text-dark-yellow">
                <b>Sign in</b>
              </span>
            </router-link>
          </span>
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