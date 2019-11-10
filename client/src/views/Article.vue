<template>
  <div>
    <Navbar></Navbar>
    <div id="kepalaArticle">
      <h1  id="title">{{details.title}}</h1>
      <h4>{{username}}</h4>
      <h5>{{convertMoment}} - {{reading}}</h5>
    </div>
    <div id="isiArticle">
      <img :src="details.image">
      <div v-html="details.content"></div>
    </div>
  </div>
</template>

<script>
import axios from '../../config/axios'
import Navbar from '../components/Navbar.vue'
import truncate from 'truncate-html'
import moment from 'moment'
import readingTime from 'reading-time'

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
    },
    convertMoment(){
      return moment(this.details.createdAt).from(new Date())
    },
    reading(){
        truncate.setup({ stripTags: true, length: 10000})
        let text = truncate(this.details.content)
        return readingTime(text).text
    }
  },
  created(){
    this.getThisArticle()
  }
}
</script>

<style>
#title{
  font-size: 30px;
  color: black
}
#isiArticle{
  width : 80%;
  margin: 0 auto
}
#kepalaArticle{
  width: 80%;
  margin: 10px auto
}
</style>