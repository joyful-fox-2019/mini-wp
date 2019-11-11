<template>
  <div>
    <div class="form-header">
      <h1>Register Account</h1>
    </div>
    <div class="form-content">
      <form>
        <div class="form-group"><label for="username">Username</label><input type="text" id="username" v-model="usernameReg"/></div>
        <div class="form-group"><label for="email">Email Address</label><input type="text" id="email" v-model="emailReg"/></div>
        <div class="form-group"><label for="password">Password</label><input type="password" id="password" v-model="passwordReg"/></div>
        <div class="form-group"><button type="submit" @click="register">Register</button></div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '../../apis/server'
import Swal from 'sweetalert2'

export default {
	name: 'registerform',
	data() {
		return {
			usernameReg: '',
			emailReg: '',
			passwordReg: '',
			Toast : Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 1500
			})
		}
	},
	methods: {
		register(){
			axios({
				method: 'post',
				url: '/register',
				data: {
					username: this.usernameReg,
					email: this.emailReg,
					password: this.passwordReg
				}
			})
				.then(({ data }) => {
					localStorage.setItem('token', data.token)
					localStorage.setItem('name', data.username)

					this.$emit('isLoginStatus', true)

					this.Toast.fire({
						icon: 'success',
						title: 'Register successfully'
					})
				})
				.catch(err => {
					Swal.fire({
						icon: 'error',
						title: 'Sorry,',
						text: err.response.data.errors.join(', ')
					})
				})
		}
	},

}
</script>

<style>

</style>