<template>
  <div>
    <div v-if="!isLogin">
      <Login @isLoginStatus="isLoginStatus"></Login>
    </div>
    <div v-if="isLogin">
      <Home @isLoginStatus="isLoginStatus"></Home>      
    </div>
  </div>
</template>

<script>
import Login from './views/Login'
import Home from './views/Home'

export default {
  name: 'App',
  components: {
    Login,
    Home
  },
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    isLoginStatus(data){
      this.isLogin = data
    },
  },
  created(){
    if(localStorage.getItem('token')){
      this.isLogin = true
    }
  }
};
</script>

<style>
html {
	 width: 100%;
	 height: 100%;
   background-image: url('../img/background.jpg') !important;
   background-size: cover;
}
</style>
