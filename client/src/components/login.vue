<template>
               <section class="section-login" >
                <header class="header-login">
                    <div class="border"></div>
                </header>
                <div class="signin">
                    <h1 class="h1-login">Sign in</h1>
                    <p class="accountb">Don't have an account? <a href="#" @click.prevent="showRegisterForm">Sign up</a></p>
                        <div class="form-item">
                            <label for="input">email address / username</label>
                            <input v-model="identity" type="email" class="field" name="email" placeholder="someone@example.com" value required>
                        </div>
                        <div class="form-item">
                            <label for="input">password</label>
                            <input v-model="passwordSignIn" type="password" class="field" name="password" placeholder="password" value required>
                        </div>
                        <div class="form-item">
                            <input type="checkbox" id="cbox1" value="first_checkbox" checked>
                            <label for="cbox1">Remember Me</label>
                        </div>
                        <div class="form-item">
                            <button v-on:click.prevent="login()" type="button" class="signin-btn">Sign in</button>
                        </div>
                        <br>
                         <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
                        <a href="#" class="forgot">Forgot Password?</a>
                </div>
        </section>

</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
    name:'Loginform',
    components : {
        GoogleLogin
    },
    data() {
        return {
          passwordSignIn: '',
          identity: '',
        params: {
                    client_id: "907041340854-ma59s73mevnrp9vv6u2ohmfopln2gt0i.apps.googleusercontent.com"
                },
                // only needed if you want to render the button with the google ui
                renderParams: {
                    width: 400,
                    height: 50,
                    longtitle: true
                }
       }
    },
    methods : {
        showRegisterForm() {
            this.$emit('registerpage')
        },
        login() {
            axios({
                method: 'post',
                url: 'http://localhost:3000/wp/login',
                data: {
                    identity : this.identity,
                    password : this.passwordSignIn
                }
            })
                .then((result) => {
                    console.log('from grandchild')
                    localStorage.setItem('token', result.data.token)
                    this.$emit('goHome')
                    console.log(result)
                })
                .catch((err) => {
                    console.log(err.response.data.error[0])
                    this.$swal('error',err.response.data.error[0],'error')
                })

        },
        onFailure() {
            console.log('err google')
        },
        onSuccess(googleUser) {
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
            const id_token = googleUser.getAuthResponse().id_token
            axios({
                method: 'post',
                url: 'http://localhost:3000/wp/loginGoogle',
                headers: {
                    name : profile.getName(),
                    email : profile.getEmail(),
                    id_token
                }
            })
                .then((result) => {
                    console.log('from grandchild')
                    localStorage.setItem('token', result.data.token)
                    this.$emit('goHome')
                    console.log(result)
                })
                .catch((err) => {   
                    this.$swal('error',err.response.data.error[0],'error')
                    console.log(err)
                })
        }
    }
}
</script>

<style>

</style>