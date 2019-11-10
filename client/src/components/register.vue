<template>
            <section class="section-register" >
            <div class="form">
                
                <header class="header-login">
                    <div class="border"></div>
                </header>
                <!-- Sign up / Registration Form -->
                
                <div class="register">
                     <h1 class="h1-login">Join for free!</h1>
                     <p class="accounta">Already have an account? <a href="#" v-on:click.prevent="showLoginForm()">Sign in</a></p>
                     <form>
                         <div class="form-item">
                             <label for="input">username</label>
                             <input v-model="username" type="text" class="field" name="email" placeholder="username" value required>
                         </div>
                         <div class="form-item">
                             <label for="input">email address</label>
                             <input v-model="emailRegister" type="email" class="field" name="email" placeholder="someone@example.com" value required>
                         </div>
                         <div class="form-item">
                             <label for="input">password</label>
                             <input v-model="passwordRegister" type="password" id="password" class="field" name="password" placeholder="password" value required>
                         </div>
                         <div class="form-item">
                             <button v-on:click.prevent="signUp" type="button" class="reg-btn">Sign up</button>
                         </div>
 
                     </form>
                 </div>
             </section> 
</template>

<script>
import axios from 'axios'

export default {
    name:'Registerform',
    data() {
        return {
            username : '',
            emailRegister : '',
            passwordRegister : ''
        }
    },
    methods: {
        showLoginForm() {
            this.$emit('loginpage')           
        },
        signUp() {
            axios({
                method: 'post',
                url: 'http://localhost:3000/wp/register',
                data: {
                    username : this.username,
                    email : this.emailRegister,
                    password : this.passwordRegister
                }
            })
                .then((result) => {
                    console.log(result)
                })
                .catch((err) => {
                    console.log(err)
                    this.$swal('error',err.response.data.error[0],'error')

                })

        }
    }

}
</script>

<style>

</style>