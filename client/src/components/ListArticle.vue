<template>
  <div>
    <div v-for="(data, index) in dataList" :key="data.id">
        <div class="container my-2 card">
            <div :class="{'card-straight': (index % 2 == 0), 'card-reverse': (index % 2 == 1)}" >
                <div class="col-md-4 col-sm-6 mt-2">
                    <img :src="data.featured_image" width="100%" height="100%">
                </div>
                <div class="col-md-8 col-sm-6 mt-2">
                    <div class="row">
                        <h3>{{data.title}}</h3>
                    </div>
                    <div class="row">
                        <div v-for="(el, index) in data.tags" :key="index">
                        <p>{{el}} &nbsp;</p>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <p>Created by: {{data.author}}</p>
                    </div>
                </div>
            </div>
            <div class="row m-2">
                <p v-html="getDescription(index)" class="mx-2"></p>
            </div>
            <div class="row justify-content-between m-2">
                <div>
                    <div class="row justify-content-start" style="display: flex; justify-content: flex-start;">
                    <button class="btn btn-isi" @click="like(data._id)"><i class="fa fa-thumbs-up"></i> {{data.like.length}} </button>
                    <!-- <button class="btn btn-isi ml-1" @click="comment(data)" data-target="#commentForm" data-toggle="modal"><i class="fa fa-comments-o"> {{data.comment.length}} </i></button> -->
                </div>
                </div>
                <div>
                    <button @click="goToDetails(data._id)" class="btn" style="background-color: #fc7978; color: white;">To Details</button>
                </div>
                <div>
                    <a @click.prevent="showUpdate(data._id)" href="#">
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <image xlink:href='https://icon-library.net/images/write-icon/write-icon-20.jpg' alt="symbol" height="40" width="40">
                    </svg>   
                    </a>
                    <a @click.prevent="deleteArticle(data._id)" href="#">
                        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <image xlink:href='https://image.flaticon.com/icons/png/512/61/61848.png' alt="symbol" height="40" width="40">
                        </svg>   
                    </a>
                </div>
            </div>
        </div>
    </div>
        <!-- <div class="modal fade" id="commentForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Comments</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <div class="form-group" v-for="(comment, index) in data.comments" :key="index">
                            <p><b>{{comment.username}}</b> {{comment.comment}}</p>
                        </div>
                        <form >
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="comment ..." v-model="userComment">
                        </div>
                        </form>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-isi" data-dismiss="modal" @click="createComment">Comment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
export default {
    name: 'ListArticle',
    props: ['articleData', 'showPublic', 'showTag', 'UserArticle', 'namaTag'],
    data () {
        return {
            data: {},
            userComment: '',
            dataList: []
        }
    },
    methods: {
        deleteArticle (id) {
            let swalWithBootstrapButtons = swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            })
            .then((result) => {
                if (result.value) {
                    return axios({
                        url: `http://hackpress-server.panji-h8.online/article/${id}`,
                        method: 'delete',
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                } else if (result.dismiss === swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your ToDo is safe',
                        'error'
                    )}
                })
            .then (() => {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your Article has been deleted.',
                    'success',
                    2000
                )
                if (this.showPublic){
                    return axios({
                        url: 'http://hackpress-server.panji-h8.online/article/news',
                        method: 'get',
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                } else if (this.UserArticle) {
                    return axios({
                        url: 'http://hackpress-server.panji-h8.online/article',
                        method: 'get',
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                } else if (this.showTag) {
                    return axios({
                        url: `http://hackpress-server.panji-h8.online/article/tags/${this.namaTag}`,
                        method: 'get',
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                }
            })
            .then (({ data }) => {
                this.dataList = data
            })
            .catch (err => {
                swal.close()
                swal.fire({
                    type: 'error',
                    title: `You're unauthorized to delete this article`,
                    showConfirmButton: false,
                    timer: 2000
                })
            })
        },
        showUpdate (id) {
            axios({
                url: `http://hackpress-server.panji-h8.online/article/${id}`,
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then (({ data }) => {
                this.$emit('showUpdate', true)
                this.$emit('detailsPage', false)
                this.$emit('showPublic', false)
                this.$emit('UserArticle', false)
                this.$emit('dataUpdate', data)
                this.$emit('showTag', false)
            })
            .catch (err => {
                swal.fire({
                    type: 'error',
                    title: `You're unauthorized to update this article`,
                    showConfirmButton: false,
                    timer: 2000
                })
            })
        },
        createComment () {

        },
        comment (data) {

        },
        like (id){
            let msg
            axios({
                url: `http://hackpress-server.panji-h8.online/article/like/${id}`,
                method: 'patch',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then (({ data }) => {
                msg = data.msg
                if (this.showPublic){
                    return axios({
                        url: 'http://hackpress-server.panji-h8.online/article/news',
                        method: 'get',
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                } else if (this.UserArticle) {
                    return axios({
                        url: 'http://hackpress-server.panji-h8.online/article',
                        method: 'get',
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                } else if (this.showTag) {
                    return axios({
                        url: `http://hackpress-server.panji-h8.online/article/tags/${this.namaTag}`,
                        method: 'get',
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                }
            })
            .then (({ data }) => {
                this.dataList = data
                swal.fire({
                        title: `Success ${msg} an article`,
                        type: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    })
            })
            .catch (err => {

            })
        },
        getDescription (index) {
            let text = this.articleData[index].content
            if (text.length > 50) {
                return text.slice(0,50) + '...'
            } else {
                return text
            }
        },
        goToDetails (id) {
            axios({
                url: `http://hackpress-server.panji-h8.online/article/${id}`,
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then (({ data }) => {
                this.articleData = []
                this.$emit('detailsPage', true)
                this.$emit('showPublic', false)
                this.$emit('articleData', this.articleData)
                this.$emit('UserArticle', false)
                this.$emit('article', data)
                this.$emit('showTag', false)
            })
        },
        showList () {
            axios({
                url: 'http://hackpress-server.panji-h8.online/article',
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then (({ data }) => {
                this.dataList = data
            })
        }
    },
    watch: {
        articleData: function(val) {
            this.dataList = val
        }
    },
    created() {
        this.dataList = this.articleData
    }
}
</script>

<style>
.card-reverse{
    display: flex;
    flex-direction: row;
}

.card-straight {
    display: flex;
    flex-direction: row-reverse;
}
</style>