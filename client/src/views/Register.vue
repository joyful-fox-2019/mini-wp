<template>
  <div id="register">
      <div id="navbar">
          <nav id="nav" class="navbar navbar-dark">
            <div id="nav-container">
                <div id="nav-left">
                    <a href="#" @click="displayHome"><img id="nav-logo" src="https://i.imgur.com/gMfJ8nX.png" alt="" srcset=""></a>
                    <a href="#" @click="displayHome"><h3 style="color: white; font-weight: bold; margin-left: 5px">WordCross</h3></a>
                </div>
                <div id="nav-right">
                    <button type="button" @click="displayLogin()" class="btn btn-outline-light btn-lg home-btns" style="margin-left: 1210px">Login</button>
                </div>
            </div>
        </nav>
      </div>

      <div id="register-form" class="register-container">
        <center>
          <form class="form-login" @submit.prevent="register()">
              <ul class="login-nav">
                  <li class="login-nav__item active">
                      <a href="#">Sign Up</a>
                  </li>
              </ul>
              <label for="login-input-name" class="login__label">
                  Name
              </label>
              <input id="register-name" v-model="registerData.name" class="login__input" type="text" />

              <label for="login-input-email" class="login__label">
                  Email
              </label>
              <input id="register-email" v-model="registerData.email" class="login__input" type="text" />

              <label for="login-input-password" class="login__label">
                  Password
              </label>
              <input id="register-password" v-model="registerData.password" class="login__input" type="password" /><br><br>

              <button type="submit" class="login__submit">Sign Up</button>
          </form>
        </center>
      </div>

  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Register',
  props: ['displayHome', 'displayLogin', 'displayMySite'],
  data () {
	return {
		registerData: {
			name: '',
			email: '',
			password: '',
		},
	}
  },
  methods: {
	register() {
		axios({
			method: 'post',
			url: `http://localhost:3000/register`,
			data: {
				name: this.registerData.name,
				email: this.registerData.email,
				password: this.registerData.password
			}
		})
			.then(({data}) => {
				this.displayMySite()
				Swal.fire(
					'Register Success!',
					`Welcome, ${data.userData.name}!`,
					'success'
				)
				localStorage.setItem('token', data.token)
			})
			.catch(err => {
				Swal.fire({
					type: 'error',
					title: 'Oops...',
					text: 'Register failed!'
				})
			})
	}
  }
}
</script>

<style scoped>
#nav {
    background-color:#006088;
}

#nav-container {
    display: flex;
    justify-content: space-between;
}

#nav-left {
    display: flex;
    align-items: center;
}

#nav-logo {
    height: 50px;
}

* {
	box-sizing: border-box;
	transition: .25s all ease;
}

.login-container, .register-container {
	display: block;
	position: relative;
	z-index: 0;
	margin: 2rem auto 0;
    padding: 2rem 2rem 0 2rem;
    width: 100%;
    margin-top: 90px;
    background-image: url('../../img/blue.jpg');
    background-color: white;
	box-shadow: 0 50px 70px -20px rgba(0, 0, 0, 0.85);
    height: 552px;
    width: 705px;

}


.login-container:after, .register-container:after {
	content: '';
	display: inline-block;
	position: absolute;
	z-index: 0;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	box-shadow: 0 -20px 150px -20px rgba(0, 0, 0, 0.5);
}

.form-login {
	position: relative;
	z-index: 1;
    padding-bottom: 4.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
}

.login-nav {
	position: relative;
	padding: 0;
	margin: 0 0 1.5em 1rem;
}

.login-nav__item {
	list-style: none;
	display: inline-block;
}

.login-nav__item + .login-nav__item {
	margin-left: 2.25rem;
}

.login-nav__item a {
	position: relative;
	color: rgba(255, 255, 255, 0.5);
	text-decoration: none;
	text-transform: uppercase;
	font-weight: 500;
	font-size: 0.7rem;
	padding-bottom: .5rem;
	transition: .20s all ease;
}

.login-nav__item.active a,
.login-nav__item a:hover{
	color: #ffffff;
	transition: .15s all ease;
}

.login-nav__item a:after {
	content: '';
  display: inline-block;
  height: 10px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  right: 100%;
  bottom: -1px;
  left: 0;
  border-radius: 50%;
  transition: .15s all ease;
}

.login-nav__item a:hover:after,
.login-nav__item.active a:after{
	background-color: rgb(17, 97, 237);
	height: 2px;
	right: 0;
	bottom: 2px;
	border-radius: 0;
	transition: .20s all ease;
}
.login__label {
	display: block;
	padding-left: 1rem;
}

.login__label,
.login__label--checkbox {
	color: rgba(255, 255, 255, 0.5);
	text-transform: uppercase;
	font-size: 0.7rem;
	margin-bottom: 0.5rem;
}

.login__label--checkbox {
	display: inline-block;
	position: relative;
	padding-left: 1.5rem;
	margin-top: 2rem;
	margin-left: 1rem;
	color: #ffffff;
	font-size: 0.7rem;
	text-transform: inherit;
}

.login__input {
	color: white;
	font-size: 0.7rem;
	width: 60%;
	padding: .5rem 1rem;
	border: 2px solid transparent;
	outline: none;
	border-radius: 1.5rem;
	background-color: rgba(255, 255, 255, 0.25);
	letter-spacing: 1px;
}

.login__input:hover,
.login__input:focus{
	color: white;
	border: 2px solid rgba(255, 255, 255, 0.5);
	background-color: transparent;
}

.login__input + .login__label {
	margin-top: 1.5rem;
}

.login__input--checkbox {
	position: absolute;
	top: .1rem;
	left: 0;
	margin: 0;
}

.login__submit {
	color: #ffffff;
	font-size: 0.7rem;
	font-family: 'Montserrat', sans-serif;
	text-transform: uppercase;
	letter-spacing: 1px;
	margin-top: 1rem;
	padding: .75rem;
	border-radius: 2rem;
	display: block;
	width: 40%;
	background-color: rgba(17, 97, 237, .75);
	border: none;
	cursor: pointer;
}

.login__submit:hover {
	background-color: rgba(17, 97, 237, 1);
}

.login__forgot {
	display: block;
	margin-top: 3rem;
	text-align: center;
	color: rgba(255, 255, 255, 0.75);
	font-size: 0.7rem;
	text-decoration: none;
	position: relative;
	z-index: 1;
}

.login__forgot:hover {
	color: rgb(17, 97, 237);
}

#inlogin {
	color: white;
	font-size: 12px;
}

#register {
      height: 100vh;
  background-color: #F6F7F7;
}

</style>