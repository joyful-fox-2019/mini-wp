<template>
    <div id="homePage">
        <Navbar @set-logout="setLogout" @show-add-article-form="showAddArticleForm"></Navbar>
        <div id="mainPage">
            <div class="container-fluid">
                <div class="row">
                    <SideBar></SideBar>
                    <div id="pageContent" class="col-md-8" v-if="!writeArticle && !updateArticle">
                        <div id="searchArticle">
                            <SearchBar v-if="!writeArticle && !updateArticle" @is-found-is-true="setIsFound"></SearchBar>
                        </div>
                        <div id="article" v-show="!isFound" >
                            <div>
                                <Article v-for="(article, index) in articles" :key="index" :ArticleData="article" @showhomepage="reload" @update-article="showUpdateArticleForm"></Article>
                            </div>
                        </div>
                        <div id="article" v-show="isFound">
                            <div>
                                <Article v-for="(foundArticle, index) in foundArticles" :key="index" :ArticleData="foundArticle" @showhomepage="reload" @update-article="showUpdateArticleForm"></Article>
                            </div>
                        </div>
                    </div>

                    <div id="pageContent" class="col-md-8" v-if="writeArticle && !updateArticle">
                        <AddArticleForm></AddArticleForm>
                    </div>

                    <div id="updateArticle" class="col-md-8" v-if="updateArticle && !writeArticle" @update-article="showUpdateArticleForm()">
                        <UpdateArticleForm :articleToBeUpdated="gonnaBeUpdated" @showhomepagefromupdate="reloadHomepageFromUpdate"></UpdateArticleForm>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import SearchBar from '../components/SearchBar'
import Article from '../components/Article'
import AddArticleForm from "../components/AddArticleForm"
import UpdateArticleForm from "../components/UpdateArticleForm"
import axios from 'axios'

export default {
    name: "HomePage",
    components: {
        Navbar,
        SideBar,
        SearchBar,
        Article,
        AddArticleForm,
        UpdateArticleForm
    },
    data() {
        return {
            isFound: false,
            articles: [],
            writeArticle: false,
            updateArticle: false,
            gonnaBeUpdated: '',
            foundArticles: []
        }
    },
    props: ["ArticleData"],
    methods: {
        setLogout() {
            this.$emit('set-logout')
        },
        showAddArticleForm() {
            this.writeArticle = true
        },
        getArticles() {
            axios({
                method: "GET",
                url: "http://localhost:3000/articles",
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({ data }) => {
                    this.articles = data
                })
                .catch(err => {
                    console.log(err);
                })
        },
        showUpdateArticleForm(ArticleData) {
            console.log(ArticleData);
            this.gonnaBeUpdated = ArticleData
            this.updateArticle = true
        },
        reload() {
            this.getArticles()
        },
        reloadHomepageFromUpdate() {
            this.writeArticle = false
            this.updateArticle = false
            this.getArticles()
        },
        setIsFound(data) {
            this.isFound = true
            this.foundArticles = data
        }
    },
    created() {
        if(localStorage.getItem('token')) {
            this.getArticles()
        }
    },
    mounted() {
        this.getArticles()
    }

}
</script>

<style>

</style>