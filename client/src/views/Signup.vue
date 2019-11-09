<template>
    <div>
    <div class="container-fluid d-flex mt-5">
        <div class="w-50 d-flex justify-content-center align-items-center form">
            <signupForm @show-signin="showSignin"></signupForm>
        </div>
        <div class="w-50 d-flex justify-content-center align-items-center form">
            <imageLogin></imageLogin>
        </div>
    </div>
</div>
</template>
<script>

import imageLogin from '../components/ImageLogin'
import signupForm from '../components/FormSignup'

export default {
    components:{
        imageLogin,
        signupForm
    },
    methods:{
        signUpShow(){
           this.$emit('signup-show')
        },
        showSignin(){
            this.$emit('show-signin')
        }
    }
    
}
</script>
<style>
.form{
    height: calc(100vh-56px);
    /* height: 100vh; */
}
</style>