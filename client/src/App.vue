<template>
    <div>
        <div v-show="!isLogin">
            <nav-bar>
                <template v-slot:register>
                    <h2 @click="toRegister()">Register</h2>
                </template>
                <template v-slot:login>
                    <h2 @click="toLogin()">Login</h2>
                </template>
            </nav-bar>
            <form-register v-show="page == 'Register'" @changePage='changeTo'></form-register>
            <form-login v-show="page == 'Login'" @changeStatus='statusLogin'></form-login>
        </div>
        <div v-show="isLogin">
            <nav-bar>
                <template v-slot:search>
                    <input class="form-control" type="text" placeholder="Search" aria-label="Search" style="max-width:200px;">
                </template>
                <template v-slot:signout>
                    <button class="btn btn-danger ml-3" @click="signOut()">Sign Out</button>
                </template>
            </nav-bar>
            <Content :arrData="arrData"></Content>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import NavBar from './components/NavBar'
import FormLogin from './components/FormLogin'
import FormRegister from './components/FormRegister'
import Content from './components/Content'
import Footer from './components/Footer'
import axios from 'axios'
export default {
    components: {
        NavBar,
        FormLogin,
        FormRegister,
        Content,
        Footer
    },
    data() {
        return {
            search: '',
            page: '',
            isLogin: false,
            arrData: []
        }
    },
    methods: {
        toRegister() {
            this.page = 'Register'
        },
        toLogin() {
            this.page = 'Login'
        },
        changeTo (input) {
            this.page = input
        },
        statusLogin (input) {
            this.isLogin = input
        },
        signOut () {
            this.isLogin = false
            this.page = 'Login'
            var auth2 = gapi.auth2.getAuthInstance()
            localStorage.clear()
            auth2.signOut().then(function () {
            })
            swal.fire({
                type: 'success',
                title: 'success to Logout',
                showConfirmButton: false,
                timer: 2000
            })
        },
        showList () {
            axios({
                url: 'http://localhost:3000/news',
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
                })
                .then (({ data }) => {
                this.arrData = data
                console.log(data)
                // this.$emit('ArrData', data)
            })
        }
    },
    created () {
        if (localStorage.getItem('token')) {
            this.isLogin = true
        }
        this.page = 'Login'
        this.showList()
    }
}
</script>

<style>

</style>