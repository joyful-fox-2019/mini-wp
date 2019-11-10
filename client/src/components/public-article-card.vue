<template>
   <div class="public-article d-flex flex-wrap">
          <div v-for="article in articles" :key="article._id" class="public-article-card">
            <img @click="changePage(article._id)" :src="article.file" alt="">
            <div>
              <h5 @click="changePage(article._id)" >{{ article.title }}</h5>
              <div @click="changePage(article._id)" class="p" v-html="article.content"></div>
            </div>
            <div class="d-flex align-items-center justify-content-between w-100">
              <div class="d-flex align-items-center">
                <img id="profile-pic" :src="article.userId.profilePic" alt="">
                 <div>{{ article.userId.email }}</div>
              </div>
              <div class="d-flex align-items-center">
                <span style="font-size: 15px;">{{ article.upvotes.length - article.downvotes.length }}</span>
                <i  @click="upvote(article._id)" v-if="article.upvotes.length" style="color: #ff478e" class="love fas fa-heart"></i>
                <i @click="upvote(article._id)" v-else class="love fas fa-heart"></i>
              </div>
            </div>
          </div>
      </div>
</template>

<script>
import axios from '../config/axios'
import Swal from 'sweetalert2'


export default {
  data(){
    return {
      articles: []
    }
  },
  methods:{
    changePage(id){
            this.$emit('changePage', 'read')
            this.articleId(id)
    },
    articleId(id){
        this.$emit('articleId', id)
    },
    upvote(id){
       Swal.showLoading()
        axios({
          method: 'patch',
          url: `/articles/${id}/upvote`,
          headers: {
            token : localStorage.getItem('token')
          }
        })
        .then(({data})=>{
          this.fetchAllArticle()
        })
        .catch(({ response }) => {
            this.$noty.error(response.data.message)
        })
        .finally(()=>{
            Swal.close()
        })
    },
      fetchAllArticle(){
        Swal.showLoading()
        axios({
          method: 'get',
          url: '/articles/all'
        })
        .then(({data})=>{
          this.articles = data.slice(4)
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
    this.fetchAllArticle()
  }
}
</script>

<style>
.public-article{
  width: 100%;
  padding: 30px;
}

.public-article-card{
  margin: 10px;
  width: 300px;
  height: 300px;
  border: 1px solid rgb(233, 233, 233);
  cursor: pointer;
}

.public-article-card img{
  max-width: 298px;
  max-height: 200px;
  object-fit: cover;
}

.public-article-card h5{ 
  font-family: 'Quicksand', sans-serif;
  margin: 5px;
}

.public-article-card p{ 
  font-size: 10px;
  margin-bottom: 0;
}

#profile-pic{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin: 5px;
}

.love{
  margin: 0 5px;
  font-size: 30px;
  color: rgb(177, 177, 177);
  cursor: pointer;
}

.public-article .p{
  width: 100%;
  height: 45px;
  overflow: hidden;
  padding: 0 5px;
}
</style>