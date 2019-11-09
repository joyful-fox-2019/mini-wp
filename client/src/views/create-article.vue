<template>
    <div class="body-container">
        <div class="d-flex flex-column mb-5 m-5">
            <div style="overflow-wrap: break-word;">
                <h1 v-if="!article.title" class="h1-title">Write Articles......</h1>
                <h1 v-if="article.title" class="h1-title">{{ article.title }}</h1>
            </div>
            <div class="d-flex align-items-center">
                <input v-model="article.title" class="input-title" type="text" placeholder="Enter title">
                <div class="w-50 d-flex justify-content-end">
                    <button v-if="!articleId" @click="createArticle" class="btn btn-info w-25 mx-3">Create</button>
                    <button v-if="articleId" @click="updateArticle" class="btn btn-success w-25 mx-3">Update</button>
                    <button v-if="articleId" @click="deleteArticle" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                </div>
            </div>

            <input class="my-4" type="file" @change="onFileSelected" ref="file"  accept="image/*" />

            <quill-editor v-model="article.content" ref="myQuillEditor"></quill-editor>
            <form @submit.prevent="makeTag">
                <input v-model="inputTag" type="text" class="input-tag" placeholder="Enter tag">
                <button class="btn btn-primary"><i class="fas fa-plus"></i></button>
            </form>
            <div class="w-100 d-flex flex-wrap" >
                <div class="create-tag" v-for="(tag, i) in article.tags" :key="i">#{{ tag }}  <i @click="removeTag(i)" class="text-white fas fa-times"></i></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../config/axios'
import Swal from 'sweetalert2'
export default {
    name:'create-article',
    data(){
        return {
            article: {
                title: "",
                file: "",
                content: "",
                tags: []
            },
            inputTag: "",
            selectedFile: null,
        }
    },
    props: ['articleId', 'page'],
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            this.article.file = this.selectedFile;
        },
        createArticle() {
            Swal.showLoading()
            const fd = new FormData();

            this.article.tags.forEach(el => {
                fd.append("tags", el);
            });

            fd.append("title", this.article.title);
            fd.append("content", this.article.content);
            fd.append("file", this.article.file);
            axios.post(`/articles`, fd, {
                headers: {
                    token: localStorage.getItem("token")
            }
            })
            .then(() => {
                this.$emit('changePage', 'home')
                this.$noty.info("Success add new Article!")
            })
            .catch(({ response }) => {
                this.$noty.error(response.data.message)
            })
            .finally(()=>{
                Swal.close()
            })
        },
        makeTag() {
            let tagArr = this.inputTag.split(" ");
            tagArr.forEach(tag => {
                if (tag[0] == "#") {
                this.article.tags.push(tag.substring(1));
                } else if (tag) {
                this.article.tags.push(tag);
                }
            });
            this.inputTag = "";
        },
        removeTag(index) {
            this.article.tags.splice(index, 1);
        },
        fectchOneArticle(){
            Swal.showLoading()
            axios({
                method: 'get',
                url: `/articles/${this.articleId}`,
                headers:{
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.article.title = data.title
                this.article.content = data.content
                this.article.tags = data.tags
            })
            .catch(({ response }) => {
                this.$noty.error(response.data.message)
            })
            .finally(()=>{
                Swal.close()
            })
        },
        updateArticle(){
            Swal.showLoading()
            const fd = new FormData();

            this.article.tags.forEach(el => {
                fd.append("tags", el);
            });

            fd.append("title", this.article.title);
            fd.append("content", this.article.content);
            if (this.selectedFile) {
                fd.append("file", this.article.file);
            }

            axios.patch(`/articles/${this.articleId}`, fd, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            .then(({data})=>{
                this.$emit('changePage', 'home')
                this.$noty.info("Success Update Article")
            })
            .catch(({ response }) => {
                this.$noty.error(response.data.message)
            })
            .finally(()=>{
                Swal.close()
            })
        },
        deleteArticle(){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.value) {
                    Swal.showLoading()
                    axios({
                        method: 'delete',
                        url: `/articles/${this.articleId}`,
                        headers:{
                            token : localStorage.getItem('token')
                        }
                    })
                    .then(({data})=>{
                        this.$emit('changePage', 'home')
                        this.$noty.info("Success Delete Article")
                    })
                    .catch(({ response }) => {
                        this.$noty.error(response.data.message)
                    })
                    .finally(()=>{
                        Swal.close()
                    })
                    }
                })
        },
    },
    created(){
        if(this.articleId){
            this.fectchOneArticle()
        }
    }
}
</script>

<style>
.ql-editor{
    min-height: 300px !important;
}

.h1-title{
    font-family: 'Lobster', cursive;
    font-size: 60px;
    text-align: center;
    color: #bb0ce767;
}

.input-title{
    margin: 15px 0;
    padding: 10px;
    width: 500px;
    border: none;
    border-left: 15px solid #bb0ce767;
    outline: none;
}

.input-tag{
     margin: 15px 0;
    padding: 8px;
    width: 500px;
    border: none;
    border-left: 15px solid #0069ff;
    outline: none;
}

.create-tag{
    color: white;
    cursor: pointer;
    padding: 2px 8px;
    border-radius: 15px;
    display: inline-block;
    margin: 5px;
    background-color: rgba(187, 12, 231, 0.404);
    box-shadow: 10px 10px 38px -9px rgba(240,118,240,1);
}


</style>