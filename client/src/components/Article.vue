<template>
    <div class="card">
        <div class="row card-body">
            <div class="col-sm-9 col-lg-9" >
                <h5 class="card-title"> {{ ArticleData.title }} </h5>
                <h6> {{ ArticleData.created_at }} </h6>
                <p class="card-text"> {{ ArticleData.content }} </p>
                <button @click.prevent="deleteArticle( ArticleData._id )" class="btn btn-primary">Delete</button>
                <button @click.prevent="showUpdateForm" class="btn btn-primary">Update</button>

            </div>
            <div class="col-sm-3 col-lg-3" style="text-align: right;">
                <img :src="ArticleData.featured_image" alt="cannot find image" style="width: 200px">
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    name: "Article",
    props: ['ArticleData'],
    data(){
        return {
            updateForm: false,
            article_id: ''
        }
    },
    methods: {
        deleteArticle(id) {
            axios({
                method: "DELETE",
                url: `http://miniwpserver.hoandreasm.xyz/articles/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({data}) => {
                    Swal.fire({
                        icon: 'success',
                        title: `Success deleted the article`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$emit('showhomepage')
                })
                .catch(err => {
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong.. Or! Your are not authorized lol'
                    })
                })
        },
        showUpdateForm() {
            this.$emit('update-article', this.ArticleData)
        }
    }
}
</script>

<style>

</style>