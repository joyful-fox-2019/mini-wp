<template>
     
    <div class="card mb-3" style="max-width: 100%;">
        <div class="row no-gutters">
            <div class="col-md-4">
            <img :src="article.image" class="card-img" alt="elephant">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">{{article.title}}</h5>
                <p class="card-text">{{article.content}}</p>
            </div>
            <div class="col-md">
                <tag v-for="(tag,index) in article.tags" :tag="tag" :key="index"></tag>
  
                <p class="card-text"></p>
                <hr>
            </div>
            <div class="col-md">
                <p class="card-text"><small class="text-muted">{{article.created_at}}</small></p>
                <hr>
            </div>
             <div class="col-md">
            <div class="buttons">
                <button class="button is-warning is-light">Update</button>
                <button class="button is-danger is-light">Delete</button>
            </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import tag from '../components/tag'
import axios from 'axios'
export default {
    components: {
        tag
    },
    props: ['article'],
    data () {
        return {
            createdDate: '',
            tags: this.article.tags,
            baseUrl: 'http://localstorage:3000'
        }
    },
    methods: {
        deleteArticle () {
            Swal.showLoading()
            axios({
                url: `${this.baseUrl}/articles/${this.article.id}`,
                method: "DELETE",
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then (({data})=>{
                Swal.close()
                Swal.fire({
                icon: 'success',
                title: `${data.message}`,
                showConfirmButton: false,
                timer: 1500
                })
            })
            .catch((err)=>{
                Swal.close()
                Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.response.data.message}`
                })
            })
        }
    }
}
</script>

<style>

</style>