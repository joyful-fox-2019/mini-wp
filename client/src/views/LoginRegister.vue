<template>
  <div>
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
</template>

<script>
import NavBar from '../components/NavBar'
import FormRegister from '../components/FormRegister'
import FormLogin from '../components/FormLogin'
export default {
    name: 'LoginRegister',
    components: {
        NavBar,
        FormRegister,
        FormLogin
    },
    data () {
        return {
            page: 'Login',
            isLogin: false
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
            this.$emit('loggedIn', this.isLogin)
        },
    }
}
</script>

<style>

</style>