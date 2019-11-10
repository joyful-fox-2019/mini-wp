<template>
  <div>
    <Loginform v-if="!isloginform" @registerpage="showRegisterForm" @goHome="changeLogin"></Loginform>
    <Registerform v-else @loginpage="showLoginForm" @changeLogin="changeLogin"></Registerform>
  </div>
</template>

<script>
import Registerform from '../components/register'
import Loginform from '../components/login'

export default {
    components: {
        Registerform,
        Loginform
    },
    data() {
        return {
            isloginform : false
            }
    },
    methods: {
        showRegisterForm() {
            this.isloginform = true
        },
        showLoginForm() {
            this.isloginform = false
        },
        changeLogin() {
            console.log('from child')
            this.$emit('changeLogin')
        },

    },
    watch: {
        isloginform() {}
    }
}
</script>

<style>

</style>