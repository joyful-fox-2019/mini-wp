<template>
  <div>
  <b-container class="px-4 pl-md-0 pr-md-0">
    <img :src="imgUrl" loading="lazy">
    <p class="ml-1 mt-4 mb-0 text-secondary"><small>By <span class="text-info">{{ author }}</span> - {{ date }}</small></p>
    <h1 class="mt-1">{{ title }}</h1>
    <div>
      <b-badge v-for="(tag,index) in tags" :key="index" class="ml-1" variant="info">{{ tag }}</b-badge>
    </div>
    <b-row class="mt-4">
      <b-col cols="12" md="8">
        <div v-html="description">
          
        </div>
      </b-col>
      <b-col md="4">
        <Taglist
          class="pl-0 mt-3 mb-2 pl-md-5"
          :tags="tagListData"
        ></Taglist>
      </b-col>
    </b-row>
  </b-container>
  <b-container fluid class="p-0 mt-1 mt-md-4">
      <Footeritem
      ></Footeritem>
    </b-container>
  </div>
</template>

<script>
import Taglist from '../components/Taglist'
import Footeritem from '../components/Footeritem'
import axios from '../config/getdata'

export default {
  name:'Article',
  components:{
    Taglist,
    Footeritem
  },
  data(){
    return{
      title: '',
      author: '',
      date: '',
      tags: [],
      imgUrl: '',
      description: '',
      tagListData: []
    }
  },
  methods:{
    fetchArticle(){
      console.log("masuk ke slug",this.$route.params.slug)
      axios({
        url: `/articles/findArticle/${this.$route.params.slug}`,
        method: 'get'
      })
      .then(({ data }) => {
        console.log(data)
        this.title = data.title
        this.author = data.UserId.name
        this.date = data.createdAt
        this.tags = data.tags
        this.imgUrl = data.imgUrl
        this.description = data.description
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
        this.tagListData = data
      })
      .catch(err => {
        console.log(err.response.data)
        this.next(err.response.data)
      })
    }
  },
  mounted () {
    window.scrollTo(0, 0);
  },
  created(){
    this.fetchArticle()
    this.fetchTags()
  }
}
</script>

<style>
  img{
    width: 100%;
    height: auto;
  }
  
</style>