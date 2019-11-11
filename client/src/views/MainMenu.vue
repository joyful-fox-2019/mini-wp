<template>
  <div>
  <div class="container-fluid" >
            <div class="row">
                <div class="col-2 d-flex flex-column p-0"
                    style="background-color: #FFFFFF; overflow: scroll; height: 93vh; overflow-x: hidden ;">
                    <button type="button" class="btn d-flex btn-light align-items-center pl-4 pt-3"
                        style="border-radius: 0;">
                        <i class="fa fa-laptop fa-2x mr-4" aria-hidden="true"></i>
                        View Site
                    </button>
                    <button type="button" class="btn btn-light d-flex pl-4 align-items-center"
                        style="border-radius: 0;">
                        <i class="fa fa-signal fa-2x mr-4" aria-hidden="true"></i>
                        Stats
                    </button>
                    <button type="button" class="btn btn-light d-flex pl-4 align-items-center"
                        style="border-radius: 0;">
                        <i class="fa fa-history fa-2x mr-4" aria-hidden="true"></i>
                        Activity
                    </button>
                    <button type="button" class="btn btn-light d-flex pl-4 align-items-center"
                        style="border-radius: 0;">
                        <i class="fa fa-clipboard fa-2x mr-4" aria-hidden="true"></i>
                        Stats
                    </button>
                    <div class="my-2 mt-3 ml-3" style="font-weight: bold; font-size: 1em;"> Manage </div>
                    <button type="button" class="btn d-flex btn-light align-items-center pl-4"
                        style="border-radius: 0;">
                        <i class="fa fa-sticky-note fa-2x mr-4" aria-hidden="true"></i>
                        Sites Pages
                    </button>
                    <button type="button" class="btn d-flex btn-light align-items-center pl-4"
                        style="border-radius: 0;">
                        <i class="fa fa-list fa-2x mr-4" aria-hidden="true"></i>
                        Blog Post
                    </button>
                    <button type="button" class="btn d-flex btn-light align-items-center pl-4"
                        style="border-radius: 0;">
                        <i class="fa fa-image fa-2x mr-4" aria-hidden="true"></i>
                        Media
                    </button>
                    <button type="button" class="btn d-flex btn-light align-items-center pl-4"
                        style="border-radius: 0;">
                        <i class="fa fa-commenting-o fa-2x mr-4" aria-hidden="true"></i>
                        Comments
                    </button>
                    <button type="button" class="btn d-flex btn-light align-items-center pl-4"
                        style="border-radius: 0;">
                        <i class="fa fa-rss-square fa-2x mr-4" aria-hidden="true"></i>
                        FeedBack
                    </button>
                    <button type="button" class="btn d-flex btn-light align-items-center pl-4"
                        style="border-radius: 0;">
                        <i class="fa fa-plug fa-2x mr-4" aria-hidden="true"></i>
                        Plugin
                    </button>
                    <button type="button" class="btn d-flex btn-light align-items-center pl-4"
                        style="border-radius: 0;">
                        <i class="fa fa-download fa-2x mr-4" aria-hidden="true"></i>
                        Import
                    </button>
                    <div class="my-2 mt-3 ml-3" style="font-weight: bold; font-size: 1em;"> Personalize </div>
                    <button type="button" class="btn d-flex btn-light align-items-center pl-4"
                        style="border-radius: 0;">
                        <i class="fa fa-edit fa-2x mr-4" aria-hidden="true"></i>
                        Customize
                    </button>
                </div>
                <div class="col-10 d-flex" v-if="!isLogin">
                    <div class="d-flex justify-content-center ml-auto mr-auto mt-auto mb-auto">
                            <i class="fas fa-info-circle fa-10x d-flex justify-content-center" style="color:#BFBFBF;"></i>
                    </div>
                </div>
                <div class="col-10" style="overflow: scroll; height: 93vh;" v-if="isLogin">
                    <div class="container" id="main-article">
                        <nav class="navbar navbar-expand-sm mt-5 navbar-dark dx-flex"
                            style="background-color: rgb(250, 248, 248);">
                            <button type="button" class="btn d-flex btn-lighalign-items-center pl-4"
                                style="border-radius: 0;">
                                Published
                                <div class="ml-1 article-count">
                                    {{articleCount}}
                                </div>
                            </button>
                            <button type="button" class="btn d-flex btn-lighalign-items-center pl-4"
                                style="border-radius: 0;">
                                Drafts
                                <div class="ml-1 article-count">
                                    {{articleDraft}}
                                </div>
                            </button>
                            <div class="ml-auto d-flex align-items-center">
                                <form v-if="search">
                                    <input type="text"
                                        style="border-radius: 4px; outline: none; border: 1px solid rgba(44, 98, 134, 0.329); text-align: center; padding: 2px;"
                                        v-model="searchValue">
                                </form>
                                <button type="button" v-on:click="searchIt"
                                    class="ml-1 searchByName d-flex align-items-center">
                                    <i class="fa fa-search fa-1x" aria-hidden="true"></i>
                                </button>
                            </div>
                        </nav>
                    </div>
                    <div class="container" :v-for="article in articles">
                    {{article}}
                        <nav  class="navbar navbar-expand-sm mt-3 mb-3 navbar-dark dx-flex"
                            style="background-color: rgb(250, 248, 248);">
                            <div id=" time1title-article" class="align-items-start d-flex flex-column">
                                <p class="btn d-flex pl-4 mt-4"
                                    style="border-radius: 0; font-weight: bolder; margin-bottom: 0; font-size: 2em;">
                                    {{article.title}}
                                </p>
                                <p class="btn d-flex pl-4 pt-0 pb-2 mt-0" style="font-size: 15px;">
                                    {{article.created_at}}
                                </p>
                            </div>
                            <div class="d-flex ml-auto">
                                <img src="https://cdnx2.kincir.com/production/2019-08/thumbnail_600/10dc8a12098a15e8a8ebcd3cc3a12e928851dee7.jpg"
                                    alt="patrict" style="height: 7em;">
                                <div class="d-flex flex-column ml-2">
                                    <button type="button" class="flex-column d-flex"
                                        v-on:click="deleteArticle(article._id)"
                                        style="height: 0px; outline: none; border: none;">
                                        <i class="fa fa-trash fa-2x mt-5 pt-3 flex-column d-flex" id="buttonDelete"></i>
                                    </button>
                                    <button type="button" class="flex-column d-flex" v-on:click="editArticle(article)"
                                        style="height: 0px; outline: none; border: none;">
                                        <i class="fas fa-edit fa-2x mt-3 flex-column d-flex" id="buttonEdit"></i>
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div>

                </div>
            </div>
        </div>
        <div class="container mt-5" v-if="createArticle">
            <div id="editor">
                <p>My Article</p>
                <p>Some initial <strong>bold</strong> text</p>
                <p><strong>BY ANGGA x QUILL</strong></p>
                <p><br></p>
            </div>
            <form class="mt-5 col-7">
                <div class="form-group">
                    <label for="">TITLE</label>
                    <input type="text" class="form-control" aria-describedby="helpId"
                        placeholder="Your Title">
                    <small id="helpId" class="form-text text-muted">input your title</small>
                </div>
                <div class="form-group">
                    <label for="">Content</label>
                    <textarea class="form-control" rows="3"
                        placeholder="Your Content"></textarea>
                </div>
                <div class="form-group">
                    <label for="">image Content</label>
                    <input type="file" class="form-control-file" aria-describedby="fileHelpId"
                        placeholder="Your Image">
                    <small id="fileHelpId" class="form-text text-muted">your image</small>
                </div>
                <div class="d-flex justify-content-start">
                    <input class="btn btn-success"
                        type="submit" value="Update">
                    <input class="btn btn-primary"  type="submit"
                        value="Create">
                    <input class="btn btn-danger ml-2" type="reset" value="Reset">
                </div>
            </form>
    <p>{{ isLogin }}</p>
        </div>
    </div>
</template>

<script>

import axios from '../../apis/server'
import Swal from 'sweetalert2'

export default {
    props : ["isLogin"],
    name : 'MainMenu',
    data(){
        return {
            isLogin : this.isLogin,
            createArticle : true,
            articles : []
        }
    },
    methods: {
        showArticle(){
            axios({
                url : `/article`,
                method : 'get',
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                console.log(data)
                this.articles = data
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    created(){
        this.showArticle()
    },
    computed: {
        
    },
}
</script>

<style>
</style>