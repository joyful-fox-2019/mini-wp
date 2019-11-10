<template>
    <div>
        <loginRegister v-if="!loginStatus" @login-ok='loginOk' ></loginRegister>
        <navbarItem class="mb-3" @add_article='addArticle' v-if="loginStatus" @log-out='logout'></navbarItem>
        <!-- format pengiriman data :nama="isi" -->
        <homePage v-if="!isEdit && !isAddArticle && loginStatus" :getArticle='getArticles' :is-edit="isEdit" :articleItems="articles" :articleInstance='createArticleInstance' @articleData='editArticle'></homePage>
        <div class="container-fluid" v-if="isEdit">
            <div class="row">
                <div class="col-md-2 pl-0">
                    <sideBar></sideBar>
                </div>
                <div class="col-md-10">                    
                    <div class="form">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-sm-4">
                                    <img class="img-thumbnail" src="../img/1.jpeg" alt="">
                                </div>
                                <div class="col-sm-8">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Title</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="articleEdit.title">
                                    </div> 
                                    <p class="pb-0">Change picture</p>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="validatedCustomFile" required>
                                        <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
                                    </div>        
                                </div>
                            </div>
                        </div>
                        <h4 class="text-center my-3">Content</h4>
                        <quillEditor v-if="isEdit" v-model="articleEdit.content" ref="myQuillEditor"></quillEditor>
                        <div class="d-flex justify-content-between mt-2">
                            <button class="btn btn-success" @click.prevent="saveEdit()" href=""><i class="fa fa-floppy-o pr-1"></i>Save</button>
                            <button class="btn btn-danger" @click.prevent="cencelEdit()" href=""><i class="fa fa-times-circle-o pr-1"></i>Cencel</button> 
                        </div>  
                    </div>
                    <!-- form close -->
                </div>  
            </div>            
        </div>  
        <addArticle v-if="isAddArticle" @confirm-add='comfirmAdd' @cancel-Add='cancelAdd'></addArticle>            
    </div>  
</template>

<script>
import navbarItem from './components/navbarItem'
import homePage from './components/homePage'
import editPage from './components/editPage'
import sideBar from './components/sideBar'
import quill from 'quill'
// Basic Use - Covers most scenarios
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor, Quill } from 'vue-quill-editor'
import addArticle from './views/addArticle'
import loginRegister from './views/loginRegiste'

export default {
    components : {
        navbarItem,
        homePage,
        quillEditor,
        sideBar,
        addArticle, 
        loginRegister       
    },
    data() {
        return {
            articles : [],
            article : {},
            articleEdit : '<h1>Some initial content</h1>',
            isEdit : false,
            isAddArticle : false,
            userDetail : {},
            loginStatus : false,
        }
    },
    methods : {
        loginOk() {
            this.loginStatus = true
        },
        cancelAdd() {
            console.log('masuk cencel parent')
            this.isAddArticle = false
            this.getArticles()
        },
        comfirmAdd() {
            Swal.fire(
                    'Add Article Success!',
                    `congrats article has been created`,
                    'success'
            )
            console.log('confirmAdd')
            this.isAddArticle = false
            this.getArticles()
        },
        addArticle() {
            console.log('addArticle parent')
            this.isAddArticle = true
        },
        editArticle(data) {
            this.isEdit = true
            this.articleEdit = data
        },
        cencelEdit() {
            this.isEdit = false;
            this.getArticles()
        },
        saveEdit() {
            const article = this.createArticleInstance()
            this.findOneArticle(this.articleEdit._id)
            let quill = this.editor            
            article.put(`/${this.articleEdit._id}`, 
                {
                    title : this.articleEdit.title,
                    content : this.articleEdit.content,
                    createdAt : this.articleEdit.cratedAt,
                    user : this.articleEdit.user,
                    featured_image : this.articleEdit.featured_image, 
                    updatedAt : new Date
                } 
            )
            .then(({data}) => {
                Swal.fire(
                        'Update Success!',
                        `congrats data has been updated`,
                        'success'
                )
                this.isEdit = false
                this.articleEdit = {}
                this.getArticles()
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
        getArticles(){    
            console.log('masuk get article')   
            const article = this.createArticleInstance()     
            article
                .get('',{
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then (({data}) => {
                    console.log('masuk get article')
                    this.articles = data
                })
                .catch(err => {
                    // console.log(err)
                    Swal.fire(
                        'Opps ....!',
                        `${err}`,
                        'error'
                    )
                })
        },
        findOneArticle(id) {
            const article = this.createArticleInstance()
            article.
                get(`/${id}`)
                .then( ({data}) => {
                    console.log('masuk findOneArticle')
                    this.article = data
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
        isLogin() {
            let token = localStorage.getItem('token')
            if (token) {
                this.loginStatus = true
                this.getArticles()
            } else {
                this.loginStatus = false
            } 
        },
        toLogin() {
            this.register = false
            this.loginForm = true
        },
        login(){
            user.
                post('/login', 
                    {
                        email : this.email,
                        password : this.password
                    })
                .then( ({data}) => {      
                    this.getArticles()       
                    localStorage.setItem('token', data.token)
                    Swal.fire(
                        'Loggin Success!',
                        'You are now loggin in our web!',
                        'success'
                    )
                    this.loginStatus = true                    
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
        logout() {
            console.log('masuk ke parent')
            localStorage.removeItem('token')
            this.isLogin()
        } 
    },    
    created() {
        this.isLogin()   
    },
    computed : {      
        editor() {
            return this.$refs.myQuillEditor.quill;
        }  
    },
    mounted() {
        $('#app').show()
        $('#loading').empty()
    },
    
}
</script>

<style>

</style>