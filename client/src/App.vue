<template>
    <div>
        <div v-show="!isLogin">
            <login-register @loggedIn='loggedIn'></login-register>
        </div>
        <div v-show="isLogin">
            <Home @loggedIn='loggedIn'></Home>
        </div>
    </div>
</template>

<script>

import LoginRegister from './views/LoginRegister'
import Home from './views/Home'
import Footer from './components/Footer'
export default {
    components: {
        LoginRegister,
        Home,
        Footer
    },
    data() {
        return {
            isLogin: false 
        }
    },
    methods: {
        loggedIn (input) {
            this.isLogin = input
        }
    },
    created () {
        if (localStorage.getItem('token')) {
            this.isLogin = true
        }
    }
}
</script>

<style>

</style>