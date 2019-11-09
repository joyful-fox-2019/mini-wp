<template>
  <div class="container">
    <h1>Login</h1>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="login-email"
        label="Email address:"
        label-for="login-email"
      >
        <b-form-input
          id="login-email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="login-password" label="Password:" label-for="login-password">
        <b-form-input
          id="login-password"
          v-model="form.password"
          required
          placeholder="Enter password"
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <p @click="changePage('register')">or Register</p>
  </div>
</template>

<script>
import axios from '../../config/axios'
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()

      axios({
          method: 'post',
          url: `/login`,
          data: {
            email: this.form.email,
            password: this.form.password
          }
      })
      .then( ({data}) => {
        localStorage.setItem('jwt_token', data)
        this.$emit('change-login', true);
        this.changePage('home');
      })
      .catch(err => {
          console.log(err)
      })
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
    },
    changePage(value) {
      this.$emit('change-page', value);
    }
  }
}
</script>