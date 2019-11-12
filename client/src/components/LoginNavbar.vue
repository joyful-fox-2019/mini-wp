<template>
  <div class="d-flex justify-content-between align-items-center">
        <button type="button" class=" btn-sm d-flex writeButton align-items-center p-2 px-4"
            v-if="isLogin" @click="writeOption">
            <i class="fa fa-pencil-square-o fa-2x mr-1" aria-hidden="true" style="color: #2C6286;"></i>
            Write
        </button>
        <button v-if="isLogin" type="button" data-toggle="modal" data-target="#exampleModal9" class="btn rounded-circle ml-3 px-0 py-0"
            style=" height: 40px; width: 40px; background-size: 45px; border: 3px solid white;">
        </button>
        <button v-if="isLogin" type="button" class="btn ml-2"><i class="fa fa-bell fa-1x" aria-hidden="true"
                style="color: white;"></i>
        </button>
        <button v-if="!isLogin" type="button" data-toggle="modal" data-target="#exampleModal4"
            class="btn rounded-circle ml-3 px-0 py-0"
            style=" height: 40px; width: 40px; background-size: 45px;">
            <i class="fas fa-user-circle fa-2x" style="color: white"></i>
        </button>
        <!--Modal-->
        <div v class="modal fade" id="exampleModal9" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel4" aria-hidden="true">
            <div class="modal-dialog modal-dialog-slideout modal-sm" role="document" style="min-height: 0; margin: 0.3% 0 0 auto;background: #fff;">
                <div class="modal-content">
                    <center>
                        <div class="modal-body">
                            <button type="button" class="btn btn-success" data-toggle="modal" data-dismiss="modal" @click="logout">
                                <i class="fas fa-arrow-alt-circle-right"></i>
                                Logout
                            </button>
                            <button type="button" class="btn btn-danger" style="margin-left: 5px;" data-toggle="modal" data-dismiss="modal">
                                <i class="fas fa-user-plus"></i>
                                Cancel
                            </button>
                        </div>
                    </center>
                </div>
            </div>
        </div>
        <!--Modal-->
        <div class="modal fade" id="exampleModal4" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel4" aria-hidden="true">
            <div class="modal-dialog modal-dialog-slideout modal-sm" role="document" style="min-height: 0; margin: 0.3% 0 0 auto;background: #fff;">
                <div class="modal-content">
                    <center>
                        <div class="modal-body">
                            <button type="button" class="btn btn-primary" data-target="#modelLogin"
                                data-toggle="modal" data-dismiss="modal">
                                <i class="fas fa-arrow-alt-circle-right"></i>
                                Login
                            </button>
                            <button type="button" class="btn btn-success" style="margin-left: 5px;" data-target="#modelSignup" data-toggle="modal" data-dismiss="modal">
                                <i class="fas fa-user-plus"></i>
                                Register
                            </button>
                        </div>
                    </center>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="modelLogin" tabindex="-1" style="margin-top: 100px;" role="dialog"
            aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <nav class="navbar navbar-expand-sm mt-3 mb-3 navbar-dark dx-flex"
                        style="background-color: rgb(250, 248, 248);">
                        <section class="login-block">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-4 login-sec">
                                        <h2 class="text-center" style="color: #2C6286;">Login Now</h2>
                                        <form class="login-form">
                                            <div class="form-group">
                                                <label for="exampleInputEmail1"
                                                    class="text-uppercase">Email</label>
                                                <input type="email" v-model="formLogin.email" id="email" class="form-control"
                                                    placeholder="Email">
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputPassword1"
                                                    class="text-uppercase">Password</label>
                                                <input type="password" id="password" v-model="formLogin.password" class="form-control"
                                                    placeholder="Password">
                                            </div>
                                            <div class="d-flex justify-content-center">
                                                <input class="btn btn-primary px-5" type="button" value="SignIn" @click="login" data-dismiss="modal">
                                                <input class="btn ml-1 btn-secondary" type="button" value="SignUp" data-target="#modelSignup" data-toggle="modal" data-dismiss="modal">
                                            </div>
                                            <div class="hr-sect">or signin with</div>
                                            <div class="d-flex justify-content-center">
                                                <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError" data-toggle="modal" data-dismiss="modal">
                                                    Sign in with Google
                                                </g-signin-button>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-lg-8 banner-sec">
                                        <div id="carouselExampleIndicators" class="carousel slide"
                                            data-ride="carousel">
                                            <ol class="carousel-indicators">
                                                <li data-target="#carouselExampleIndicators" data-slide-to="0"
                                                    class="active"></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="1">
                                                </li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="2">
                                                </li>
                                            </ol>
                                            <div class="carousel-inner" role="listbox">
                                                <div class="carousel-item active">
                                                    <img class="d-block img-fluid"
                                                        src="https://static.pexels.com/photos/33972/pexels-photo.jpg"
                                                        alt="First slide">
                                                </div>
                                                <div class="carousel-item">
                                                    <img class="d-block img-fluid"
                                                        src="https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg"
                                                        alt="Second slide">
                                                </div>
                                                <div class="carousel-item">
                                                    <img class="d-block img-fluid"
                                                        src="https://images.pexels.com/photos/872957/pexels-photo-872957.jpeg"
                                                        alt="Third slide">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </section>
                    </nav>
                </div>
            </div>
        </div>
        <!-- Modal--- -->
        <div class="modal fade" id="modelSignup" tabindex="-1" style="margin-top: 100px;" role="dialog"
            aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <nav class="navbar navbar-expand-sm pt-3 pb-3 navbar-dark dx-flex"
                        style="background-color: rgb(250, 248, 248);">
                        <section class="login-block">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-4 login-sec">
                                        <h2 class="text-center" style="color: #2C6286;">Register</h2>
                                        <form class="login-form">
                                            <div class="form-group">
                                                
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1"
                                                    class="text-uppercase">Name</label>
                                                <input type="text" v-model="formRegister.name" id="name" class="form-control"
                                                    placeholder="Email">
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1"
                                                    class="text-uppercase">Email</label>
                                                <input type="email" v-model="formRegister.email" id="email" class="form-control"
                                                    placeholder="Email">
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputPassword1"
                                                    class="text-uppercase">Password</label>
                                                <input type="password" v-model="formRegister.password" id="password" class="form-control"
                                                    placeholder="Password">
                                            </div>
                                            <div class="d-flex">
                                                <input class="btn btn-primary px-5" type="button" value="SignUp" @click="register" data-dismiss="modal">
                                                <input class="btn btn-secondary ml-2 d-flex align-item-center" type="button" value="SignIn" data-target="#modelLogin" data-toggle="modal" data-dismiss="modal">
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-lg-8 banner-sec">
                                        <div id="carouselExampleIndicators" class="carousel slide"
                                            data-ride="carousel">
                                            <ol class="carousel-indicators">
                                                <li data-target="#carouselExampleIndicators" data-slide-to="0"
                                                    class="active"></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="1">
                                                </li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="2">
                                                </li>
                                            </ol>
                                            <div class="carousel-inner" role="listbox">
                                                <div class="carousel-item active">
                                                    <img class="d-block img-fluid"
                                                        src="https://static.pexels.com/photos/33972/pexels-photo.jpg"
                                                        alt="First slide">
                                                </div>
                                                <div class="carousel-item">
                                                    <img class="d-block img-fluid"
                                                        src="https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg"
                                                        alt="Second slide">
                                                </div>
                                                <div class="carousel-item">
                                                    <img class="d-block img-fluid"
                                                        src="https://images.pexels.com/photos/872957/pexels-photo-872957.jpeg"
                                                        alt="Third slide">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </section>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import axios from '../../apis/server'
