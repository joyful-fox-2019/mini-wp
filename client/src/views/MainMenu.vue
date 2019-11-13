<template>
  <div>
  <div class="container-fluid">
            <div class="row">
                <side-bar v-if="!articleOption"></side-bar>
                <div class="col-10 d-flex" v-if="!loginStatus">
                    <div class="d-flex justify-content-center ml-auto mr-auto mt-auto mb-auto">
                            <i class="fas fa-info-circle fa-10x d-flex justify-content-center" style="color:#BFBFBF;"></i>
                    </div>
                </div>
                <div class="col-10" style="overflow: scroll; height: 93vh;" v-if="loginStatus" v-show="!articleOption">
                    <div class="container" id="main-article">
                        <nav class="navbar navbar-expand-sm mt-5 navbar-dark dx-flex"
                            style="background-color: rgb(250, 248, 248);">
                            <button type="button" class="btn d-flex btn-lighalign-items-center pl-4"
                                style="border-radius: 0;">
                                Published
                                <div class="ml-1 article-count">
                                    {{articles.length}}
                                </div>
                            </button>
                            <button type="button" class="btn d-flex btn-lighalign-items-center pl-4"
                                style="border-radius: 0;">
                                Drafts
                                <div class="ml-1 article-count">
                                    {{articles.length}}
                                </div>
                            </button>
                            <div class="ml-auto d-flex align-items-center">
                                <form>
                                    <input type="text" v-show="search" v-model="searchValue" placeholder="Search.."
                                        style="border-radius: 4px; outline: none; border: 1px solid rgba(44, 98, 134, 0.329); text-align: center; padding: 2px;"
                                        >
                                </form>
                                <button type="button"
                                    class="ml-1 searchByName d-flex align-items-center" @click="searchButton">
                                    <i class="fa fa-search fa-1x" aria-hidden="true"></i>
                                </button>
                            </div>
                        </nav>
                    </div>
                    <div class="container" v-for="(article, i) in filterArticle" :key="i">
                        <nav  class="navbar navbar-expand-sm mt-3 navbar-dark dx-flex"
                            style="background-color: rgb(250, 248, 248);">
                            <div id=" time1title-article" class="align-items-start d-flex flex-column">
                                <p class="btn d-flex pl-4 mt-4"
                                    style="border-radius: 0; font-weight: bolder; margin-bottom: 0; font-size: 2em;">
                                    {{article.title}}
                                </p>
                                <p class="btn d-flex pl-4 pt-0 pb-2 mt-0" style="font-size: 15px;">
                                    {{article.createdAt}}
                                </p>
                            </div>
                            <div class="d-flex ml-auto">
                                <img :src="article.imageUrl"
                                    alt="patrict" style="height: 7em;">
                                <div class="d-flex flex-column ml-2">
                                    <button type="button" class="flex-column d-flex"
                                        v-on:click="deleteArticle(article._id)"
                                        style="height: 0px; outline: none; border: none;">
                                        <i class="fa fa-trash fa-2x mt-5 pt-3 flex-column d-flex" id="buttonDelete"></i>
                                    </button>
                                    <button type="button" class="flex-column d-flex" @click="editArticle(article)"
                                        style="height: 0px; outline: none; border: none;">
                                        <i class="fas fa-edit fa-2x mt-3 flex-column d-flex" id="buttonEdit"></i>
                                    </button>
                                </div>
                            </div>
                        </nav>
                        <nav  class="d-flex"
                            style="background-color: rgb(255, 200, 248);">
                            <label class="mx-auto my-auto" for="">title</label>
                        </nav>
                        <nav  class="navbar navbar-expand-sm navbar-dark d-flex"
                            style="background-color: rgb(250, 248, 248);">
                                <p class="mx-auto my-auto"
                                    style="font-size: 1.3em;">
                                    {{article.content}}
                                </p>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-5" v-if="articleOption">
            <form class="mt-5 col-7" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="">TITLE</label>
                    <input type="text" v-model="createArticle.title" class="form-control" aria-describedby="helpId"
                        placeholder="Your Title">
                    <small id="helpId" class="form-text text-muted">input your title</small>
                </div>
                <div class="form-group">
                    <wysiwyg v-model="myHTML"/>
                </div>
                <div class="form-group">
                    <label for="">image Content</label>
                    <b-form-file v-model="createArticle.imageUrl" plain></b-form-file>
                    <div class="mt-3"> selected file: {{ createArticle.imageUrl ? createArticle.imageUrl.name : '' }}  </div>
                    <small id="fileHelpId" class="form-text text-muted">your image</small>
                </div>
                <div class="d-flex justify-content-start">
                    <input class="btn btn-success"
                        type="submit" value="Update" @click.prevent="update(articleIdUpdate)" v-show="editButton">
                    <input class="btn btn-primary"  type="submit" v-show="createButton"
                        value="Create" @click.prevent="create">
                    <input class="btn btn-danger ml-2" type="reset" value="Reset">
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import axios from '../../apis/server'
import Swal from 'sweetalert2'
import sidebar from '../components/Sidebar'

