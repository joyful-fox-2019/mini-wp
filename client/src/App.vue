<template>
    <div>
        <ArticleNavbar v-if="page == 'article'" @change-page="changePage"></ArticleNavbar>
        <Navbar v-else @change-page="changePage" @change-login="changeLogin"></Navbar>

        <Login v-if="!isLogin && page == 'login'" @change-login="changeLogin" @change-page="changePage"></Login>
        <Register v-if="page == 'register'" @change-page="changePage"></Register>

        <HomePage v-if="page === 'home' && isLogin" key="home"></HomePage>
        <ArticlePage v-if="page === 'article' && isLogin" key="article"></ArticlePage>
    </div>
</template>

<script>
import Navbar from './views/Navbar'
import Login from './views/Login'
import Register from './views/Register'
import HomePage from './views/HomePage'
import ArticlePage from './views/ArticlePage'
import ArticleNavbar from './components/ArticleNavbar'

export default {
    name: 'App',
    components: {
        Navbar,
        Login,
        Register,
        HomePage,
        ArticlePage,
        ArticleNavbar
    },
    data() {
        return {
            isLogin: false,
            page: "login"
        }
    },
    methods: {
        changePage(value) {
            this.page = value;
        },
        changeLogin(value) {
            this.isLogin = value;
        }
    },
    created() {
        if (localStorage.getItem('token')) {
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

    body {
        background-color: white;
    }
</style>