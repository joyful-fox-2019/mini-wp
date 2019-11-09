<template>
    <div>
        <navbar @sign-out="signout" :isLogin="isLogin"></navbar>
        <login v-if="loginShow === true" @show-signup="showSignUp" @show-mainpage="showMainPage"></login>
        <signup v-if="registerShow === true" @show-signin="showSignin"></signup>
        <mainpage v-if="isLogin !== '' "></mainpage>
    </div>
</template>
<script>

import login from './views/Login'
import signup from './views/Signup'
import mainpage from './views/MainPage'
import navbar from './components/Navbar'

export default {
    components:{
        login,
        signup,
        navbar,
        mainpage
    },
    data(){
        return {
            loginShow: true,
            registerShow: false,
            isLogin: ''
        }
    },
    methods:{
        showSignUp(){
            this.loginShow = false;
            this.registerShow = true;
        },
        showSignin(){
            this.loginShow = true;
            this.registerShow = false;
        },
        showMainPage(){
            this.isLogin = true
            this.loginShow = false
            this.registerShow = false
        },
        signout(){
            localStorage.clear()
            this.loginShow = true;
            this.isLogin = ''
        }
    },
    created(){
        let login = localStorage.getItem('token')
        if(login){
            this.isLogin = login
            this.loginShow = false
            this.registerShow = false
        }else{
            this.isLogin = ''
        }
    }
}
</script>
<style>
</style>