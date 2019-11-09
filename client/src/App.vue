<template>
    <div>
        <loginpage v-if="page === 'login' && !islogin" @changePage="changePage"></loginpage>
        <registerpage v-if="page === 'register' && !islogin" @changePage="changePage"></registerpage>
         <div v-if="islogin" class="home-container d-flex">
            <sidebarComponent @changePage="changePage"></sidebarComponent>
            <div class="page-container">
                <navbar :page="page" @searchResult="searchResult" @changePage="changePage"></navbar>
                <profile v-if="page === 'profile'"></profile>
                <homepage @changePage="changePage"  @articleId="getArticleId" :articles="articles" @searchByTag="searchByTag" v-if="page === 'home'"></homepage>
                <createArticle v-if="page === 'create'" :page="page" :articleId="articleId" @changePage="changePage"></createArticle>
            </div>
         </div>
    </div>
</template>

<script>
import axios from './config/axios'
import 'vuejs-noty/dist/vuejs-noty.css'
import loginpage from './views/login-page'
import registerpage from './views/register-page'
import homepage from './views/home-page'
import createArticle from './views/create-article'
import navbar from './components/navbar'
import sidebarComponent from './components/sidebar'
import Swal from 'sweetalert2'
import profile from './views/profile'

export default {
    name: 'App',
    components: {
        loginpage,
        registerpage,
        homepage,
        createArticle,
        navbar,
        sidebarComponent,
        profile
    },
    data(){
        return {
          islogin : false,
          page : 'login',
          articleId: "",
          articles: [],
        }
    },
    methods: {
        changePage(page){
            this.page = page
            if(this.page !== 'create'){
                this.articleId = ""
            }
            if (this.page == 'home'){
                this.fetchArticles()
                this.islogin = true
            }
            if (this.page == 'login'){
                this.islogin =false
            }
        },
        getArticleId(articleId){
            this.articleId = articleId
        },
        searchResult(articles){
            this.articles = articles
        },
        fetchArticles(){
            Swal.showLoading()
            axios({
                method: 'get',
                url: '/articles',
                headers:{
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.articles = data
            })
            .catch(({ response }) => {
                this.$noty.error(response.data.message)
            })
            .finally(()=>{
                Swal.close()
            })
        },
        searchByTag(tag) {
            Swal.showLoading()
            axios({
                method: "get",
                url: `/articles/search?tag=${tag}`,
                headers: {
                token: localStorage.getItem("token")
                }
            })
            .then(({ data }) => {
            this.articles = data
            })
            .catch(({ response }) => {
                this.$noty.error(response.data.message)
            })
            .finally(()=>{
                Swal.close()
            })
        },
    },
    created(){
        if(localStorage.getItem('token')){
            this.page = 'home'
            this.fetchArticles()
            this.islogin = true
        } else {
            this.page = 'login'
            this.islogin = false
        }
    }

}
</script>

<style>

</style>