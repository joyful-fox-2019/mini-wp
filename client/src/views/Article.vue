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
      const loadingComponent = this.$buefy.loading.open()
      axios({
        methods : 'get',
        url : `/articles/slug/${this.$route.params.slug}`
      })
        .then(({data})=>{
          loadingComponent.close()
          this.details = data
        })
        .catch((err)=>{
          loadingComponent.close()
          this.$buefy.toast.open({
                    duration: 4000,
                    message: `${err.response.data.message}`,
                    type: 'is-danger'
                })
          console.log(err.response.data)
        })
    }
  },
  computed: {
    username(){
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