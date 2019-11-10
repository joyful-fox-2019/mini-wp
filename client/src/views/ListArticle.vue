<template>
  <div class="container" style="width:100%; min-height: 86vh">
    <div class="d-flex flex-column">
      <h3 class="mt-4">
        {{ page }}
      </h3>
      <div class="d-flex flex-wrap justify-content-between" style="width:100%">
        <TinyArticle class="m-2" v-for="article in articles" :key="article._id" :article="article" style="width:200px"></TinyArticle>
      </div>
      <div style="text-align: center" v-if="isFetching">
        <b-spinner label="Spinning"></b-spinner>
      </div>
      <div style="text-align: center" v-if="end">End of the page</div>
    </div>
  </div>
</template>

<script>
import TinyArticle from '../components/TinyArticle'
import axiosNpm from '../config/axios'
export default {
  data(){
    return{
      data: [],
      page: '',
      articles: '',
      pagination: 1,
      isFetching: false,
      end: false
    }
  },
  methods:{
    scroll(){
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow && !this.isFetching && !this.end) {
          const tag = this.$route.params.tag
          this.pagination += 1
          this.isFetching = true
          let url = `/articles/page/${this.pagination}`
          if(tag !== 'latest'){
            url = `articles/tag/${tag}/page/${this.pagination}`
          }
          axiosNpm({
            url
          })
            .then(({ data })=>{
              if(data.length > 0){
                console.log(data);
                for(let i = 0; i<data.length; i++){
                  this.articles.push(data[i])
                }
                this.isFetching = false
              }
              else{
                this.isFetching = false
                this.end = true
              }
            })
            .catch(err=>{
              this.isFetching = false
              console.log(err)
            })
        }
      }
    },
    onPage(){
      const page = this.$route.params.tag
      this.page = page.toUpperCase()
    },
    fetchArticle(){
      let url = '/articles'
      
      if(this.$route.params.tag !== 'latest'){
        url = `/articles/tag/${this.$route.params.tag}`
      }
      axiosNpm({
        url,
        method: 'get'
      })
        .then(({ data })=>{
          this.articles = data.slice(0, 20)
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },
  created(){
    this.scroll()
    this.onPage()
    this.fetchArticle()
  },
  watch: {
    $route(){
      this.isFetching = false
      this.end = false
      this.pagination = 1
      this.onPage()
      this.fetchArticle()
    }
  },
  components:{
    TinyArticle
  }
}
</script>

<style>

</style>