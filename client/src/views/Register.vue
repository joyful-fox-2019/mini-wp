<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="centered-item">
          <!-- <img src="../../assets/register.png"> -->
        </div>
        <form @submit.prevent="register">
          <b-field>
            <b-input v-model="firstName" placeholder="First Name">
          </b-field>
          <b-field>
            <b-input v-model="lastName" placeholder="Last Name">
          </b-field>
          <b-field>
            <b-input v-model="email" placeholder="Email">
          </b-field>
          <b-field>
            <b-input v-model="password" placeholder="Password" type="password">
          </b-field>
          <button class="button bg-primary-gradient" type="submit">
            Sign Up
          </button>
          <span class="float-right">
            Already have an account?
            <router-link to="/login">
              <span class="t-primary">
                <b>Sign in</b>
              </span>
            </router-link>
          </span>
        </form>
        <div class="g-sign-container">
          <GSignIn @login="gLogin"></GSignIn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../helpers/axios'
import GSignIn from '../components/GSignIn'

export default {
  name: 'Register',
  components: {
    GSignIn
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      console.log('gas')
      axios.post('/users/register', {
        firstName: this.firstName,
        lastName: this.lastName,
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
    },
    gLogin() {
      this.$emit('login')
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
  .g-sign-container {
    margin: auto;
    width: 180px;
    margin-top: 25px;
  }
</style>