import Swal from 'sweetalert2'

export default {
    name: "LoginNavbar",
    data() {
        return {
            googleSignInParams: {
                client_id: '888490755857-qkd1fb6enlckk5vtoptpeha30kkou15e.apps.googleusercontent.com'
            },
            Toast : Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1500
            }),
            isLogin: false,
            formRegister : {
                name : '' ,
                email : '',
                password : '',
                image : 'testurl'
            },
            formLogin : {
                email : '',
                password : '',
            },
        };
    },
    methods: {
        writeOption(){
            if (!this.writeArticle) {
                this.writeArticle = true
                this.$emit('writeArticle', this.writeArticle)
            } else {
                this.writeArticle = false
                this.$emit('writeArticle', this.writeArticle)
            }
        },
        onSignInSuccess (googleUser){
            Swal.showLoading()
            const { id_token } = googleUser.getAuthResponse();
            axios({
                url : '/user/google',
                method : 'post',
                data : { id_token }
            })
            .then(({data})=>{
                Swal.close()
                this.isLogin = true
                localStorage.setItem('token',data.token)
                this.$emit('isLogin', true)
                this.Toast.fire({
					icon: 'success',
					title: 'Login successfully'
				})
            })
            .catch(err=>{
                Swal.fire({
					icon: 'error',
					title: 'Sorry,',
					text: err.response.data.errors.join(', ')
				})
            })
        },
        onSignInError(error){
			Swal.fire({
				icon: 'error',
				title: 'Sorry,',
				text: "Login Google Failed"
			})
		},
        google(){},
        login(){
            Swal.showLoading()
            axios({
                url : '/user/login',
                method : 'post',
                data : this.formLogin
            })
            .then(({data})=>{
                console.log(data)
                Swal.close()
                this.isLogin = true
                localStorage.setItem('token',data.token)
                this.$emit('isLogin', this.isLogin)
                this.Toast.fire({
					icon: 'success',
					title: 'Login successfully'
				})
            })
            .catch(err=>{
                Swal.fire({
					icon: 'error',
					title: 'Sorry,',
					text: err.response.data.errors.join(', ')
				})
            })
        },
        register(){
            Swal.showLoading()
            axios({
                url : '/user/register',
                method : 'post',
                data : this.formRegister
            })
            .then(({data})=>{
                Swal.close()
                console.log(data)
                this.isLogin = true
                this.$emit('isLogin', true)
                localStorage.setItem('token',data.token)
                this.Toast.fire({
					icon: 'success',
					title: 'Create Account successfully'
				})
            })
            .catch(err=>{
                Swal.fire({
					icon: 'error',
					title: 'Sorry,',
					text: err.response.data.errors.join(', ')
				})
            })
        },
        logout(){
            Swal.showLoading()
            this.isLogin = false
            this.$emit('isLogin', false)
            localStorage.removeItem('token')
            let auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            Swal.close()
            this.Toast.fire({
				icon: 'success',
				title: 'logout successfully'
			})
        }
    },
    created() {
        if(localStorage.getItem('token')){
            this.isLogin = true
        }
    },
    mounted() {
        gapi.signin2.render('google-signin-button', {
            onsuccess: this.onSignIn
        })
    },
};
</script>

