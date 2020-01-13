<template>
  <div id="beforeLogin">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6" id="pageCoulmn" style=" height: 100vh;">
          <img src="../img/undraw2.svg" width="100%;" height="100%;" />
        </div>
        <!-- <div class="col-md-6" style="background-color: #145474; height: 100vh;"> -->
        <!-- <div class="wrap" style="margin-top: 200px;">
            <div class="avatar">
              <img src="../img/wordpress.png" />
            </div>
            <input type="text" placeholder="username" v-model="username" required />
            <div class="bar">
              <i></i>
            </div>
            <input type="password" placeholder="password" v-model="password" required />
            <a href class="forgot_link">forgot ?</a>
            <button v-on:click.prevent="login">Sign in</button>
        </div>-->

        <section
          class="fdb-block col-md-6"
          v-if="isLoginForm === false"
          style="background-color: #145474; height: 100vh;"
        >
          <div class="container">
            <div class="row justify-content-center" id="loginBox">
              <div class="col-12 col-md-8 col-lg-7 col-md-5 text-center">
                <div class="fdb-box fdb-touch" style="height: 480px">
                  <div class="row">
                    <div class="col">
                      <h1>Register</h1>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col mt-4">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Name"
                        v-model="nameRegister"
                      />
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col">
                      <input
                        type="text"
                        v-model="emailRegister"
                        class="form-control"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col">
                      <input
                        type="password"
                        v-model="passRegister"
                        class="form-control mb-1"
                        placeholder="Password"
                      />
                      <p class="text-right">
                        <a href="#" v-on:click="registerFormEvent">Already have an account?</a>
                      </p>
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col">
                      <button class="btn btn-primary" v-on:click="register" type="button">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- Register -->

        <section
          class="fdb-block col-md-6"
          style="background-color: #145474; height: 100vh;"
          v-if="isLoginForm"
        >
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-12 col-md-8 col-lg-7 col-md-5 text-center">
                <div class="fdb-box">
                  <div class="row">
                    <div class="col">
                      <h1>Log In</h1>
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Email"
                        v-model="username"
                      />
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col">
                      <input
                        type="password"
                        v-model="password"
                        class="form-control mb-1"
                        placeholder="Password"
                      />
                      <p class="text-right">
                        <a href="#" v-on:click="isLoginFormEvent">Not Have Account ?</a>
                      </p>
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col">
                      <button
                        class="btn btn-outline-secondary"
                        v-on:click="login"
                        type="button"
                      >Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      isLoginForm: true,
      nameRegister: "",
      emailRegister: "",
      passRegister: ""
    };
  },
  methods: {
    login() {
      axios({
        method: "post",
        url: "http://34.87.110.250/user/login",
        data: {
          email: this.username,
          password: this.password
        }
      })
        .then(response => {
          Swal.fire({
            title: "Success",
            text: "login Success",
            icon: "success"
          });
          localStorage.setItem("username", response.data.name);
          localStorage.setItem("token", response.data.token);
          this.username = "";
          this.password = "";
          this.$emit("eventLogin");
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Login Failed!"
          });
        });
    },

    register() {
      axios({
        method: "post",
        url: "http://34.87.110.250/user/register",
        data: {
          name: this.nameRegister,
          email: this.emailRegister,
          password: this.passRegister
        }
      })
        .then(response => {
          Swal.fire({
            title: "Success",
            text: "Register Success",
            icon: "success"
          });
          this.nameRegister = "";
          this.emailRegister = "";
          this.passRegister = "";
          this.isLoginForm = true;
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Register Failed!"
          });
        });
    },
    isLoginFormEvent() {
      this.isLoginForm = false;
    },

    registerFormEvent() {
      this.isLoginForm = true;
    }
  }
};
</script>

<style scoped>
</style>


