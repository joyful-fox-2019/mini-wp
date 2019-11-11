<template>
  <div>
    <Navbar class="nav" @isLoginStatus="isLoginStatus" @changePage="changePage"></Navbar>
      <div class="columns full">
        <div class="left column is-one-fifth">

          <!-- <LeftBar></LeftBar> -->
          
        </div>
        <div class="right column is-four-fifth">

          <RightBar :page="page"></RightBar>
          
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import LeftBar from '../components/LeftBar'
import RightBar from '../components/RightBar'

export default {
  name: 'Home',
  data(){
    return {
      page: 'reader'
    }
  },
  components: {
    Navbar,
    LeftBar,
    RightBar
  },
  methods: {
    isLoginStatus(data){      
      this.$emit('isLoginStatus', data)
    },
    changePage(page){
      this.page = page
    }
  }
}
</script>

<style>
.full{
  height: 95vh;
  background-color: #e3e7f1;
  overflow: hidden;
}
.nav{
  height: 2vh;
  background-color: #010038 !important;
}
.left{
  padding: 20px;
  background-color: #c6cbef;
  overflow: auto;
}
.right{
  padding: 50px;
  /* background-color: #c6cbef; */
  /* text-align: center; */
  overflow: auto;
}
</style>
