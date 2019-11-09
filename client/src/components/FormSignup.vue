<template>
<div class="card">
    <h5 class="card-header">Mini Wordpress Signup</h5>
      <div class="card-body">
        <div class="form-layout">
        <form>
          <h3>Sign Up</h3>
            <div class="form-group">
                <label for="exampleInputUsername1">Username</label>
                <input v-model="nameReg" type="text" class="form-control" id="exampleInputUsername1" aria-describedby="emailHelp" placeholder="Ex: username">
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input v-model="emailReg" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ex: example@mail.com">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input v-model="passwordReg" type="password" class="form-control" id="exampleInputPassword1" placeholder="Ex: Password123">
                <a href="#" v-on:click.prevent="showSignin">Already have an acount?</a>
            </div>
          <button type="submit" class="btn btn-success" v-on:click.prevent="register">Sign Up</button>
        </form>
        </div>
      </div>
  </div>
</template>
<script>

import axios from 'axios'

export default {
    data(){
        return {
            nameReg: "",
            emailReg: "",
            passwordReg: "",
            baseURL: "http://localhost:3000"
        }
    },
    methods:{
        register(){
            axios({
                url: `${this.baseURL}/users/register`,
                method: 'POST',
                data:{
                    username: this.nameReg,
                    email: this.emailReg,
                    password: this.passwordReg
                }
            })
            .then(response => {
                console.log(response)
                this.nameReg = ""
                this.emailReg = ""
                this.passwordReg = ""
                this.showSignin()
            })
            .catch(err => {
                console.log(err)
            })
        },
        showSignin(){
          this.$emit('show-signin')
        }
    }
}
</script>
<style scoped>
.card{
  border: none;
}

.btn{
  border-radius: 25px;
}

.card-header{
  background-color: white;
  border: none
}

.btn{
    padding: 5px 20px;
}
</style>