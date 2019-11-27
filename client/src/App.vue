<template>
    <div>
        <ArticleNavbar v-if="page == 'article'" @change-page="changePage"></ArticleNavbar>
        <Navbar v-else @change-login="changeLogin" @change-page="changePage" :is-login="isLogin" @create-article="createArticle"></Navbar>

        <Sign v-if="!isLogin && page == 'sign'" @change-login="changeLogin" @change-page="changePage"></Sign>

        <HomePage v-if="page === 'home' && isLogin" key="home" @update-article="updateArticle"></HomePage>
        <ArticlePage v-if="page === 'article' && isLogin" key="article" :articleId="articleId" @change-page="changePage"></ArticlePage>
    </div>
</template>

<script>
import Navbar from './views/Navbar'
import Sign from './views/Sign'
import HomePage from './views/HomePage'
import ArticlePage from './views/ArticlePage'
import ArticleNavbar from './components/ArticleNavbar'

export default {
    name: 'App',
    components: {
        Navbar,
        HomePage,
        ArticlePage,
        ArticleNavbar,
        Sign
    },
    data() {
        return {
            isLogin: false,
            page: 'sign',
            articleId: null
        }
    },
    methods: {
        changePage(value) {
            this.page = value;
        },
        changeLogin(value) {
            if (value == "false") {
                this.isLogin = false
            } else {
                this.isLogin = true
            }
        },
        updateArticle(value) {
            this.articleId = value;
            this.page = 'article';
        },
        createArticle(value) {
            this.articleId = ''
            this.page = value
        }
    },
    created() {
        if (localStorage.getItem('jwt_token')) {
            this.isLogin = true
            this.page = 'home'
        }
    }
}
</script>

<style>
    * {
        font-family: 'Montserrat', sans-serif;
    }
</style>