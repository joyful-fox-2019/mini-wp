<template>
  <div class="container">
      <div class="d-flex justify-content-center">
          <div class="row">
            <form id="FormRegister" class="card" @submit.prevent="register()" style="min-width: 600px; margin-top:90px;">
                <h1 class="card-header" style="color: white;">Register</h1>
                <div class="card-body">
                    <label>Name</label>
                    <br>
                    <input type="text" v-model="name" class="form-control" placeholder="Input your name"/>
                    <label>E-mail</label>
                    <br>
                    <input type="email" v-model="email" class="form-control" placeholder="Input your Email"/>
                    <br>
                    <label>Password</label>
                    <br>
                    <input type="password" v-model="password" class="form-control" placeholder="Input Your Password"/>
                    <br>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary" type="submit">Register</button>
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
export default {
    name: 'Register',
    data () {
        return {
            email: '',
            password: '',
            name: ''
        }
    },
    methods: {
        register () {
            swal.fire({
                title: 'Registering new user',
                allowOutsideClick: () => swal.isLoading(),
                showConfirmButton: false
            })
            axios({
                url: 'http://hackpress-server.panji-h8.online/register',
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password,
                    name: this.name
                }
            })
            .then (({ data }) => {
                swal.close()
                swal.fire({
                    title: 'Success Registering new User',
                    type: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                console.log(data)
                this.$emit('changePage', 'Login')
                this.email = ''
                this.password = ''
                this.name = ''
            })
            .catch ((err) => {
                console.log(err)
                swal.close()
                swal.fire({
                    title: 'Failed registering new User',
                    type: 'error',
                    showConfirmButton: false,
                    text: err.response.data,
                    timer: 2000
                })
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