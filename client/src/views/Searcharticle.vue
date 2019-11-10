<template>
  <div>
    <b-container style="margin-top: 3vh;">
      <b-row class="mt-4">
        <b-col cols="12" md="8" >
          <div class="border-bottom border-info mt-2 mb-4">
            <div class=" card-body pb-1 pl-0">
              <span class="m-0 bg-info p-2 text-white" style="font-size:18px">Search result: {{ searchTag }}</span>
            </div>
          </div>
          <div>
            
          </div>
          <Articleitem
            v-for="(data,index) in articleData"
            :key="index"
            :imglink="data.imgUrl"
            :author="data.UserId.name"
            :description="data.description"
            :date="data.createdAt"
            :title="data.title"
            v-on:click.native="toArticle(data._id)"
          ></Articleitem>
        </b-col>
        <b-col class="d-none d-sm-block" md="4">
          <Taglist
            class="mt-5 pl-3"
            :tags="tagData"
          ></Taglist>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="footerX p-0 mt-1 mt-md-4">
      <Footeritem class=""></Footeritem>
    </b-container>
  </div>
</template>

<script>
import Footeritem from '../components/Footeritem'
import Articleitem from '../components/Articleitem'
import Taglist from '../components/Taglist'
import axios from '../config/getdata'

export default {
  components:{
    Footeritem,
    Articleitem,
    Taglist
  },
  data(){
    return{
      articleData: [],
      tagData: [],
      searchTag: this.$route.params.tag
    }
  },
  methods:{
    toArticle(id){
      console.log("masuk")
      this.$router.push({path:`/article/${id}`})
    },
    searchArticleByTag(tag){
      axios({
        url: `/articles/tagSearch/${tag}`,
        method: 'get'
      })
      .then(({ data }) => {
        console.log(data)
        this.articleData = data
      })
      .catch(err => {
        console.log(err.response.data)
        this.next(err.response.data)
      })
    },
    fetchTags(){
      axios({
        url: '/articles/tagCounter',
        method: 'get'
      })
      .then(({ data }) => {
        console.log(data)
        this.tagData = data
      })
      .catch(err => {
        console.log(err.response.data)
        this.next(err.response.data)
      })
    }
  },
  created(){
    this.searchArticleByTag(this.searchTag)
    this.fetchTags()
  },
  watch:{
    '$route.params.tag': function () {
      console.log('masuk')
      this.searchTag = this.$route.params.tag
      this.searchArticleByTag(this.searchTag)
    }
  }
}
</script>

<style>
  .card-title{
    margin:0 !important;
  }
  .footerX {
    position:fixed;
    bottom:0;
  }
</style>