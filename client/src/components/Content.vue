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
        <div class="w-100 container main-content d-flex flex-column" v-if="!article">
            <!-- Card For Article -->
            <div v-for="(data, index) in articles" :key="index">
                <div>
                    <div class="card m-3">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img :src="data.featured_image" class="card-img" alt="article">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">{{ data.title }}</h5>
                                    <p class="card-text">{{ data.content }}</p>
                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                </div>
                                <div class="container">
                                    <button v-on:click="editArticle(data._id)" class="btn btn-success">Edit</button>
                                    <button v-on:click="deleteArticle(data._id)" class="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid form-article" v-if="article">
            <createarticle @show-article="showArticle" v-if="!isEdit"></createarticle>
            <div v-if="isEdit">
            <editform :edit-article="newEditArticle"></editform>
            </div>
        </div>
    </div>
</template>
<script>

import createarticle from './CreateArticle'
import axios from 'axios'
import Swal from 'sweetalert2'
import editform from './EditForm'

export default {
    components:{
        createarticle,
        editform
    },
    props : ['article'],
    data(){
        return {
            baseUrl: `http://localhost:3000`,
            articles: [],
            newEditArticle: {},
            isEdit: false
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
        },
        showArticle(){
            this.$emit('show-article')
            this.fetchingDataArticle()
        },
        deleteArticle(id){
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
                axios({
                    url: `${this.baseUrl}/articles/${id}`,
                    method: "DELETE",
                    headers:{
                        access_token: localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.fetchingDataArticle()
                    console.log(response)
                    Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                })
                .catch(err => {
                    console.log(err)
                })
            })
        },
        editArticle(id){
            Swal.showLoading()
            axios({
                url: `${this.baseUrl}/articles/user/${id}`,
                method: "GET",
                headers:{
                    access_token: localStorage.getItem('token')
                }
            })
            .then(response => {
                Swal.close()
                let article = response.data;
                this.newEditArticle = article
                this.isEdit = true
                console.log(this.newEditArticle)
            })
            .catch(err => {
                console.log(err)
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
.card-img{
    max-height: 195px;
}
</style>