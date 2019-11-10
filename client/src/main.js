// const app = new Vue({
//     el: "#app",
//     data: {
//         searchKeyword: '',
//         articles: [],
//         isFound: false,
//         isLogin: false,
//         email: '',
//         password: ''
//     },
//     methods: {
        // moveOverlay(e) {
        //     e.preventDefault();
        //     overlay.style.left = '335px';
        //     formLogin.style.display = "none";
        //     formSignup.style.display = "flex";
        //  },
        // removeOverlay(e) {
        //     e.preventDefault();
        //     overlay.style.left = '15px';
        //     formLogin.style.display = "flex";
        //     formSignup.style.display = "none";
        //  },
        // login() {
        //     axios({
        //         method: "POST",
        //         url: "http://localhost:3000/users/login",
        //         data: {
        //             email: this.email,
        //             password: this.password
        //         }
        //     })
        //         .then(({ data }) => {
        //             console.log(data);
        //             localStorage.setItem('token', data.token)
        //             this.getArticles()
        //             this.isLogin = true
        //             this.email = ''
        //             this.password = ''
        //             Swal.fire({
        //                 type: 'success',
        //                 title: `Login Successful, Welcome`,
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             })
        //         })
        //         .catch(err => {
        //             console.log(err)
        //             Swal.fire({
        //                 type: 'error',
        //                 title: 'Oops...',
        //                 text: 'Wrong Email or Password'
        //             })
        //         })
        // },
        // register() {
        //     axios({
        //         method: "POST",
        //         url: "http://localhost:3000/users/register",
        //         data: {
        //             email: this.email,
        //             password: this.password
        //         }
        //     })
        //         .then(({ data }) => {
        //             console.log(`register successful`);
        //             Swal.fire({
        //                 type: 'success',
        //                 title: 'Registration successful',
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             })
        //         })
        //         .catch(err => {
        //             console.log(err);
        //             Swal.fire({
        //                 type: 'error',
        //                 title: 'Oops...',
        //                 text: 'The email that you use is already registered in our database, please use other email.',
        //                 footer: '<a href>Why do I have this issue?</a>'
        //             })
        //         })
        // },
        // logout() {
        //     console.log('masukkkkkkkkk');
        //     localStorage.removeItem('token')
        //     this.isLogin = false
        // },
        // getArticles() {
        //     axios({
        //         method: "GET",
        //         url: "http://localhost:3000/articles",
        //         headers: {
        //             token: localStorage.getItem('token')
        //         }
        //     })
        //         .then(({ data }) => {
        //             this.articles = data
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         })
        // }
        // searchArticleByTitle() {
        //     console.log(this.searchKeyword);
        //     axios({
        //         method: "GET",
        //         url: `http://localhost:3000/articles/?title=${this.searchKeyword}`,
        //         headers: {
        //             token: localStorage.getItem('token')
        //         }
        //     })
        //         .then(({ data }) => {
        //             isFound = true
        //             this.articles = data;
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         })
        // }
    // },
    // created() {
    //     if(localStorage.getItem('token')) {
    //         this.isLogin = true
    //     } else {
    //         this.isLogin = false
    //     }
    // },
    // mounted() {
    //     if(localStorage.getItem('token')) {
    //         this.getArticles()
    //         this.isLogin = true
    //     } else {
    //         this.isLogin = false
    //     }
    // }
// })

// // ----------------- login form js
// const btnLogin = document.querySelector('.btn__login');
// const btnSignup = document.querySelector('.btn__signup');
// const formLogin = document.querySelector('.form__login');
// const formSignup = document.querySelector('.form__signup');
// const overlay = document.querySelector('.overlay');



// btnSignup.addEventListener('click', moveOverlay);
// btnLogin.addEventListener('click', removeOverlay);
// ------------------ end of login form js


import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

new Vue({
    render: h => h(App),
  }).$mount('#app');

  