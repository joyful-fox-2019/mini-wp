<template>
  <div class="main-content flex flex-wrap justify-center" style="overflow: auto; height: 90vh;">
       <div v-for="article in articles" :key="article.id" class="article-card flex-column sm:w-4/5 md:w-2/5 m-8 rounded shadow-2xl" style="min-height: 250px;">
        <div class="h-32 flex border border-gray-500">
          <img src="./stratos.jpg" alt="image" style="object-fit: cover;">
        </div>
        <div class="card-body flex flex-wrap p-2">
          <h2 @click="showArticle(article.id)" class="hover:text-blue-800 cursor-pointer w-full font-bold">{{article.title}}</h2>
          <small>{{ article.author.name }}</small>
          <small class="w-full">{{ article.createdAt}}</small>
          <hr>
          <div class="flex p-1 flex-wrap items-end" style="height:180px;">
            <div class="my-2 w-full" v-html="summary(article.content)" style="height:50%;"></div>
            <div class="w-full"><span style="text-decoration: underline; cursor: pointer;" @click="showArticle(article.id)">See more</span></div>
            <div class="display flex w-full"><div v-for="(tag, index) in article.tags" :key="index" class=" rounded p-1 m-1 bg-blue-200 text-gray-800 hover:bg-blue-300 cursor-pointer" @click="getArticles(tag)">{{tag}}</div></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
  name: 'ArticleList',
  data() {
    return {
      articles : []
    }
  },
  props: ['keyword'],
  methods: {
    getArticles (query) {
      let keyword = ''
      if(query) keyword = `?keyword=${query}`
      axios({
        method: 'GET',
        url: `/articles${keyword}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.articles = data
      })
      .catch(({ response }) => {
        // error alert
        console.log(response.data)
      })
    },
    showArticle (id) {
      this.$router.push(`articles/${id}`)
    },
    summary (content) {
      if(content.length > 200) {
        return content.slice(0,200) + '...'
      } else {
        return content
      }
    }
  },
  created () {
    if(!this.keyword) {
      this.getArticles()
    } else {
      // console.log(this.keyword, 'article list');
      this.getArticles(this.keyword)
    }
  },
  watch: {
    keyword () {
      this.getArticles(this.keyword)
    }
  },
}
</script>

<style>
 h2 {
   font-size: 15px;
 }
</style>