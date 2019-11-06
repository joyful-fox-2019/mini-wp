<template>
  <div  class="main-content flex-column items-center w-full" style="height: 90vh;">
    <div class=" mx-4 my-2 mt-4">
      <h1 class="text-center">{{article.title}}</h1>
    </div>
    <div class=" mx-4 my-2 flex justify-end items-center">
      <div class="flex items-center hover:bg-blue-200 cursor-pointer p-2" @click="editArticle">
        <span>edit article</span> <i class="fas fa-edit text-gray-700 text-lg px-2"></i>
      </div>
    </div>
    <div class="h-40 border border-gray-700 flex justify-center mx-4 my-2">
      <img src="./stratos.jpg" alt="" style="object-fit: cover;">
    </div>
    <div class="show-article-content flex-column m-4 border border-gray-700 p-2">
      <div class="show-article-info">

        <p>author: {{article.author.name}}</p>
        <p>tags: <span v-for="(tag, index) in article.tags" :key="index">{{ tag }} </span></p>
        <p> viewed: <span>{{ article.read}}</span> times</p>
      </div>
      <div class="article-body my-4" v-html="article.content">
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
  name: 'ShowArticle',
  data() {
    return {
      article: {}
    }
  },
  methods: {
    editArticle () {
      const id = this.$route.params.id
      this.$router.push(`/edit/${id}`)
    }
  },
  created() {
    const id = this.$route.params.id
    axios({
      method: 'GET',
      url: `/articles/${id}`
    })
    .then(({ data }) => {
      this.article = data
    })
    .catch(({ response }) => {
      console.log(response.data)
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