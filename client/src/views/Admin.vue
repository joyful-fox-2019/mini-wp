<template>
  <div>
    <b-container class="my-4">
      <b-row>
        <!-- Place for nested vue route -->
        <b-col cols="3">
          <Menu></Menu>
        </b-col>
        <b-col cols="9">
          <!-- Place for router view -->
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Menu from '../components/Menu'

export default {
  data(){
    return{
      
    }
  },
  components:{
    Menu
  }
}
</script>

<style>
  /* .card-body{
    padding: 0;
  } */
</style>