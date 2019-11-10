<template>
  <div>
    <Loginpage :is-login="isLogin" @set-login="setLogin" v-if="!isLogin"></Loginpage>
    <Mainpage v-else @kelogout="logoutok"></Mainpage>
  </div>
</template>

<script>

import Loginpage from './views/loginpage';
import Mainpage from "./views/mainpage";
import Swal from 'sweetalert2';
export default {
  components:{
    Loginpage,
    Mainpage
  },
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    setLogin() {
      this.isLogin = true;
    },
    login(){
      if(localStorage.getItem('token')){
        this.isLogin = true
      }
      else{
        this.isLogin = false
      }
    },
    logoutok(){
      localStorage.removeItem('token')
      this.isLogin = false
      Swal.fire({
        type:'success',
        title:'success',
        text:'success logout'
      })
    }
  },
  created(){
    this.login()
  },
  mounted(){
    this.login()
  }
  // created() {
      // try {
      //   axios.get('http://localhost:3000')
      //   .then(() => {})
      //   .catch(this.next)      
      // } catch (error){
      //   this.next(error)
      // }
    
  // }
};
</script>

<style scoped>
</style>