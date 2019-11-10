<template>

  <div>
    <loginpage v-if="isLogin == false"></loginpage>
    <mainpage v-if="isLogin == true"></mainpage>
  </div>
</template>

<script>

import mainpage from './views/mainpage'
import loginpage from './views/login'

export default {
  name: 'App',
  data() {
      return {
        isLogin : false,
      };
    },
    methods:{

    },
    components: {

        mainpage,
        loginpage
    },
      created(){
          if(localStorage.getItem('token')){
              this.isLogin = true
          }
      }

};
</script>

<style scoped>


</style>