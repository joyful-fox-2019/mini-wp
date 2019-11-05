<template>
    <div class="loginRegisSection">
        <div class="form-wrapper" id="wrapper-login">
            <img src='../../assets/bg2.jpg' alt='bg1' />
            <div class="content-wrapper" id="content-signin">
                <h1>Welcome to Mini Wordpress</h1>

                <form class="form-login" @submit.prevent="login()">
                    <input type="text" name="email" placeholder="email" class="input-email;" v-model="emailLogin"/>
                    <input type="password" name="password" placeholder="Password" class="input-password" v-model="passwordLogin"/>
                    <div v-if="isError" style="background-color: white; border-radius:3px; white-space: pre-wrap;">
                        <p class="error" style="color:red; text-align:center;">{{ errMsg }}</p>
                    </div>
                    <button type="submit" class="btn-login">LOGIN</button>
                    <div style="display:flex; justify-content:center; padding-top:10px;">
                        <div id="google-signin-button"></div>
                    </div>
                </form>

                <p>No account? <a href="#wrapper-signup">Sign up</a></p>
            </div>
        </div>
        <!-- END OF LOGIN -->
        <!-- REGISTER -->
        <div class="form-wrapper" id="wrapper-signup">
            <img src='../../assets/bg2.jpg' alt='bg1' />
            <div class="content-wrapper" id="content-signin">
                <h1>Join us!</h1>
                <form class="form-login" @submit.prevent="register()">
                    <input type="email" name="email" placeholder="Email address" class="input-email" v-model="emailReg"/>
                    <input type="text" name="username" placeholder="Fullname" class="input-username" v-model="nameReg"/>
                    <input type="password" name="password" placeholder="Password" class="input-password" v-model="passwordReg"/>
                    <div v-if="isError" style="background-color: white; border-radius:3px; white-space: pre-wrap;">
                        <p class="error" style="color:red; text-align:center;">{{ errMsg }}</p>
                    </div>
                    <button type="submit" class="btn-login">SIGN UP</button>
                </form>
                <p>Got account? <a href="#wrapper-login">Sign in</a></p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../apis/server'
import Swal from 'sweetalert2'

export default {
    name : 'Login',
    props: [
        'user'
    ],
    data() {
        return {
            emailLogin : '',
            passwordLogin : '',
            emailReg : '',
            nameReg : '',
            passwordReg : '',
            isError : false,
            errMsg : ''
        }
    },
    methods : {
        login() { 
            axios({
                method: 'POST',
                url : `/users/login`,
                data : {
                    email : this.emailLogin,
                    password : this.passwordLogin
                }
            })
                .then(({data})=>{
                    this.emailLogin = ''
                    this.passwordLogin = ''
                    this.$emit('userData',data.name,data.email)
                    this.$emit('changeLogin',true)
                    localStorage.setItem('token',data.token)
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    })
        
                    Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    })
                })
                .catch(err=>{
                    
                    this.isError = true
                    this.errMsg = err.response.data.message
                })

        },
        register() {
            axios({
                method: 'POST',
                url : `/users/register`,
                data : {
                    email : this.emailReg,
                    password : this.passwordReg,
                    name : this.nameReg
                }
            })
                .then(({data})=>{
                    this.emailReg = ''
                    this.nameReg = ''
                    this.passwordReg = ''
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    })
        
                    Toast.fire({
                        icon: 'success',
                        title: 'Register success'
                    })
                })
                .catch(err=>{
                    let errors = err.response.data.message
                    
                    this.isError = true
                    this.errMsg = err.response.data.message.join('\n')
                })
        },
        onSignIn(googleUser) {
            const profile = googleUser.getBasicProfile();
            // console.log('Name: ' + profile.getName());
            // console.log('Image URL: ' + profile.getImageUrl());
            // console.log('Email: ' + profile.getEmail());
            this.$emit('userData',profile.getName(),profile.getEmail())
            const id_token = googleUser.getAuthResponse().id_token
            axios({
                url : '/users/googleSign',
                method : 'POST',
                data : {
                    id_token
                }
            })
                .then(({data})=>{
                    this.$emit('changeLogin',true)
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    })
        
                    Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    })
                    localStorage.setItem('token',data.token)
                    localStorage.setItem('name',data.name)
                    localStorage.setItem('_id',data._id)
                })
                .catch(err=>{
                    Swal.fire('error','error','error')
                })
        }

    },
    mounted() {
        // $(document).ready(function () {
            gapi.signin2.render('google-signin-button', {
              onsuccess: this.onSignIn
            })
        // })
  }
}



</script>

<style scoped>
 ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #fff;
  opacity: .7; /* Firefox */
}

.loginRegisSection h1{
    font-size: 110%;
}

.form-wrapper {
    width: 320px;
    height: 500px;
    border-radius: 4px;
    background: rgba(99, 110, 114,1.0);
    color: #FDF3F8;
    box-shadow: 0px 1px 10px 3px rgb(255, 255, 255);
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    overflow: hidden;
}

.form-wrapper img {
    height: 100%;
    position: absolute;
    top: 0;
    /* left: -50%; */
    opacity: .3;
    -webkit-filter: blur(3px);
    filter: blur(3px);
}

.form-wrapper .content-wrapper {
    position: relative;
    opacity: 1;
    width: 320px;
    height: 500px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-flow: column;
    -ms-flex-flow: column;
    flex-flow: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}

.form-login {
    margin: 4rem auto;
}
.form-login .error {
    color: red;
}
.form-login input {
    margin: 5px auto;
    display: block;
    border-radius: 4px;
    background: none;
    color: rgba(253, 243, 248, 1);
    border: 2px solid rgba(255, 255, 255, 0.8);
    padding: 10px;
    width: 200px;
    font-weight: bolder;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
}

.form-login button {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    display: block;
    font-weight: bolder;
    color: #FDF3F8;
    background: black;
    border: none;
    border-radius: 4px;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
}

.form-login input:focus {
    outline: none;
    color: rgba(253, 243, 248, 1);
    background: black;
    border-width: 2px;
    border-style: solid;
    border-color: black;
}

.form-login input:hover {
    color: rgba(253, 243, 248, 1);
    background: black;
    border-width: 2px;
    border-style: solid;
    border-color: black;
}

.form-login button:hover {
    cursor: pointer;
    box-shadow: 0px 1px 10px 1px black;
}

.form-wrapper .content-wrapper p {
    font-size: 100%;
    color: rgba(223, 214, 217, .6);
}

.form-wrapper .content-wrapper a {
    color: #FDF3F8;
    text-decoration: none;
}

#wrapper-signup {
    opacity: 0;
    pointer-events: none;
}

#wrapper-signup:target {
    display: block;
    opacity: 1;
    pointer-events: all;
}

#wrapper-signup:target #wrapper-login,
#wrapper-signin:target #wrapper-signup {
    opacity: 0;
    pointer-events: none;
}

#wrapper-signup,
#wrapper-login {
    -webkit-transition: .2s linear all;
    transition: .2s linear all;
}
</style>