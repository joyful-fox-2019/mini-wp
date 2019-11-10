<template>
  <div class="container-fluid">
            <div class="row">
                <div class="col-md-2 pl-0">
                    <sideBar></sideBar>
                </div>
                <div class="col-md-10">                    
                    <form @submit.prevent="createArticle()">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-sm-4">
                                    <img class="img-thumbnail" src="../components/img/1.jpeg" alt="">
                                </div>
                                <div class="col-sm-8">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Title</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="articleTitle" required>
                                    </div> 
                                    <p class="pb-0">Add picture</p>
                                     <div class="input-group"> 
                                        <!-- <form @submit.prevent="upload"> -->
                                        <input class="" type="file" name="file" @change="changeFile" ref="myFiles" />
                                        <input type="submit" val="test" class="btn">
                                        <!-- </form> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4 class="text-center my-3">Content</h4>
                        <quillEditor v-model="articleContent" ref="myQuillEditor"></quillEditor>
                        <div class="d-flex justify-content-between mt-2">
                            <button type="submit" class="btn btn-success" @click.prevent="createArticle()" href=""><i class="fa fa-floppy-o pr-1"></i>Save</button>
                            <button class="btn btn-danger" @click.prevent="cancel()" href=""><i class="fa fa-times-circle-o pr-1"></i>Cencel</button> 
                        </div>  
                    </form>
                    <!-- form close -->
                </div>  
            </div>            
        </div> 
</template>

<script>

import sideBar from '../components/sideBar'
import quill from 'quill'
// Basic Use - Covers most scenarios
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor'

export default {
    components : {
        sideBar,
        quillEditor,
    },
    data() {
        return {
            articleTitle : '',
            articleContent : '',
            articleFeaturedImage : ''
        }
    },    
    methods : {
        cancel() {
            console.log('masuk cancel')
            this.$emit('cancel-Add')
        },
        createArticle() {
            console.log('masuk create article')
            const article = this.createArticleInstance()
            article
                .post('', {
                    title : this.articleTitle,
                    content : this.articleContent,
                    featuredImage : this.articleFeaturedImage
                })
                .then( ({data}) => {
                    console.log(data)
                    this.$emit('confirm-add')
                })
                .catch(err => {
                    console.log(err)
                    Swal.fire(
                        'Opps ....!',
                        `${err}`,
                        'error'
                    )
                })
        },
        createArticleInstance() {
            return axios.create({
                baseURL: 'http://localhost:3000/articles',
                headers : {
                    token : localStorage.getItem('token')
                }    
            });
        },
        changeFile() {
            this.articleFeaturedImage = this.$refs.myFiles.files[0]
        } 
    }
}
</script>

<style>

</style>