<template>
  <div>
    <nav-bar @isLogin="isLogin" @writeArticle="writeArticle"></nav-bar>
    <main-menu :loginStatus="loginStatus" @isLogin="isLogin" :articleOption="articleOption" @writeArticle="writeArticle"></main-menu>  
  </div>
</template>

<script>
import Navbar from './views/Navbar'
import MainMenu from './views/MainMenu'

export default {
  name: 'app',
  data(){
    return {
      loginStatus : '',
      articleOption : ''
    }
  },
  methods: {
    writeArticle(value){
      this.articleOption = value
    },
    isLogin(value){
      console.log('dwdwdw', value);
      
      this.loginStatus = value
    }
  },
  components: {
    'main-menu': MainMenu,
    'nav-bar': Navbar
  },
  created(){
    if(localStorage.getItem("token")){
      this.loginStatus = true
      this.isLogin(this.loginStatus)
    }
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
body {
    background-color: #F6F6F6;
}
</style>
