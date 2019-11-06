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
      text: ``
    }
  },
  components:{
    Navbar
    
  }
}
</script>

<style>
  .card-body{
    padding: 0;
  }
</style>