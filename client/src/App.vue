<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  data(){
    return{
      
    }
  },
  components:{
    Navbar
  }
}
</script>

<style>
  
</style>