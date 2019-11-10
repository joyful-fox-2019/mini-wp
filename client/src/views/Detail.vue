<template>
  <div class="container mt-4">
    <div style="text-align: center">
      <div class="d-flex justify-content-center mb-3">
        <a href="" class="badge badge-primary m-1" v-for="(tag, index) in tags" :key="index" @click.prevent="toPage(tag)">{{ tag }}</a>
      </div>
      <h1 class="mb-4">
        {{ title }}
      </h1>
    </div>
    <div class="row">
      <div class="col-sm-8">
        <img :src="picture" alt="" style="max-width: 100%">
        <div class="row mt-2 mb-3">
          <div class="col-sm-2">
            <div style="position: sticky; top: 0;">
              Author: {{ name }}
            </div>
          </div>
          <div class="col-sm">
            <div v-html="description"></div>
            <small>Published: {{ moment }}</small>
          </div>
        </div>
      </div>
      <div class="col-sm">
        <h3>
          Other Article:
        </h3>
        <TinyArticle v-for="article in randomArticle" :key="article._id" :article="article"></TinyArticle>
      </div>
    </div>
  </div>
</template>

<script>
import axiosNpm from '../config/axios'
import TinyArticle from '../components/TinyArticle.vue'
import moment from 'moment'

export default {
  data(){
    return{
      tags: [],
      title: '',
      description: '',
      date: '',
      randomArticle: '',
      name: '',
      picture: '',
      createdAt : ''
    }
  },
  components:{
    TinyArticle
  },
  methods:{
    fetchArticle(){
      const id = this.$route.params.id
      axiosNpm({
        url: `/articles/${id}`,
        method: 'get'
      })
        .then(({ data })=>{
          this.tags = data.tags
          this.title = data.title
          this.description = data.description
          this.date = data.createdAt
          this.name = data.user_id.name
          this.picture = data.picture
          this.createdAt = data.createdAt
        })
        .catch(err=>{
          console.log(err)
        })
    },
    fetchDataRandom(){
      axiosNpm({
        url: '/articles',
        method: 'get'
      })
        .then(({ data })=>{
          const random = Math.floor(Math.random() * data.length)
          this.randomArticle = data.slice(random, random + 3)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    toPage(tag){
      this.$router.push(`/list/${tag}`)
    }
  },
  created(){
    this.fetchArticle()
    this.fetchDataRandom()
  },
  watch:{
    $route(to, from){
      this.fetchDataRandom()
      this.fetchArticle()
    }
  },
  computed: {
    moment(){
      return moment(this.createdAt).fromNow()
    }
  }
}
</script>

<style>

</style>