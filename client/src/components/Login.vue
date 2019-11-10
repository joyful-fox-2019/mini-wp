<template>
    <div style="padding-top:100px">
        <div class="card">
            <div style="display: flex; justify-content: center">
                <img src="../images/logo.png" alt="logo" style="width:100px; margin:0px auto; margin-bottom:30px;">
            </div>
            <form>
                <b-field label="Email">
                    <b-input 
                        type="email"
                        placeholder="Email address"
                        maxlength="30"
                        v-model="email">
                    </b-input>
                </b-field>
                <b-field label="Password">
                    <b-input 
                        type="password"
                        placeholder="*******"
                        password-reveal
                        v-model="password">
                    </b-input>
                </b-field>
                <div class="buttons">
                    <b-button @click.prevent="login" class="login-btn" type="is-info" id="login-btn">
                        <i class="fas fa-sign-in-alt" style="margin-right:10px;"></i>
                        Sign In
                    </b-button>
                    <g-signin-button
                        :params="googleSignInParams"
                        @success="onSignInSuccess"
                        @error="onSignInError">
                        <i class="fab fa-google" style="margin-right:5px;"></i>
                        Google Sign In
                    </g-signin-button>
                </div>
                <small>Don't have an account? <a href="#" @click.prevent="register" style="text-align:center;">Sign up here.</a></small>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "../config/axios.js";
import Swal from "sweetalert2";

export default {
    name: "Login",
    data: function(){
        return {
            email: "",
            password: "",
            googleSignInParams: {
                client_id: "1029145838926-3021asjtgrffu33usohb8iuj3mo3k3q1.apps.googleusercontent.com"
            }
        };
    },
    props: {
        isLogin: Boolean,
        page: String,
        loginPage: String
    },
    methods: {
        onSignInSuccess (googleUser) {
            // `googleUser` is the GoogleUser object that represents the just-signed-in user.
            // See https://developers.google.com/identity/sign-in/web/reference#users
            const profile = googleUser.getBasicProfile();
            const id_token = googleUser.getAuthResponse().id_token;
            axios({
                method: "POST",
                url: "/users/gsignin",
                data: { idToken: id_token }
            })
            .then((response) => {
                localStorage.setItem("token", response.data.jwt_token);
                this.$emit("set-login", true);
                this.$emit("set-page", "main");
                this.success("Successfully sign in.");
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                this.danger(err.response.data.message);
                console.log(err);
            });
        },
        onSignInError (error) {
            // `error` contains any error occurred.
            console.log(error);
        },
        login() {
            axios({
                method: "POST",
                url: "/users/signin",
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then((response) => {
                localStorage.setItem("token", response.data.jwt_token);
                this.$emit("set-login", true);
                this.$emit("set-page", "main");
                this.email = "";
                this.password = "";
                this.success("Successfully sign in.");
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch((err) => {
                this.danger(err.response.data.message);
                Swal.fire({
                    icon: 'errror',
                    title: 'Error!',
                    text: err.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        },
        register() {
            this.$emit("set-login-page", "register");
        },
        success(message) {
            this.$buefy.toast.open({
                duration: 1500,
                message: message,
                position: "is-top-right",
                type: "is-success"
            })
        },
        danger(message) {
            this.$buefy.toast.open({
                duration: 1500,
                message: message,
                position: "is-top",
                type: "is-danger"
            })
        }
    }
}
</script>

<style scoped>
    .card {
        background-color: whitesmoke;
        width: 30%;
        margin: 0px auto;
        padding: 30px;
        border-radius: 10px;
    }
    .buttons {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 30px auto;
    }
    .login-btn {
        width: 40%;
        margin-top: 10px;
    }
    .g-signin-button {
        /* This is where you control how the button looks. Be creative! */
        display: inline-block;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
    }
</style>