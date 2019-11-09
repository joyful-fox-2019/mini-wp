<template>
    <div class="container">
        <h1>Register</h1>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group id="register-name" label="Your Name:" label-for="register-name">
                <b-form-input
                id="input-2"
                v-model="form.name"
                required
                placeholder="Enter name"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="register-email"
                label="Email address:"
                label-for="register-email"
            >
                <b-form-input
                id="register-email"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="register-password" label="Password:" label-for="register-password">
                <b-form-input
                id="register-password"
                v-model="form.password"
                required
                placeholder="Enter password"
                type="password"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from '../../config/axios'
export default {
 data() {
    return {
      form: {
        name: '',
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
        url: `/register`,
        data: {
            name: this.form.name,
            email: this.form.email,
            password: this.form.password
        }
      })
      .then( ({data}) => {
        alert('sukses donggg huahuahauhau');
        this.$emit('change-page', 'login');
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
      this.form.password = ''
    }
  }
}
</script>

<style>

</style>