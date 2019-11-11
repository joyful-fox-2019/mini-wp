<template>
  <div>
    <nav-bar @isLogin="key"></nav-bar>
    <main-menu :isLogin="isLogin"></main-menu>  
  </div>
</template>

<script>
import Navbar from './views/Navbar'
import MainMenu from './views/MainMenu'

export default {
  name: 'app',
  data(){
    return {
      isLogin : ''
    }
  },
  methods: {
    key(value){
      this.isLogin = value
    }
  },
  components: {
    'main-menu': MainMenu,
    'nav-bar': Navbar
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
