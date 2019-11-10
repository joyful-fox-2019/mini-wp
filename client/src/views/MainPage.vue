<template>
    <div class="container-fluid d-flex">
        <div class="side-bar d-flex flex-column">
            <sidebar @create-article="createArticle" @home-page="homePage"></sidebar>
        </div>
        <div class="content-page">
            <contentpage v-bind:article="this.isArticle" @show-article="homePage"></contentpage>
        </div>
    </div>
</template>
<script>

import sidebar from '../components/SideBar'
import contentpage from '../components/Content'
import createarticle from '../components/CreateArticle'
import axios from 'axios'

export default {
    components:{
        sidebar,
        contentpage
    },
    data(){
        return {
            isArticle: false,
        }
    },
    methods:{
        createArticle(){
            this.isArticle = true
        },
        homePage(){
            this.isArticle = false
        }
    }
}
</script>
<style scope>
.side-bar{
    height: calc(100vh - 56px);
    width: 20%;
}

.content-page{
    height: calc(100vh - 56px);
    width: 80%;
    background-color: whitesmoke;
}
</style>