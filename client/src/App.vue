<template>
  <div>
    <Navbar :loginStatus="isLogin"></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  data(){
    return{
      isLogin: false
    }
  },
  components:{
    Navbar
  },
  created(){
    if(localStorage.getItem('access_token')){
      this.isLogin = true
    }
    else{
      this.login = false
    }
  }
}
</script>

<style>
  
</style>