<template>
    <div>
        <div v-for="article in articles" :key="article._id" class="card" style="display:flex;">
            <div class="card-image">
                <figure class="image is-4by3">
                <img :src="article.featured_image" alt="featured">
                </figure>
            </div>
            <div class="card-content" style="width:100%">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                        <img :src="article.featured_image" alt="featured">
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">{{ article.title }}</p>
                        <p class="subtitle is-6"><small>Author : {{ article.author }}</small></p>
                    </div>
                    <div class="media-right">
                        <b-dropdown                    
                            position="is-bottom-left"
                            aria-role="menu">
                            <a
                                class="navbar-item"
                                slot="trigger"
                                role="button">
                                <span></span>
                                <b-icon icon="dots-vertical"></b-icon>
                            </a>

                            <b-dropdown-item @click="modifyPage('edit',article._id)" value="edit" aria-role="menuitem" style="display:flex; align-items:center;">
                                <b-icon icon="circle-edit-outline" style="margin-right:5px;"></b-icon>
                                Edit Article
                            </b-dropdown-item>
                            <hr class="dropdown-divider">
                            <b-dropdown-item @click="delArticle(article._id)" value="delete" aria-role="menuitem" style="display:flex; align-items:center;">
                                <b-icon icon="delete-circle" style="margin-right:5px;"></b-icon>
                                Delete Article
                            </b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
                
                <div v-html="article.content" class="content"></div>
                <br/>
                <div style="display:flex;">
                    <small>
                        <span style="margin-right:5px;">Tags : </span>
                    </small>
                    <small>
                        <div class="container">
                            <b-tag v-for="(tag, index) in article.tags" :key="index" style="margin-right:5px;"> {{ tag }} </b-tag>
                        </div>
                    </small>
                </div>
                <small><time datetime="2016-1-1"> Created by {{ article.UserId.name }} at {{ new Date(article.createdAt).toISOString().split('T')[0].split("-").reverse().join("-") }}</time></small>
                <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="small">
                    <a target="_blank" :href="`https://www.facebook.com/sharer/sharer.php?u=${article.featured_image}&amp;src=sdkpreparse`" class="fb-xfbml-parse-ignore">
                        Share
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "../config/axios.js";
    import Swal from "sweetalert2";

    export default {
        data: function() {
            return {
                articles: []
            };
        },
        props: {
            mainpage: String,
            modified: String
        },
        methods: {
            getUserArticles() {
                axios({
                    method: "GET",
                    url: "/articles/"
                })
                .then((responses) => {
                    this.articles = responses.data;
                })
                .catch((err) => {
                    this.danger(err.response.data.message);
                });
            },
            changeMainPage(mainpage) {
                this.$emit("change-main-page", mainpage);
            },
            modifyPage(page, params) {
                this.$emit("modify-page", page, params);
            },
            delArticle (articleId) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                })
                .then((result) => {
                    if (result.value) {
                        axios({
                            method: "DELETE",
                            url: `/articles/${articleId}`
                        })
                        .then((response) => {
                            if (response.data.n === 1) {
                                this.getAllArticles();
                                this.success("Successfully deleted");
                            } else {
                                this.danger("Failed to delete");
                            }
                        })
                        .catch((err) => {
                            this.danger(err.response.data.message);
                        });
                    }
                });
            },
            success(message) {
                this.$buefy.toast.open({
                    duration: 1500,
                    message: message,
                    position: "is-top-right",
                    type: "is-success"
                })
            },
            danger(message) {
                this.$buefy.toast.open({
                    duration: 1500,
                    message: message,
                    position: "is-top",
                    type: "is-danger"
                })
            }
        },
        created() {
            this.getUserArticles();
        }
    }
</script>

<style>

</style>