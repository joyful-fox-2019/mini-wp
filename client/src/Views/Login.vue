<template>
  <div style="height:100vh" class="text-center">
    <button @click="toHome" class="btn btn-sm btn-info ml-3 mr-auto">Back</button>
    <form @submit.prevent="login" class="form-signin">
      <h1> <strong>D-Blog </strong> <span> <img class="mb-4" src="https://avatars0.githubusercontent.com/u/53108094?s=460&v=4" alt="" width="72" height="72"> </span></h1>
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="text" id="inputEmail" class="form-control my-2" placeholder="Email address">
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control my-2" placeholder="Password">
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <div class="p-2 d-flex justify-content-center">
          <p class="mb-0">Not a member? <a @click="toRegister" href="#">Register Here!</a></p>
      </div>
      <div class="p-0 mt-1">
         <p>Or you can login with : </p>
         <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError">
          <span> <img src="../../gicon.png" width="20"> </span>
          Login with Google
        </g-signin-button>
      </div>
      <p class="mt-5 text-muted">&copy; D-Blog 2019</p>
    </form>
  </div>
</template>

<script>
import axios from '../../myAxios/axios'
import Swal from'sweetalert2'
export default {
    data(){
        return{
            email : '',
            password : '',
            googleSignInParams: {
              client_id: '33310658172-lnce6rkge8qo88c82pgkn71ilulso1f0.apps.googleusercontent.com'
            }
        }
    },
    methods : {
        onSignInSuccess (googleUser) {
          let id_token = googleUser.getAuthResponse().id_token
          axios.post('/gsign',{
              id_token
          })
          .then(({data})=>{
              localStorage.setItem('token', data.token)
              localStorage.setItem('user', data.payload.username)
              Swal.fire({
                icon: 'success',
                title: 'Successfully Login',
                text:`Welcome ${data.payload.username}`
              })
              this.$emit('statusLogin', true)
              this.$emit('switchPage', 'main')
          })
          .catch(err=>{
              Swal.fire({
                icon: 'error',
                title: err.response.data.message
              })
          })
        },
        onSignInError (error) {
          console.log('OH NOES', error)
        },
        toHome(){
            this.$emit('switchPage', 'main')
        },
        toRegister(){
            this.$emit('switchPage', 'register')
        },
        login(){
            axios.post('/login',{
                email : this.email,
                password : this.password
            })
            .then(({data})=>{
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', data.payload.username)
                Swal.fire({
                  icon: 'success',
                  title: 'Successfully Login',
                  text:`Welcome ${data.payload.username}`
                })
                this.$emit('statusLogin', true)
                this.$emit('switchPage', 'main')
            })
            .catch(err=>{
                Swal.fire({
                  icon: 'error',
                  title: err.response.data.message
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
  padding: 15px;
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

.g-signin-button {

  display: inline-block;
  background: white;
  color: #444;
  width: 190px;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  white-space: nowrap;
  padding: 4px 8px;
  cursor: pointer;


  /* display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff; */  
}

</style>