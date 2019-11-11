<template>
<div>

<div class="openingpage">
<home v-if="homeShow" @showLogin="loginForm()"></home>
<login v-if="loginShow" @showRegister="registerForm()" @showMain="isLogin()"></login>

<transition name="slide-fade">
<register v-if="registerShow" @showLogin="loginForm()"></register>
</transition>
</div>

<div v-if="mainpageShow">
<mainpage :articlesList="articlesList"></mainpage>
</div>



</div>
</template>

<script>
import axios from 'axios'
import login from "../src/views/Login.vue"
import home from "../src/views/Home.vue"
import register from '../src/views/Register.vue'
import mainpage from '../src/views/MainPage.vue'


export default {
  data() {
    return {
      loginShow: false,
      homeShow: true,
      registerShow: false,
      mainpageShow: false,
      baseUrl: '3.0.99.253',
      articlesList: []
    }
  },
  components: {
    login,
    home,
    register,
    mainpage
 
  },
  methods: {
    loginForm () {
      this.homeShow = false,
      this.loginShow = true,
      this.registerShow = false
      this.mainpage = false
    },
    registerForm () {
      this.homeShow = false,
      this.loginShow = false,
      this.registerShow = true
      this.mainpage = false
    },
    homeForm () {
      this.homeShow = true,
      this.loginShow = false,
      this.registerShow = false,
      this.mainpage = false
    },
    isLogin () {
      Swal.showLoading()
      axios({
        url: `${this.baseUrl}/articles`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then (({data})=> {
      Swal.close()
      this.articlesList = data
      this.mainpageShow = true,
      this.loginShow = false,
      this.registerShow = false,
      this.homeShow = false
      })
    },
    logout () {
      localStorage.removeItem
      homeForm()
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.isLogin()
    }else {
      this.homeForm()
    }
    // this.isLogin()
  }
}

</script>

<style>
body {
  background: url("./img/owleyes.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;
}
.masthead {
  min-height: 30rem;
  position: relative;
  display: table;
  width: 100%;
  height: auto;
  padding-top: 8rem;
  padding-bottom: 8rem;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.masthead h1 {
  font-size: 4rem;
  margin: 0;
  padding: 0;
}
.fade-enter-active {
  transition: opacity 1s ease-in;
}
.fade-enter/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}


</style>
