<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <div v-if="afterLogin" class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="d-flex">
          <b-button @click="showDashboard" type="button" variant="primary">
            <i class="fab fa-wordpress-simple fa-1x mr-2"></i>My
            Sites
          </b-button>
        </div>
        <div class="d-flex">
          <b-button type="button" variant="primary">
            <i class="far fa-newspaper fa-1x mr-2"></i>Reader
          </b-button>
        </div>
      </div>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-show="afterLogin">
          <div class="d-flex mr-3">
            <b-button
              @click="showCreateArticle"
              type="button"
              size="sm"
              class="my-2 my-sm-0"
              variant="light"
            >
              <i class="far fa-edit"></i>Write
            </b-button>
          </div>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">{{user}}</b-dropdown-item>
            <b-dropdown-item href="#" @click="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <!--buttonSignIn/out-->
          <!--end button -->
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-show="!afterLogin">
          <b-button variant="light" @click="showModalLogin" class="mr-2">Sign In</b-button>
          <div id="google-signin-button"></div>
          <!--modal-login-->
          <b-modal ref="my-modal-login" hide-footer title="FORM SIGN IN">
            <!--form-->
            <b-form @submit="signIn" v-if="formShow">
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

              <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="form.password"
                  type="password"
                  required
                  placeholder="Enter password"
                ></b-form-input>
              </b-form-group>
              <b-button class="mt-3" type="submit" variant="outline-primary" block>Sign In</b-button>
            </b-form>
            <!--endform-->
            <b-button
              class="mt-2"
              variant="outline-warning"
              block
              @click="showModalRegister"
            >Register</b-button>
            <b-button class="mt-2" variant="outline-danger" block @click="hideModalLogin">Close</b-button>
          </b-modal>
          <!--end modal-->
          <!--modal register-->
          <b-modal ref="my-modal-register" hide-footer title="FORM REGISTER">
            <!--form-->
            <b-form @submit="register" v-if="registerShow">
              <b-form-group id="input-group-1" label="Name:" label-for="input-1">
                <b-form-input
                  id="input-1"
                  v-model="formRegis.name"
                  type="text"
                  required
                  placeholder="Enter name"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Email address:"
                label-for="input-2"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-2"
                  v-model="formRegis.email"
                  type="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-3" label="Password:" label-for="input-2">
                <b-form-input
                  id="input-3"
                  v-model="formRegis.password"
                  type="password"
                  required
                  placeholder="Enter password"
                ></b-form-input>
              </b-form-group>
              <b-button
                class="mt-3"
                type="submit"
                variant="outline-primary"
                block
              >Submit Data Register</b-button>
            </b-form>
            <!--endform-->
            <b-button
              class="mt-2"
              variant="outline-danger"
              block
              @click="hideModalRegister"
            >Back to Sign In</b-button>
          </b-modal>
          <!--end modal regis--->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Swal from "sweetalert2";
const baseUrl = "http://localhost:3000";

export default {
  name: "Navbar",
  data() {
    return {
      user: null,
      form: {
        email: "",
        password: ""
      },
      formRegis: {
        name: "",
        email: "",
        password: ""
      },
      afterLogin: false,
      formShow: true,
      registerShow: true,
      showCreate: false
    };
  },
  methods: {
    register(evt) {
      evt.preventDefault();
      this.axios({
        method: "POST",
        url: baseUrl + "/users/register",
        data: this.formRegis
      })
        .then(({ data }) => {
          this.formRegis.name = "";
          this.formRegis.email = "";
          this.formRegis.password = "";
          this.hideModalRegister();
          Swal.fire({
            icon: "success",
            title: "Register successfully"
          });
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Sorry,",
            text: err.response.data.errors.join(", ")
          });
        });
    },
    onSignIn(googleUser) {
      console.log(googleUser);
      var id_token = googleUser.getAuthInstance().id_token;
      this.axios({
        method: "POST",
        url: baseUrl + "/users/googleLogin",
        data: {
          id_token
        }
      })
        .then(response => {
          localStorage.setItem("token", data);
          this.afterLogin = true;
          this.$emit("statusLogin", this.afterLogin);
          Swal.fire({
            icon: "success",
            title: "Login via Google successfully"
          });
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Sorry,",
            text: err.response.data.errors.join(", ")
          });
        });
    },
    signIn(evt) {
      evt.preventDefault();
      this.axios({
        method: "POST",
        url: baseUrl + "/users/login",
        data: this.form
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.name);
          this.form.email = "";
          this.form.password = "";
          this.$refs["my-modal-login"].hide();
          this.afterLogin = true;
          this.$emit("statusLogin", this.afterLogin);
          Swal.fire({
            icon: "success",
            title: "Login successfully"
          });
        })
        .catch(err => {
          console.log(err);
          this.form.email = "";
          this.form.password = "";
          Swal.fire({
            icon: "error",
            title: "Sorry,",
            text: err.response.data.errors.join(", ")
          });
        });

      // console.log(this.afterLogin);
    },
    signOut() {
      console.log("keluar");
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
      });
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      this.afterLogin = false;
      this.$emit("statusLogin", this.afterLogin);
    },
    showModalLogin() {
      this.$refs["my-modal-login"].show();
      this.formShow = true;
    },
    hideModalLogin() {
      this.$refs["my-modal-login"].hide();
    },
    showModalRegister() {
      this.$refs["my-modal-login"].hide();
      this.$refs["my-modal-register"].show();
      this.registerShow = true;
    },
    hideModalRegister() {
      this.$refs["my-modal-register"].hide();
      this.$refs["my-modal-login"].show();
    },
    showCreateArticle() {
      this.$emit("createNow", true);
    },
    showDashboard() {
      this.$emit("createNow", false);
    }
  },
  mounted() {
    gapi.signin2.render("google-signin-button", {
      onsuccess: this.onSignIn
    });
  },
  created() {
    if (localStorage.getItem("token")) {
      this.afterLogin = true;
      this.user = localStorage.getItem("name");
    }
  }
};
</script>

<style>
</style>