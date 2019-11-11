<template>
  <form @submit.prevent="login">
    <div class="form-group"><label for="username">Email</label><input type="text" id="username" v-model="emailLog" /></div>
    <div class="form-group"><label for="password">Password</label><input type="password" id="password" v-model="passwordLog"/></div>
    <div class="buttonlogin">
      <div class="form-group widthpenuh"><button type="submit" class="butlog">Log In</button></div>
      <div>
        <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError">
          <i class="fab fa-google"></i>
        </g-signin-button>
      </div>
    </div>
  </form>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import axios from '../../apis/server'
import Swal from 'sweetalert2'

export default {
  name: 'loginform',
  components: {
    GoogleLogin
  },
  data() {
    return {
      params: {
				client_id: "910242603213-7er4umrrrnigsq9q4jve2drgcbl4avvm.apps.googleusercontent.com"
			},
			renderParams: {
				width: 250,
				height: 50,
				longtitle: true
			},
			googleSignInParams: {
        client_id: '910242603213-7er4umrrrnigsq9q4jve2drgcbl4avvm.apps.googleusercontent.com'
      },
			emailLog: '',
			passwordLog: '',
			Toast : Swal.mixin({
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 1500
			})
    }
  },
  methods : {
    login(){
			axios({
				method: 'post',
				url: '/login',
				data: {
					email: this.emailLog,
					password: this.passwordLog
				}
			})
				.then(({ data }) => {
					localStorage.setItem('token', data.token)
					localStorage.setItem('name', data.username)

					this.$emit('isLoginStatus', true)

					this.Toast.fire({
						icon: 'success',
						title: 'Login successfully'
					})
				})
				.catch(err => {
					Swal.fire({
						icon: 'error',
						title: 'Sorry,',
						text: err.response.data.errors.join(', ')
					})
				})
		},
		onSignInSuccess (googleUser) {
			var id_token = googleUser.getAuthResponse().id_token;   
			axios({
					url: 'http://localhost:3000/signGoogle',
					method: 'post',
					data:{
							id_token
					}
			})
				.then(({ data }) => {
					localStorage.setItem('token', data.token)
					localStorage.setItem('name', data.username)

					this.$emit('isLoginStatus', true)

					this.Toast.fire({
						icon: 'success',
						title: 'Login successfully'
					})
				})
		},
		onSignInError(error){
			Swal.fire({
				icon: 'error',
				title: 'Sorry,',
				text: "Login Google Failed"
			})
		}
  }
}
</script>

<style>
.buttonlogin {
	display: flex;
	justify-content: space-between;
	align-content: flex-start;
	align-items: flex-start;
	margin: 0px;
}

.butlog{
	height: 70%;
	margin: 0px;
}

.widthpenuh{
	width: 90% !important;
	margin: 0px;
}

.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 12px 12px;
  border-radius: 3px;
	margin: 0px;
  background-color: #3c82f7;
  color: #fff;
	height: 100%;
	cursor: pointer;
}

