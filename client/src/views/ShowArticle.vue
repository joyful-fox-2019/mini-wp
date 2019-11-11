<template>
  <div  class="main-content flex-column items-center w-full" style="height: 90vh;">
    <div class=" mx-16 my-2 mt-4">
      <h1 class="text-center underline">{{article.title}}</h1>
    </div>
    <div class=" mx-16 my-2 flex justify-end items-center">
      <div class="flex items-center hover:bg-blue-100 cursor-pointer p-2" @click="editArticle">
        <span>edit this article</span> <i class="fas fa-edit text-gray-700 text-lg px-2"></i>
      </div>
    </div>
    <div class="h-40 border border-gray-700 flex justify-center mx-16 my-2">
      <img :src="article.image" alt="" style="object-fit: cover;">
    </div>
    <div class="show-article-content flex-column mx-16 my-4 border border-gray-500 p-4 shadow-lg">
      <div class="show-article-info">

        <p> <i class="fas fa-user-tie mr-2"></i> <span>{{ article.owner ? article.owner.name : null }}</span></p>
        <p><i class="fas fa-tags"></i> <span v-for="(tag, index) in article.tags" :key="index" class="underline mx-1 cursor-pointer" @click="searchTag(tag)">{{ tag }} </span></p>
        <p> <i class="fas fa-eye mr-1"></i> <span>{{ article.reads}}</span> times</p>
        <hr>
      </div>
      <div class="article-body my-4" v-html="article.content">
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
  name: 'showArticle',
  data() {
    return {
      article: {}
    }
  },
  methods: {
    searchTag (tag) {
      this.$emit('searchTag', {keyword: tag})
    },
    editArticle () {
      const id = this.$route.params.id
      this.$router.push(`/edit/${id}`)
    }
  },
  created () {
    const id = this.$route.params.id
    axios({
      method: 'GET',
      url: `/articles/${id}?mode=read`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({ data }) => {
      this.article = data
    })
    .catch(({ response }) => {
      this.$noty.error(response.data.message)
    })
  },
}
</script>

<style scoped>
  h1 {
    font-size: 25px
  }
  .main-content {
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>