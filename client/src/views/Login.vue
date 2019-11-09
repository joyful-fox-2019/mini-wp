<template>
<div>
    <div class="container-fluid d-flex mt-5">
        <div class="w-50 d-flex justify-content-center align-items-center form">
            <loginform @show-signup="showSignUp" @show-mainpage="showMainPage"></loginform>
        </div>
        <div class="w-50 d-flex justify-content-center align-items-center form">
            <imageLogin></imageLogin>
        </div>
    </div>
</div>
</template>
<script>
import loginform from '../components/FormLogin'
import imageLogin from '../components/ImageLogin'
export default {
    components:{
        loginform,
        imageLogin
    },
    methods:{
        showSignUp(){
           this.$emit('show-signup');
        },
        showMainPage(){
            this.$emit('show-mainpage');
        }
    }
}
</script>
<style scoped>
.form{
    /* height: 100vh; */
    height: calc(100vh-56px);
}
</style>