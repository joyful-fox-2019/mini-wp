<template>
  <div
    class="startingPage"
    style="background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC12tDOsKNf7Jh1ZwT2MDv0PChcwoSjwWSojp4Y6oNCT8xly50&s') no-repeat center center; background-size: cover; width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;"
  >
    <div class="loginPage" style="display: flex; align-items: center; justify-content: center;">
      <div
        class="loginInterface"
        style="border: 2px solid white; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 500px; width: 500px; text-align: center;"
      >
        <form autocomplete="off" @submit="loginuser">
          <h3 style="margin-bottom: 20px; color: white;">Welcome to my Mini-WP</h3>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <button class="btn btn-info" type="submit">Login</button>
          <p style="color: white; margin-top: 8px;">Or</p>
        </form>
        <button class="btn btn-secondary" type="button" @click="toregister">Register</button>
        <GoogleLogin
          class="glogin"
          :params="params"
          :renderParams="renderParams"
          :onSuccess="onSuccess"
        >Login</GoogleLogin>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import GoogleLogin from "vue-google-login";

export default {
  data() {
    return {
      email: "",
      password: "",
      params: {
        client_id:
          process.env.GOOGLE_CLIENT_ID
      },
      renderParams: {
        width: 90,
        height: 30,
        longtitle: false
      }
    };
  },
  components: {
    GoogleLogin
  },
  methods: {
    loginuser(evt) {
      evt.preventDefault();
      let email = this.email;
      let password = this.password;
      axios({
        url: "http://localhost:3000/login",
        method: "POST",
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          this.$emit("onlogin", data.token, "register");
        })
        .catch(err => {
          this.$dlg.alert(
            "Oops! Looks like you typing wrong username/password",
            {
              messageType: "error"
            }
          );
          this.email = "";
          this.password = "";
        });
    },
    toregister() {
      this.$emit("registerform", "register");
    },
    onSuccess(googleUser) {
      axios({
        url: "http://localhost:3000/google",
        method: "POST",
        data: {
          email: googleUser.getBasicProfile().U3
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.$emit("glogin", data.token);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.glogin {
  margin-top: 10px;
}
</style>