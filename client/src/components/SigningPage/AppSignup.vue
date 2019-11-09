<template>
  <div class="row justify-content-center section" id="signupPage">
    <div class="col-8 text-center mt-5">
      <h1>Wordpress Mini</h1>
      <div class="dropdown-divider"></div>
      <h3>Sign Up</h3>
    </div>

    <form class="col-8 my-5" @submit.prevent="signUp" novalidate="true">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="username"
          placeholder="Username"
          :class="{ 'is-invalid': usernameStatus }"
          @focus="validateUsername(); clientValidation = true"
          @keyup="validateUsername"
        />
        <small
          class="invalid-feedback"
        >{{clientValidation ? 'Username cannot empty.' : 'Username already taken.'}}</small>
      </div>
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          v-model="email"
          placeholder="Email"
          @focus="validateEmail = false; clientValidation = true"
          :class="{ 'is-invalid': validateEmail }"
        />
        <small
          class="invalid-feedback"
        >{{clientValidation ? 'Invalid email format.' : 'Email already registered.'}}</small>
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          v-model="password"
          placeholder="Password"
          :class="{ 'is-invalid': validatePassword }"
        />

        <small class="invalid-feedback">Minmum password length is 6.</small>
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          v-model="confirmPassword"
          placeholder="Confirm Password"
          :class="{ 'is-invalid': validateConfirmPassword }"
        />
        <small class="invalid-feedback">Password don't match.</small>
      </div>
      <div class="d-flex align-items-center">
        <button type="submit" class="btn btn-primary">Sign Up</button>
        <span class="mx-3">Or</span>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
      </div>
      <small class="d-block mt-3">
        Already have account?
        <a href @click.prevent="switchPage">Sign In</a>
      </small>
    </form>
  </div>
</template>

<script>
import axios from "axios";
const http = axios.create({
  baseURL: "http://localhost:3000"
});

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      usernameStatus: false,
      emailStatus: false,
      passwordStatus: false,
      confirmPasswordStatus: false,
      clientValidation: true
    };
  },
  methods: {
    validateUsername() {
      if (!this.username) this.usernameStatus = true;
      else this.usernameStatus = false;
    },
    switchPage() {
      this.$emit("switch-page");
    },
    signUp: function() {
      if (
        !this.username ||
        !this.email ||
        !this.password ||
        !this.confirmPassword ||
        this.usernameStatus ||
        this.validateEemail ||
        this.validatePassword ||
        this.validateConfirmPassword
      )
        return;

      this.clientValidation = false;
      http({
        method: "post",
        url: "users/signup",
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(() => {
          Swal.fire("Success", "You have been signed up!");
          this.switchPage();
          this.username = "";
          this.email = "";
        })
        .catch(err => {
          console.log(err);
          for (const msg of err.response.data.messages) {
            if (msg.includes("Email")) {
              this.validateEmail = true;
            } else if (msg.includes("Username")) {
              this.usernameStatus = true;
            }
          }
        })
        .finally(() => {
          this.password = "";
          this.confirmPassword = "";
        });
    }
  },
  computed: {
    validateEmail: {
      get() {
        return (
          this.emailStatus ||
          (this.email &&
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              this.email
            ))
        );
      },
      set(val) {
        this.emailStatus = val;
      }
    },
    validatePassword: {
      get() {
        return (
          this.passwordStatus || (this.password && this.password.length < 6)
        );
      },
      set(val) {
        this.passwordStatus = val;
      }
    },
    validateConfirmPassword: {
      get() {
        return (
          this.confirmPasswordStatus ||
          (this.confirmPassword && this.confirmPassword !== this.password)
        );
      },
      set(val) {
        this.confirmPasswordStatus = val;
      }
    }
  }
};
</script>

<style>
#signupPage {
  position: fixed;
  width: 40%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>