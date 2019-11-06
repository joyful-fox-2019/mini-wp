<template>
    <form id="register-form" class="flex flex-wrap bg-white shadow-2xl rounded p-10 justify-center" @submit.prevent="register">
      <div class="w-full"><h1 style="text-align: center;">Register New Account</h1></div>
      <div class="w-full"><h4 style="text-align: center;">Or <span class="hover:text-blue-500 cursor-pointer" style="text-decoration: underline;" @click="goLogin">Login Instead</span></h4></div>
      <input v-model="name" type="text" class="p-2 mx-4 mt-10 w-3/4" placeholder="Name">        
      <input v-model="email" type="email" class="p-2 mx-4 mt-4 w-3/4" placeholder="Email Address">
      <input v-model="password" type="password" class="p-2 mx-4 my-4 w-3/4" placeholder="Password">
      <div class="w-3/4 flex justify-center my-2">
        <input id="register-btn" type="submit" class="p-2 rounded cursor-pointer hover:bg-gray-600 bg-gray-400 text-white w-full" value="Register">
      </div>
    </form>
</template>

<script>
import axios from '../config/axios'
export default {
  data() {
    return {
      email: '',
      password: '',
      name: ''
    }
  }, 
  methods: {
    goLogin () {
      this.$emit('goLogin')
    },
    register () {
      const name = this.name
      const email = this.email
      const password = this.password

      axios({
        method: 'POST',
        url: '/users/register',
        data: {
          name, email, password
        }
      })
      .then(({ data }) =>{
        //alert success registration
        this.goLogin()
      })
      .catch(({ response }) => {
        console.log(response.data)
      })
    }  
  }
}
</script>

<style>

</style>