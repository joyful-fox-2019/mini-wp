<template>
  <div class="columns">
    <div
      v-if="isRegisterForm"
      class="box column is-half is-offset-one-quarter"
      style="margin-top: 150px; padding:50px;"
    >
      <div class="media">
        <div class="media-content">
          <section>
            <h1 class="title">Register</h1>
            <form @submit.prevent="handleRegister">
              <b-field label="Username">
                <b-input v-model="username" placeholder="johndoe" maxlength="30"></b-input>
              </b-field>

              <b-input style="display: none"></b-input>

              <b-field label="Email">
                <b-input v-model="email" placeholder="john@doe.com" maxlength="30"></b-input>
              </b-field>

              <b-field label="Password">
                <b-input v-model="password" placeholder="secret" type="password" maxlength="30"></b-input>
              </b-field>
              <div class="buttons">
                <b-button native-type="submit" type="is-info">Register</b-button>
              </div>
            </form>
          </section>
        </div>
      </div>
      <p style="margin-top: 3rem">
        <small>Already have an account?</small>
        <b-button @click="toggleForm" size="is-small" type="is-info" outlined>Log in</b-button>
      </p>
    </div>

    <div
      v-if="!isRegisterForm"
      class="box column is-half is-offset-one-quarter"
      style="margin-top: 150px; padding:50px;"
    >
      <div class="media">
        <div class="media-content">
          <section>
            <h1 class="title">Login</h1>
            <form @submit.prevent="handleLogin">
              <b-field label="Username / Email">
                <b-input v-model="identity" placeholder="johndoe / john@doe.com" maxlength="30"></b-input>
              </b-field>

              <b-field label="Password">
                <b-input v-model="password" placeholder="secret" type="password" maxlength="30"></b-input>
              </b-field>
              <div class="buttons">
                <b-button native-type="submit" type="is-info">Log in</b-button>
              </div>
            </form>
          </section>
        </div>
      </div>
      <span>
        <small>Don't have an account?</small>
        <b-button
          style="margin: 0 5px;"
          @click="toggleForm"
          size="is-small"
          type="is-info"
          outlined
        >Register</b-button>or
      </span>

      <g-signin-button
        class="button"
        type="button is-primary is small is-outlined"
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError"
      >Sign in with Google</g-signin-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const host = "https://mini-wp-aws.sigitariprasetyo.xyz";
// const host = "http://localhost:3000";

export default {
  name: "RegisterForm",
  data() {
    return {
      isFullPage: true,
      email: "",
      username: "",
      password: "",
      identity: "",
      isRegisterForm: false,
      googleSignInParams: {
        client_id:
          "562808920827-dsnid9n8sh807028l8uq20nl5bqqp7dk.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    toggleForm() {
      this.isRegisterForm = !this.isRegisterForm;
    },
    handleRegister() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });

      axios({
        method: "post",
        url: `${host}/users/register`,
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          setTimeout(() => loadingComponent.close(), 1 * 2000);
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          localStorage.setItem("email", data.email);
          this.$buefy.toast.open({
            message: `Hello ${localStorage.getItem(
              "username"
            )}, have a nice day...`,
            type: "is-success"
          });
          this.$emit("login", true);
        })
        .catch(err => {
          setTimeout(
            () =>
              this.$buefy.toast.open({
                message: err.message,
                type: "is-danger"
              }),
            500
          );
          this.email = "";
          this.username = "";
          this.password = "";
        });
    },
    handleLogin() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });

      axios({
        method: "post",
        url: `${host}/users/login`,
        data: {
          identity: this.identity,
          password: this.password
        }
      })
        .then(({ data }) => {
          setTimeout(() => loadingComponent.close(), 1 * 2000);
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          localStorage.setItem("email", data.email);
          this.$buefy.toast.open({
            message: `Hello ${localStorage.getItem(
              "username"
            )}, have a nice day...`,
            type: "is-success"
          });
          this.$emit("login", true);
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 2000);
          setTimeout(
            () =>
              this.$buefy.toast.open({
                message: err.response.data,
                type: "is-danger"
              }),
            500
          );
          this.identity = "";
          this.password = "";
        });
    },
    onSignInSuccess(googleUser) {
      const id = googleUser.getAuthResponse().id_token;
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });

      return axios({
        method: "post",
        url: `${host}/users/gsignin`,
        data: {
          token: id
        }
      })
        .then(({ data }) => {
          setTimeout(() => loadingComponent.close(), 1 * 2000);
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          localStorage.setItem("email", data.email);
          this.$buefy.toast.open({
            message: `Hello ${localStorage.getItem(
              "username"
            )}, have a nice day...`,
            type: "is-success"
          });
          this.$emit("login", true);
        })
        .catch(err => {
          setTimeout(
            () =>
              this.$buefy.toast.open({
                message: err.response.data,
                type: "is-danger"
              }),
            500
          );
          this.identity = "";
          this.password = "";
        });
    },
    onSignInError(error) {
      console.log("OH NOES", error);
    }
  }
};
</script>

<style scoped>
.p-5 {
  padding: 5rem;
}
.border-radius {
  border-radius: 10px;
}
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>