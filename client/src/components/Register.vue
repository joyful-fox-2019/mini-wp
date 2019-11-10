<template>
    <div style="padding-top:100px">
        <div class="card">
            <div style="display: flex; justify-content: center">
                <img src="../images/logo.png" alt="" style="width:100px; margin:0px auto; margin-bottom:30px;">
            </div>
            <form>
                <b-field label="Full Name">
                    <b-input 
                        type="text"
                        placeholder="Full Name"
                        maxlength="50"
                        v-model="name">
                    </b-input>
                </b-field>
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
                <div class="container">
                    <b-button @click.prevent="register" type="is-info" id="login-btn">Register</b-button>
                    <small><a href="#" @click.prevent="login" style="text-align:center;">← Back to login page</a></small>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "../config/axios.js";
import Swal from "sweetalert2";

export default {
    name: "Register",
    data: function(){
        return {
            name: "",
            email: "",
            password: ""
        };
    },
    props: {
        isLogin: Boolean,
        page: String,
        loginPage: String
    },
    methods: {
        register() {
            axios({
                method: "POST",
                url: "/users/signup",
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
            })
            .then((response) => {
                localStorage.setItem("token", response.data.jwt_token);
                this.$emit("set-login", true);
                this.$emit("set-page", "main");
                this.name = "";
                this.email = "";
                this.password = "";
                this.success("Register successfully");
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Success!',
                //     showConfirmButton: false,
                //     timer: 1500
                // })
            })
            .catch((err) => {
                this.danger(err.response.data.message.join(", "));
                // Swal.fire({
                //     icon: 'errror',
                //     title: 'Error!',
                //     text: err.response.data.message,
                //     showConfirmButton: false,
                //     timer: 1500
                // });
            });
        },
        login() {
            this.$emit("set-login-page", "login");
        },
        success(message) {
            this.$buefy.toast.open({
                duration: 3000,
                message: message,
                position: "is-top-right",
                type: "is-success"
            })
        },
        danger(message) {
            this.$buefy.toast.open({
                duration: 3000,
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
    .button {
        width: 100%;
        margin: 30px auto;
    }
</style>