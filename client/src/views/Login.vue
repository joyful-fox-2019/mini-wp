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
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Your password:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.password"
              required
              placeholder="Enter password"
              type="password"
            ></b-form-input>
          <small class="text-secondary">Don't have account? <span class="text-info" @click="toRegister()">Register here.</span></small>
          </b-form-group>

          <b-button type="submit" variant="info">Login</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
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
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Your name:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.name"
              required
              placeholder="Enter name"
              type="text"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Your password:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.password"
              required
              placeholder="Enter password"
              type="password"
            ></b-form-input>
          <small class="text-secondary">Have account? <span class="text-info" @click="toLogin()">Login here.</span></small>
          </b-form-group>

          <b-button type="submit" variant="info">Register</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>

      </b-col>

    </b-row>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          password: ''
        },
        formpage: 'login',
        show: true
      }
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
        
      },
      onLogin(){
        
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