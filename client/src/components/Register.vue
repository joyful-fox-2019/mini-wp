<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="centered-item">
          <img src="../../assets/register.png">
        </div>
        <form @submit.prevent="register">
          <b-field>
            <b-input v-model="email" placeholder="Email">
          </b-field>
          <b-field>
            <b-input v-model="password" placeholder="Password" type="password">
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
import axios from '../../helpers/axios'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      console.log('gas')
      axios.post('/users/register', {
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