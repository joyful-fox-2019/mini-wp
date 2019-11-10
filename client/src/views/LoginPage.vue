<template>
    <div class="container">
        <Login v-if="loginPage === 'login'" 
            :is-login="isLogin" 
            :page="page" 
            :login-page="loginPage"
            @set-login="setLogin" 
            @set-page="setPage"
            @set-login-page="setLoginPage">
        </Login>
        <Register v-else-if="loginPage === 'register'" 
            :is-login="isLogin" 
            :page="page" 
            :login-page="loginPage" 
            @set-login="setLogin" 
            @set-page="setPage"
            @set-login-page="setLoginPage">
        </Register>
    </div>
</template>

<script>
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

export default {
    name: "LoginPage",
    data: function(){
        return {
            loginPage: "login"
        };
    },
    props: {
        isLogin: Boolean,
        page: String
    },
    methods: {
        setLogin(value) {
            this.$emit("set-login", value);
        },
        setPage(page) {
            this.$emit("set-page", page);
        },
        setLoginPage(loginPage) {
            this.loginPage = loginPage;
        }
    },
    components: {
        Login,
        Register
    }
}
</script>

<style>

</style>