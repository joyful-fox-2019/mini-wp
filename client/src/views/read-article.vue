<template>

  <div>
    
    <publicNavbar :islogin="islogin" @changePage="$emit('changePage', $event)" ></publicNavbar>
    <div class="read-container d-flex justify-content-center mt-3 mb-5">
      <div class="read-card d-flex justify-content-center align-items-center flex-column">
        <img :src="article.file" :alt="article.title">
        <i class="fas fa-eye mt-3">  {{ article.reader }}</i>
        <hr>
        <h1>{{ article.title }}</h1>
        <div v-html="article.content" class="mt-2 px-5"></div>
      </div>
    </div>
  </div>
  
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../config/axios'

import publicNavbar from '../components/public-navbar'
export default {
    name: 'read-article', 
    components: {
        publicNavbar
    },
    data(){
      return{
        article: {}
      }
    },
    props: ['islogin', 'articleId'],
    methods: {
      fectchOneArticle(){
        Swal.showLoading()
        axios({
            method: 'get',
            url: `/articles/${this.articleId}/read`,
        })
        .then(({data})=>{
            this.article = data
        })
        .catch(({ response }) => {
            this.$noty.error(response.data.message)
        })
        .finally(()=>{
            Swal.close()
        })
      },
      increamentReader(){
        Swal.showLoading()
        axios({
            method: 'patch',
            url: `/articles/${this.articleId}/inc`,
        })
        .then(({data})=>{
            this.fectchOneArticle()
        })
        .catch(({ response }) => {
            this.$noty.error(response.data.message)
        })
        .finally(()=>{
            Swal.close()
        })
      }
    },
    created(){
      this.increamentReader()
    }
}
</script>

<style>

.read-container{
  width: 100%;
}

.read-card{
  width: 80%;
  min-height: 300px;
}

</style>