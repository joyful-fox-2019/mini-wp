<template>
    <div id="apps">
        <div id="home" v-if="inHome">
            <Home :displayLogin="displayLogin" :displayRegister="displayRegister" />
        </div>

        <div v-if="inLogin" id="login">
            <Login :displayHome="displayHome" :displayRegister="displayRegister" :displayMySite="displayMySite"/>
        </div>

        <div v-if="inRegister" id="register">
            <Register :displayHome="displayHome" :displayLogin="displayLogin" :displayMySite="displayMySite"/>
        </div>
        
        <div id="mysite" v-if="inMySite">
            <MySite :displayHome="displayHome" :displayMySite="displayMySite"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import MySite from './views/MySite'

export default {
    name: 'App',
    components: {
        Home, 
        Login, 
        Register,
        MySite
    },
    data () {
        return {
            inHome: true,
            inLogin: false,
            inRegister: false,
            inMySite: false
        }
    },
    methods: {
        checktoken() {
            const token = localStorage.getItem('token') 
            if (token) {
                this.displayMySite()
            } else {
                this.displayHome()
            }
        },
        displayHome() {
            this.inHome = true
            this.inLogin = false
            this.inRegister = false
            this.inMySite = false
        },
        displayLogin() {
            this.inHome = false
            this.inLogin = true
            this.inRegister = false
            this.inMySite = false
        },
        displayRegister() {
            this.inHome = false
            this.inLogin = false
            this.inRegister = true
            this.inMySite = false
        },
        displayMySite() {
            this.inHome = false
            this.inLogin = false
            this.inRegister = false
            this.inMySite = true
        }
    },
    created() {
        this.checktoken()
    }
}
</script>

<style>
#home {
    background-color: #0087BE;
    height: 100vh
}

</style>