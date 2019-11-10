<template>
  <div class="container t-standard">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="centered-item">
          <img :src='image' :title='imageTitle' />
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
          <span class="t-primary">
            <b>Sign Up</b>
          </span>
          </router-link>
          <button class="button bg-primary-gradient float-right" type="submit">
            Log in
          </button>
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
  name: 'Login',
  components: {
    GSignIn
  },
  data () {
    return {
      email: '',
      password: '',
      image: '',
      imageTitle: ''
    }
  },
  props: {
    isDark: Boolean
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
    },
    gLogin() {
      this.$emit('login')
    }
  },
  watch: {
    isDark () {
      if(this.isDark) {
        this.image = 'https://svgshare.com/i/G2S.svg'
        this.title = 'login-dark undraw'
      } else {
        this.image = 'https://svgshare.com/i/G2E.svg'
        this.title = 'login undraw'
      }
    }
  },
  created () {
    if(this.isDark) {
      this.image = 'https://svgshare.com/i/G2S.svg'
      this.title = 'login-dark undraw'
    } else {
      this.image = 'https://svgshare.com/i/G2E.svg'
      this.title = 'login undraw'
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
    max-height: 270px;
    margin: 30px
  }
  .g-sign-container {
    margin: auto;
    width: 180px;
    margin-top: 25px;
  }
</style>