<style>

.g-signin-button {
    display: inline-block;
    padding: 12px 12px;
    border-radius: 3px;
	margin: 0px;
    background-color: #3c82f7;
    color: #fff;
	height: 100%;
	cursor: pointer;
}


.modal-dialog-slideout {min-height: 0; margin: 0.3% 0 0 auto;background: #fff;}
.modal.fade.show .modal-dialog.modal-dialog-slideout .modal-body{overflow-y: auto;overflow-x: hidden;}
.modal-dialog-slideout .modal-content{border: 0;}
.modal-dialog-slideout .modal-header, .modal-dialog-slideout .modal-footer {height: 69px; display: block;} 
.modal-dialog-slideout .modal-header h5 {float:left;}
.login-block {
	background: #FAF8F8;
	float: left;
    width: 100%;
    /* padding-top: 80px; */
}

.banner-sec {
	background-size: cover;
	/* min-height: 500px; */
	border-radius: 0 10px 10px 0;
	padding: 0;
}

.carousel-inner {
	border-radius: 0 10px 10px 0;
}

.carousel-caption {
	text-align: left;
	left: 5%;
}

.login-sec {
	/* padding: 50px 30px; */
	position: relative;
}

.login-sec .copy-text {
	position: absolute;
	width: 80%;
	bottom: 20px;
	font-size: 13px;
	text-align: center;
}

.login-sec .copy-text i {
	color: rgb(10, 57, 88);
}

.login-sec .copy-text a {
	color: rgb(12, 74, 116);
}

.login-sec h2 {
	/* margin-top: 20px; */
	font-weight: 800;
	font-size: 30px;
	color: #2C6286;
}

.login-sec h2:after {
	content: " ";
	width: 100px;
    height: 5px;
	display: block;
	margin-top: 20px;
	border-radius: 3px;
	margin-left: auto;
	margin-right: auto
}

.btn-login {
	color: #fff;
	font-weight: 600;
}

.banner-text {
	width: 70%;
	position: absolute;
	bottom: 40px;
	padding-left: 20px;
}

.banner-text h2 {
	color: #fff;
	font-weight: 600;
}

.banner-text h2:after {
	content: " ";
	width: 100px;
	height: 5px;
	background: #FFF;
	display: block;
	margin-top: 20px;
	border-radius: 3px;
}

.banner-text p {
	color: #fff;
}

/* --------- */
.hr-sect {
	display: flex;
	flex-basis: 100%;
	align-items: center;
	color: rgba(0, 0, 0, 0.35);
	margin: 8px 0px;
}
.hr-sect::before,
.hr-sect::after {
	content: "";
	flex-grow: 1;
	background: rgba(0, 0, 0, 0.35);
	height: 1px;
	font-size: 0px;
	line-height: 0px;
	margin: 0px 8px;
}
</style>