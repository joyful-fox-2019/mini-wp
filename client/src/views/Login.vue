<template>
  <b-container style="height:90vh;">
    <b-row class="justify-content-center align-items-center h-100">

      <b-col v-if="formpage === 'login'" cols="10" md="6">
        <h3 class="mb-4">Admin Login</h3>
        <b-form @submit.prevent="onLogin()" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
              name="email"
              autocomplete="email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Your password:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.password"
              required
              placeholder="Enter password"
              type="password"
              name="password"
              autocomplete="current-password"
            ></b-form-input>
          <small class="text-secondary">Don't have account? <span class="text-info" style="cursor: pointer;" @click="toRegister()">Register here.</span></small>
          </b-form-group>

          <b-button type="submit" variant="info">Login</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
          <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure" class="mt-2"></GoogleLogin>
        </b-form>
      </b-col>

      <b-col v-if="formpage === 'register'" cols="10" md="6">
        <h3 class="mb-4">Admin Register</h3>
        <b-form @submit.prevent="onRegister()" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
              name="email"
              autocomplete="email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Your name:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.name"
              required
              placeholder="Enter name"
              type="text"
              name="name"
              autocomplete="name"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Your password:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.password"
              required
              placeholder="Enter password"
              type="password"
              name="password"
              autocomplete="new-password"
            ></b-form-input>
          <small class="text-secondary">Have account? <span class="text-info" style="cursor: pointer;" @click="toLogin()">Login here.</span></small>
          </b-form-group>

          <b-button type="submit" variant="info">Register</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>

      </b-col>

    </b-row>
  </b-container>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import axios from '../config/getdata'

export default {
  data() {
    return {
      form: {
        email: '',
        name: '',
        password: ''
      },
      formpage: 'login',
      show: true,
      params: {
        client_id: "151458736537-l3u555emh5kpm6ddo8bteqakclqhgbhe.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }
  },
  components:{
    GoogleLogin
  },
  methods: {
    toRegister(){
      this.formpage = "register"
      this.form.email = ''
      this.form.password = ''
      this.form.name = ''
    },
    toLogin(){
      this.formpage = "login"
      this.form.email = ''
      this.form.password = ''
    },
    onRegister() {
      axios({
        url: '/users/register',
        method: 'post',
        data: {
          email: this.form.email,
          name: this.form.name,
          password: this.form.password
        }
      })
      .then(({ data }) => {
        this.successToast('Register successfully!')
        this.toLogin()
      })
      .catch(err => {
        this.next(err.response.data.errors)
      })
    },
    onLogin () {
      axios({
        method: 'post',
        url: '/users/login',
        data: {
          email: this.form.email,
          password: this.form.password
        }
      })
      .then(({ data }) => {
        localStorage.setItem('access_token',data.access_token)
        localStorage.setItem('name',data.name)
        localStorage.setItem('userid',data._id)
        this.successToast('Signed in successfully')
        this.$router.push({ path: `/admin/list-article/${localStorage.getItem('userid')}` })
      })
      .catch(err => {
        this.next(err.response.data)
      })
    },
    onSuccess(googleUser) {
      let id_token = googleUser.getAuthResponse().id_token
      axios({
        url: '/users/googleLogin',
        method: 'post',
        data: {
          id_token
        }
      })
      .then(({ data }) => {
        localStorage.setItem('access_token',data.access_token)
        localStorage.setItem('name',data.name)
        localStorage.setItem('userid',data._id)
        this.successToast('Signed in successfully')
        this.$router.push({ path: `/admin/list-article/${localStorage.getItem('userid')}` })
      })
      .catch(err => {
        this.next(err.response.data)
      })
    },
    onFailure(err){
      console.log(err);
      this.next(err)
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>