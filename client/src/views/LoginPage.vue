<template>
  <div v-if="!isLogin" class="login-page">
    <header>
      <!-- NAVBAR -->
      <Navbar
        :isLogin="isLogin"
        :loginForm="loginForm"
        @show-login-form="showLoginForm"
        @show-register-form="showRegisterForm"
      ></Navbar>
      <!-- NAVBAR -->
    </header>
    <main>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-6 pt-5 mt-5">
                <!-- LOGIN -->
                <LoginForm :loginForm="loginForm" @user-login="userLogin"></LoginForm>
                <!-- LOGIN -->
                <!-- REGISTER -->
                <RegisterForm
                  :loginForm="loginForm"
                  @user-register="userRegister"
                  @google-auth="googleAuth"
                ></RegisterForm>
                <!-- REGISTER -->
              </div>
              <div class="col-md-3"></div>
            </div>
          </div>
          <div class="col-md-3"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import axios from "axios";
import Swal from "sweetalert2";

const server = axios.create({
  baseURL: "http://localhost:3000"
});

export default {
  components: {
    Navbar,
    LoginForm,
    RegisterForm
  },
  props: {
    isLogin: Boolean
  },
  data() {
    return {
      loginForm: true,
    };
  },
  methods: {
    userLogin(user) {
      server({
        method: "post",
        url: "users/login",
        data: {
          email: user.email,
          password: user.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("name", data.name);
          Swal.fire("Success", "Click to Continue");
          user.email = "";
          this.$emit("login-success");
        })
        .catch(({ response }) => {
          Swal.fire("Error", response.data.message);
        })
        .finally(() => {
          user.password = "";
        });
    },
    userRegister(user) {
      server({
        method: "post",
        url: "users/register",
        data: {
          name: user.name,
          email: user.email,
          password: user.password
        }
      })
        .then(({ data }) => {
          Swal.fire("Success", "Succesfully registered, please login");
          this.showLoginForm();
          user.email = "";
          user.username = "";
        })
        .catch(({ response }) => {
          Swal.fire("Error", response.data.message.join(", "));
        })

    },
    googleAuth(idToken) {
      server({
        method: "post",
        url: "users/googleLogin",
        data: {
          idToken: idToken
        }
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("name", data.name);
          this.$emit("login-success");
        })
        .catch(({ response }) => {
          Swal.fire("Error", response.data.message);
        });
    },
    showLoginForm() {
      this.loginForm = true;
    },
    showRegisterForm() {
      this.loginForm = false;
    }
  }
};
</script>

<style>
.login-page {
  background-color: #245a72;
  padding-top: 0;
  margin-top: 0;
  height: 100vh;
}
</style>