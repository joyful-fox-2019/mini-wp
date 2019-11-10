<template>
  <div>
    <Navbar></Navbar>
    <h1>{{details.title}}</h1>
    <h4>{{username}}</h4>
    <h5>{{details.createdAt}} - 2min read</h5>
    <img :src="details.image">
    <div v-html="details.content"></div>
  </div>
</template>

<script>
import axios from '../../config/axios'
import Navbar from '../components/Navbar.vue'

export default {
  name : 'thisarticle',
  components : {
    Navbar
  },
  data(){
    return {
      details : {}
    }
  },
  methods : {
    getThisArticle(){
      console.log(this.$route.params)
      axios({
        methods : 'get',
        url : `/articles/slug/${this.$route.params.slug}`
      })
        .then(({data})=>{
          this.details = data
          console.log(data.userId);
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  },
  computed: {
    username(){
      // console.log(this.details.userId)
      return this.details.userId.username
    }
  },
  created(){
    this.getThisArticle()
  }
}
</script>

<style>

</style>