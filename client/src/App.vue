<template>
    <div>
        <Login 
        v-if="page==='login'"
        @switchPage="switchPage"
        @statusLogin="statusLogin"
        ></Login>
        <Register 
        v-if="page==='register'"
        @switchPage="switchPage"
        ></Register>
        <Main
        v-if="page==='main'"
        :isLogin="isLogin"
        @switchPage="switchPage"
        @statusLogin="statusLogin"
        ></Main>
    </div>
</template>

<script>
import Login from '../src/Views/Login'
import Register from '../src/Views/Register'
import Main from './Views/Main'
export default {
    components : {
        Login,
        Register,
        Main
    },
    data (){
        return {
            isLogin : false,
            page: 'main',
        }
    },
    methods : {
        switchPage(page){
            this.page = page
        },
        statusLogin(status){
            this.isLogin = status
        }
    },
    created(){
        if(localStorage.getItem('token')){
            this.isLogin = true
        }
    }

}
</script>


<style>

</style>