export default {
    props : ["loginStatus","articleOption"],
    name : 'MainMenu',
    data(){
        return {
            articles : [],
            search : false,
            searchValue : '',
            articleIdUpdate : 0,
            createArticle : {
                title : '',
                imageUrl : '',
            },
            myHTML :'',
            createButton : true,
            editButton : false,
            showSideBar : true
        }
    },
    methods: {
        update(id){
            let article = {
                title : this.createArticle.title,
                content : this.myHTML,
                imageUrl : this.createArticle.imageUrl
            }
            axios({
                url : `/article/${id}`,
                method : 'put',
                data : article,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.showArticle()
                this.$emit('writeArticle', false)
                this.$emit('changeLogin', true)
                this.showSideBar = true
            })
            .catch(err=>{
                console.log(err);
            })
        },
        editArticle(article){
            this.showSideBar = false
            this.createButton = false
            this.editButton = true
            this.$emit('writeArticle', true)
            this.createArticle.title = article.title
            this.createArticle.content = article.content
            this.createArticle.imageUrl = article.imageUrl,
            this.articleIdUpdate = article._id
        },
        create(){
            this.showSideBar = false
            this.editButton = false
            this.createButton = true
            this.showSideBar = true
            let data = new FormData()
            data.append('title', this.createArticle.title )
            data.append('content', this.myHTML )
            data.append('imageUrl', this.createArticle.imageUrl )
            console.log(this.createArticle.imageUrl)
            axios({
                url : `/article`,
                method : 'post',
                data : data,
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.$emit('writeArticle', false)
                this.$emit('changeLogin', true)
                
            })
            .catch(err=>{
                console.log(err);
            })
        },
        deleteArticle(id){
            axios({
                url : `/article/${id}`,
                method : 'delete',
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.showArticle()
            })
            .catch(err=>{
                console.log(err);
            })
        },
        searchButton(){
            this.search ? this.search = false : this.search = true
        },
        showArticle(){
            axios({
                url : `/article`,
                method : 'get',
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.articles = data
                this.articles.forEach((article, index) => {
                    let time = this.getTime(article.createdAt)
                    this.articles[index].createdAt = time
                })
                console.log(this.articles);
            })
            .catch(err=>{
                console.log(err)
            })
        },
        getTime(previous) {
            this.created_at = ""
            let currentDate = new Date().toISOString().substr(0, 10)
            let currentTime = new Date().toTimeString().substring(0, 8)
            let currentSecond = Math.floor(new Date().getMilliseconds() % 60)
            currentDate = currentDate.split('-')
            currentTime = currentTime.split(':')
            let current = new Date(currentDate[0], currentDate[1], currentDate[2], currentTime[0], currentTime[1], currentTime[2], currentSecond)
            let date = new Date(previous).toISOString().substr(0, 10)
            let time = new Date(previous).toTimeString().substring(0, 8)
            let second = Math.floor(new Date(previous).getMilliseconds() % 60)
            date = date.split('-')
            time = time.split(':')
            previous = new Date(date[0], date[1], date[2], time[0], time[1], time[2], second)

            let msPerMinute = 60 * 1000;
            let msPerHour = msPerMinute * 60;
            let msPerDay = msPerHour * 24;
            let msPerMonth = msPerDay * 30;
            let msPerYear = msPerDay * 365;
            let elapsed = current - previous;
            if (elapsed < msPerMinute) {
                return this.created_at = Math.round(elapsed / 1000) + ' seconds ago';
            } else if (elapsed < msPerHour) {
                return this.created_at = Math.round(elapsed / msPerMinute) + ' minutes ' + Math.round(elapsed / 1000) % 60 + ' seconds ago';
            } else if (elapsed < msPerDay) {
                return this.created_at = Math.round(elapsed / msPerHour) + ' hours ' + Math.round(elapsed / msPerMinute) % 60 + ' minutes ago ' + Math.round(elapsed / 1000) % 60 + ' seconds ago';
            } else if (elapsed < msPerMonth) {
                return this.created_at = Math.round(elapsed / msPerDay) + ' days ' + Math.round(elapsed / msPerHour) % 24 + ' hours ago ' + Math.round(elapsed / msPerMinute) % 60 + ' minutes ago ' + Math.round(elapsed / 1000) % 60 + ' seconds ago';;
            } else if (elapsed < msPerYear) {
                return this.created_at = Math.round(elapsed / msPerMonth) + ' months ago';
            } else {
                return this.created_at = Math.round(elapsed / msPerYear) + ' years ago';
            }
        },
    },
    created(){
        console.log('dari main menu');
        if(localStorage.getItem("token")){
            this.showArticle()
        }
    },
    computed: {
        filterArticle() {
            if (this.searchValue) {
                return this.articles.filter(article => {
                    return article['title'].toLowerCase().includes(this.searchValue.toLowerCase())
                })
            } else {
                return this.articles
            }
        }
    },
    components : {
        'side-bar' : sidebar
    }
}
</script>

<style>
</style>