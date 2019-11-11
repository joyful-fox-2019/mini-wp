<template>
  <div class="main-content flex flex-wrap justify-center" style="overflow: auto; height: 90vh;">
      <div v-for="article in articles" :key="article._id" class="article-card flex w-4/5 md:w-3/4 m-8 rounded shadow-2xl">
        <div class="flex  w-1/2">
          <img :src="article.image ? article.image : defaultPic" alt="image" style="object-fit: cover;">
        </div>
        <div class="card-body flex flex-wrap p-2 w-1/2 ">
          <div class="card-info flex flex-wrap p-1 w-full" style="height: 20%;">
            <h2 @click="showArticle( article._id )" class="hover:text-blue-800 cursor-pointer w-full font-bold">{{article.title}}</h2>
            <small>{{ article.owner.name? article.owner.name : null }}</small>
            <small class="w-full">{{ article.createdAt}}</small>
          </div>
          <hr>
          <div class="flex p-1 flex-wrap items-end w-full"  style="height:80%;">
            <div class="my-2 w-full " v-html="summary(article.content)" style="height:50%; overflow:auto;"></div>
            <div class="w-full"><span style="text-decoration: underline; cursor: pointer;" @click="showArticle(article._id)">See more</span></div>
            <div class="display flex w-full"><div v-for="(tag, index) in article.tags" :key="index" class=" rounded p-1 m-1 bg-blue-200 text-gray-800 hover:bg-blue-300 cursor-pointer" @click="getArticles(tag)">{{tag}}</div></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
  name: 'drafts',
  data() {
    return {
      articles : [],
      defaultPic: 'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png',
    }
  },
  methods: {
    getArticles (query) {
      let keyword = ''
      if(query) keyword = `&keyword=${query}`
      axios({
        method: 'GET',
        url: `/articles?status=draft${keyword}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.articles = data
      })
      .catch(({ response }) => {
        this.$noty.error(response.data.message)
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
      this.getArticles()
  }
}
</script>

<style>
 h2 {
   font-size: 15px;
 }
</style>