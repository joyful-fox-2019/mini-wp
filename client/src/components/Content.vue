<template>
    <div class="container-fluid d-flex flex-column">
        <div class="w-100 container head-content">
            <nav class="bread">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Home Page</a></li>
                    <li class="breadcrumb-item"><a href="#">Profile</a></li>
                    <li class="breadcrumb-item"><a href="#">Create Article</a></li>
                </ol>
                <div class="d-flex justify-content-end">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                </div>
            </nav>
        </div>
        <div class="w-100 container main-content d-flex flex-column align-items-center" v-for="(data, index) in articles" :key="index">
            <!-- Card For Article -->
            <div v-if="!article">
                <div class="card m-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="https://image.freepik.com/free-photo/education-concept-student-studying-brainstorming-campus-concept-close-up-students-discussing-their-subject-books-textbooks-selective-focus_1418-626.jpg" class="card-img" alt="article">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">{{ data.title }}</h5>
                                <p class="card-text">{{ data.content }}</p>
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                            <div class="container">
                                <button class="btn btn-primary">Read</button>
                                <button class="btn btn-success">Edit</button>
                                <button class="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid form-article" v-if="article">
                <createarticle></createarticle>
            </div>
        </div>
    </div>
</template>
<script>

import createarticle from './CreateArticle'
import axios from 'axios'

export default {
    components:{
        createarticle
    },
    props : ['article'],
    data(){
        return {
            baseUrl: `http://localhost:3000`,
            articles: []
        }
    },
    methods:{
        fetchingDataArticle(){
            axios({
                url: `${this.baseUrl}/articles`,
                method: 'GET',
                headers:{
                    access_token: localStorage.getItem('token')
                }
            })
            .then(response => {
                this.articles = response.data
                console.log(this.articles)
            })
            .catch(err => {
            })
        }
    },
    created(){
        this.fetchingDataArticle()
    }
}
</script>
<style scope>
.head-content{
    background-color: whitesmoke;
    margin-top: 2%;
}
.main-content{
    overflow-y: scroll;
    background-color: white;
    margin-top: 2%;
    height: calc(100vh - 200px);
}
.form-article{
    margin-top: 2%;
}
</style>