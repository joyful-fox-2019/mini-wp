<template>
  <div style="display: flex; justify-content: center; cursor: pointer">
    <br />
    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError"
      style="display: flex; justify-content: center; cursor: pointer; aligin-items:center"
    >
      sign-in with
      <br />
      <img
        src="https://img.icons8.com/plasticine/100/000000/google-logo.png"
        alt="Google"
        width="30"
      />
    </g-signin-button>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "../config/axios";

export default {
  data() {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id:
          "179640782565-mdjej11jj9j61s5hrqnj1qjcsti699i7.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
      let id_token = googleUser.Zi.id_token;

      axios({
        method: "POST",
        url: "/googleLogin",
        data: {
          token: id_token
        }
      })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.email);
          localStorage.setItem("name", data.name);

          Swal.fire({
            icon: "success",
            title: `Login Successful, Welcome`,
            showConfirmButton: false,
            timer: 1500
          });
          this.$emit("set-login");
        })
        .catch(err => {
          // console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong.."
          });
        });
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      //   console.log('OH NOES', error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong.."
      });
    }
  }
};
</script>

<style>
.g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  color: rgb(93, 90, 90);
}
</style>