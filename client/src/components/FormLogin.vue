<template>
  <div class="container">
      <div class="d-flex justify-content-center">
          <div class="row">
            <form id="FormLogin" class="card" @submit.prevent="login()" style="min-width: 600px; margin-top:90px;">
                <h1 class="card-header" style="color: white;">Login</h1>
                <div class="card-body">
                    <label>E-mail</label>
                    <br>
                    <input type="email" v-model="email" class="form-control" placeholder="Input your Email"/>
                    <br>
                    <label>Password</label>
                    <br>
                    <input type="password" v-model="password" class="form-control" placeholder="Input Your Password"/>
                    <br>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary" type="submit">Login</button>
                        <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
                    </div>
                </div>
            </form>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
import GoogleLogin from 'vue-google-login'
export default {
    name: 'Login',
    components: {
        GoogleLogin
    },
    data () {
        return {
            email: '',
            password: '',
            params: {
                client_id: '291856601506-pctu3kf6427nn8527jqa0a9tlv5i1s7f.apps.googleusercontent.com'
            },
            renderParams: {
                width: 150,
                height: 50,
                longtitle: false
            }
        }
    },
    methods: {
        login () {
            swal.fire({
                title: 'Logging your user',
                allowOutsideClick: () => swal.isLoading(),
                showConfirmButton: false
            })
            axios({
                url: 'http://hackpress-server.panji-h8.online/login',
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then (({ data }) => {
                console.log(data)
                swal.close()
                swal.fire({
                    title: 'Welcome to HackPress',
                    type: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                this.$emit('changeStatus', true)
                localStorage.setItem('token', data.token)
            })
            .catch ((err) => {
                console.log(err)
                swal.close()
                swal.fire({
                    title: 'Login Failed',
                    type: 'error',
                    timer: 2000,
                    text: err.response.data
                })
            })
        },
        onSuccess(googleUser) {
            var id_token = googleUser.getAuthResponse().id_token
            axios({
                url: 'http://hackpress-server.panji-h8.online/loginGoogle',
                method: 'post',
                data: {
                    token: id_token
                }
            })
            .then (({ data }) => {
                swal.close()
                swal.fire({
                    title: 'Welcome to HackPress',
                    type: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                localStorage.setItem('token', data.token)
                this.$emit('changeStatus', true)
            })
            .catch (err => {
                swal.close()
                swal.fire({
                    type: 'error',
                    title: 'Login Failed ',
                    text: err.responseJSON,
                    showConfirmButton: false,
                    timer: 2000
                })
            })
        },
        onFailure (googleUser) {
            swal.fire({
                    type: 'error',
                    title: 'Login Failed ',
                    text: err.responseJSON,
                    showConfirmButton: false,
                    timer: 2000
                })
        }  
    }
}

</script>

<style>
.card-header {
    background-color: #96d1c7;
}
</style>