<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="centered-item">
          <img src="../../assets/login.png" style="margin:">
        </div>
        <form @submit.prevent="login">
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
        <GSignIn></GSignIn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../helpers/axios'
import GSignIn from './GSignIn'

export default {
  name: 'Login',
  components: {
    GSignIn
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      axios.post('/users/login', {
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          localStorage.setItem('_id', data._id)
          localStorage.setItem('email', data.email)
          localStorage.setItem('access_token', data.access_token)
          this.$router.push('/')
          this.$emit('login')
        })
        .catch(err => {
          this.$emit('alert', err)
        })
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