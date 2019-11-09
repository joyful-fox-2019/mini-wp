<template>
  <div style="height:100vh" class="text-center">
    <button @click="toLoginPage" class="btn btn-sm btn-info ml-3 mr-auto">Back</button>
    <form @submit.prevent="register" class="form-signin">
      <h1> <strong>D-Blog </strong> <span> <img class="mb-4" src="https://avatars0.githubusercontent.com/u/53108094?s=460&v=4" alt="" width="72" height="72"> </span></h1>
      <h1 class="h3 mb-3 font-weight-normal">Register</h1>
      <label for="inputUserName" class="sr-only">Username</label>
      <input v-model="registerUsername" type="userName" id="inputUserName" class="form-control my-2" placeholder="Username">
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="registerEmail" type="text" id="inputEmail" class="form-control my-2" placeholder="Email address">
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="registerPassword" type="password" id="inputPassword" class="form-control my-2" placeholder="Password">
      <button class="btn btn-lg btn-primary btn-block" type="submit">Register!</button>
      <p class="mt-3 text-muted">&copy; D-Blog 2019</p>
    </form>
  </div>
</template>

<script>

import axios from '../../myAxios/axios'
import Swal from'sweetalert2'
export default {
    data(){
        return{
            registerUsername : '',
            registerEmail : '',
            registerPassword : ''
        }
    },
    methods : {
        toLoginPage(){
            this.$emit('switchPage', 'login')
        },
        register(){
            axios.post('/register',{
                username : this.registerUsername,
                email : this.registerEmail,
                password : this.registerPassword
            })
            .then(({data})=>{
                Swal.fire({
                  icon: 'success',
                  title: 'Successfully Registered',
                  text:`Hi ${data.username}, you're now a member of D-blog`
                })
                this.registerUsername = ''
                this.registerEmail = ''
                this.registerPassword = ''
                
            })
            .catch(err=>{
                Swal.fire({
                  icon: 'error',
                  title: err.response.data.message.join('\n'),
                })              
            })
        }
    }
}
</script>

<style scoped>
div {
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 500px;
  padding: 10px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>