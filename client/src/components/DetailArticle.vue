<template>
    <div class="container">
        <section class="hero is-info" style="border-radius:10px;">
            <div class="hero-body">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-64x64">
                        <img :src="featured_image" alt="featured">
                        </figure>
                    </div>
                    <div class="media-content">
                        <h1 class="title">
                            {{ title }}
                        </h1>
                        <small class="subtitle">
                            by {{ author }} {{ moment }}
                        </small>
                        <small>
                            <div class="container">
                                <b-tag v-for="(tag, index) in tags" :key="index" style="margin-right:5px;"> {{ tag }} </b-tag>
                            </div>
                        </small>
                    </div>
                </div>
            </div>
        </section>
        <section v-html="content" class="content">
        </section>
    </div>
</template>

<script>
    import axios from "../config/axios.js";
    import Swal from "sweetalert2";
    import moment from "moment";

    export default {
        name: "DetailArticle",
        data: function() {
            return {
                title: "",
                content: "",
                author: "",
                featured_image: [],
                tags: [],
                status: false,
                createdAt: null
            };
        },
        props: {
            mainpage: String,
            modified: String
        },
        methods: {
            getDetailArticle(page) {
                axios({
                    method: "GET",
                    url: `/articles/detail/${this.modified}`,
                    headers: {
                        "jwt_token": localStorage.getItem("token")
                    }
                })
                .then((response) => {
                    this.title = response.data.title;
                    this.content = response.data.content;
                    this.author = response.data.author;
                    this.featured_image = response.data.featured_image;
                    this.tags = response.data.tags;
                    this.status = response.data.status;
                    this.createdAt = response.data.createdAt;
                })
                .catch((err) => {
                    this.danger(err.response.data.message);
                });
            },
            changeMainPage(mainpage) {
                this.$emit("change-main-page", mainpage);
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
            this.getDetailArticle();
        },
        computed: {
            moment() {
                return moment(new Date(this.createdAt)).fromNow();
            }
        }
    }
</script>

<style scoped>
    .content {
        background-color: whitesmoke;
        height: 100vh;
        padding: 20px;
        border-radius: 10px;
    }
</style>