body {
	 color: rgba(0, 0, 0, 0.6);
	 font-family: "Roboto", sans-serif;
	 font-size: 14px;
	 line-height: 1.6em;
	 -webkit-font-smoothing: antialiased;
	 -moz-osx-font-smoothing: grayscale;
}
 .overlay, .form-panel.one:before {
	 position: absolute;
	 top: 0;
	 left: 0;
	 display: none;
	 background: rgba(0, 0, 0, 0.8);
	 width: 100%;
	 height: 100%;
}
 .form {
	 z-index: 15;
	 position: relative;
	 background: #fff;
	 width: 600px;
	 border-radius: 4px;
	 box-shadow: 0 0 30px rgba(0, 0, 0, .1);
	 box-sizing: border-box;
	 margin: 100px auto 10px;
	 overflow: hidden;
}
 .form-toggle {
	 z-index: 10;
	 position: absolute;
	 top: 60px;
	 right: 60px;
	 background: #fff;
	 width: 60px;
	 height: 60px;
	 border-radius: 100%;
	 transform-origin: center;
	 transform: translate(0, -25%) scale(0);
	 opacity: 0;
	 cursor: pointer;
	 transition: all 0.3s ease;
}
 .form-toggle:before, .form-toggle:after {
	 content: '';
	 display: block;
	 position: absolute;
	 top: 50%;
	 left: 50%;
	 width: 30px;
	 height: 4px;
	 background: #4285f4;
	 transform: translate(-50%, -50%);
}
 .form-toggle:before {
	 transform: translate(-50%, -50%) rotate(45deg);
}
 .form-toggle:after {
	 transform: translate(-50%, -50%) rotate(-45deg);
}
 .form-toggle.visible {
	 transform: translate(0, -25%) scale(1);
	 opacity: 1;
}
 .form-group {
	 display: flex;
	 flex-wrap: wrap;
	 justify-content: space-between;
	 margin: 0 0 20px;
}
 .form-group:last-child {
	 margin: 0;
}
 .form-group label {
	 display: block;
	 margin: 0 0 10px;
	 color: rgba(0, 0, 0, 0.6);
	 font-size: 12px;
	 font-weight: 500;
	 line-height: 1;
	 text-transform: uppercase;
	 letter-spacing: 0.2em;
}
 .two .form-group label {
	 color: #fff;
}
 .form-group input {
	 outline: none;
	 display: block;
	 background: rgba(0, 0, 0, 0.1);
	 width: 100%;
	 border: 0;
	 border-radius: 4px;
	 box-sizing: border-box;
	 padding: 12px 20px;
	 color: rgba(0, 0, 0, 0.6);
	 font-family: inherit;
	 font-size: inherit;
	 font-weight: 500;
	 line-height: inherit;
	 transition: 0.3s ease;
}
 .form-group input:focus {
	 color: rgba(0, 0, 0, 0.8);
}
 .two .form-group input {
	 color: #fff;
}
 .two .form-group input:focus {
	 color: #fff;
}
 .form-group button {
	 outline: none;
	 background: #4285f4;
	 width: 100%;
	 border: 0;
	 border-radius: 4px;
	 padding: 12px 20px;
	 color: #fff;
	 font-family: inherit;
	 font-size: inherit;
	 font-weight: 500;
	 line-height: inherit;
	 text-transform: uppercase;
	 cursor: pointer;
}
 .two .form-group button {
	 background: #fff;
	 color: #4285f4;
}
 .form-group .form-remember {
	 font-size: 12px;
	 font-weight: 400;
	 letter-spacing: 0;
	 text-transform: none;
}
 .form-group .form-remember input[type='checkbox'] {
	 display: inline-block;
	 width: auto;
	 margin: 0 10px 0 0;
}
 .form-group .form-recovery {
	 color: #4285f4;
	 font-size: 12px;
	 text-decoration: none;
}
 .form-panel {
	 padding: 60px calc(5% + 60px) 60px 60px;
	 box-sizing: border-box;
}
 .form-panel.one:before {
	 content: '';
	 display: block;
	 opacity: 0;
	 visibility: hidden;
	 transition: 0.3s ease;
}
 .form-panel.one.hidden:before {
	 display: block;
	 opacity: 1;
	 visibility: visible;
}
 .form-panel.two {
	 z-index: 5;
	 position: absolute;
	 top: 0;
	 left: 95%;
	 background: #4285f4;
	 width: 100%;
	 min-height: 95vh;
	 padding: 60px calc(10% + 60px) 60px 60px;
	 transition: 0.3s ease;
	 cursor: pointer;
}
 .form-panel.two:before, .form-panel.two:after {
	 content: '';
	 display: block;
	 position: absolute;
	 top: 60px;
	 left: 1.5%;
	 background: rgba(255, 255, 255, 0.2);
	 height: 30px;
	 width: 2px;
	 transition: 0.3s ease;
}
 .form-panel.two:after {
	 left: 3%;
}
 .form-panel.two:hover {
	 left: 93%;
	 box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
 .form-panel.two:hover:before, .form-panel.two:hover:after {
	 opacity: 0;
}
 .form-panel.two.active {
	 left: 10%;
	 box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	 cursor: default;
}
 .form-panel.two.active:before, .form-panel.two.active:after {
	 opacity: 0;
}
 .form-header {
	 margin: 0 0 40px;
}
 .form-header h1 {
	 padding: 4px 0;
	 color: #4285f4;
	 font-size: 24px;
	 font-weight: 700;
	 text-transform: uppercase;
}
 .two .form-header h1 {
	 position: relative;
	 z-index: 40;
	 color: #fff;
}
 .pen-footer {
	 display: flex;
	 flex-direction: row;
	 justify-content: space-between;
	 width: 600px;
	 margin: 20px auto 100px;
}
 .pen-footer a {
	 color: #fff;
	 font-size: 12px;
	 text-decoration: none;
	 text-shadow: 1px 2px 0 rgba(0, 0, 0, .1);
}
 .pen-footer a .material-icons {
	 width: 12px;
	 margin: 0 5px;
	 vertical-align: middle;
	 font-size: 12px;
}
 .cp-fab {
	 background: #fff !important;
	 color: #4285f4 !important;
}
</style>