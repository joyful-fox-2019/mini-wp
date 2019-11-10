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
        <form autocomplete="off" @submit="regisuser">
          <h3 style="margin-bottom: 20px; color: white;">Register here</h3>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              v-model="regisemail"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              v-model="regispassword"
            />
          </div>
          <button class="btn btn-info" type="submit">Register</button>
          <p style="color: white; margin-top: 8px;">Or</p>
        </form>
        <button
          class="btn btn-secondary"
          type="button"
          data-toggle="modal"
          data-target="#modalRegister"
          @click="backtologin"
        >Back to Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      regisemail: "",
      regispassword: ""
    };
  },
  methods: {
    backtologin() {
      this.$emit("showlogin", "login");
    },
    regisuser() {
      let email = this.regisemail;
      let password = this.regispassword;
      axios({
        url: "http://localhost:3000/register",
        method: "POST",
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          this.$emit("successregis", "login");
        })
        .catch(err => {
          this.$dlg.alert(
            "Please remember that password should be 7 word length",
            {
              messageType: "error"
            }
          );
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>

<style>
</style>