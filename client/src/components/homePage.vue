<template>
  <div>
      <!-- v-if='loginStatus' -->
      <section id="home-page" >            
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-2 pl-0">                                       
                        <sideBar> </sideBar>
                    </div>
                    <div  class="col-md-10">
                        <!-- ini filter-->
                        <form class="form-inline md-form form-sm" v-on:submit.prevent='searchArticle'>
                                <i class="fa fa-search" aria-hidden="true"></i>
                                <input class="form-control ml-3" style="width:90%" type="text" placeholder="Search"
                                    aria-label="Search" v-model='search'> 
                                    <!-- ini v-model yang menghubungkan -->
                        </form>
                        <div class="contener d-flex" >
                            <div class="row">      
                                <!-- ini looping untuk articles -->
                                <div class="col-sm-10 offset-1 pt-4" v-for="article in fiteredArticle" v-bind:key="article._id">                                
                                    <div class="card " >
                                        <div class="row row no-gutters">
                                            <div class="col-sm-4">                                        
                                                <img src="./img/1.jpeg" style="width:100%; height:100%;" class="card-img-top p-2" alt="ini gambar article" >
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="card-body">
                                                    <div class="col d-flex flex-column justify-content-between">
                                                        <div class="row-sm-1">
                                                            <h5 class="card-title">{{article.title}}</h5>
                                                        </div>
                                                        <div class="row-sm-10">
                                                            <p  class="card-text text-justify"><span v-html="article.content"></p>
                                                        </div>
                                                        <!-- ini card footer -->
                                                        <div class="row-sm-1">
                                                            <div class="d-flex justify-content-between" >
                                                                <!--  data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" href="" -->
                                                                <a @click.prevent="showUpdate(article._id)" href=""><i class="fa fa-pencil pr-1"></i>Edit</a>
                                                                <a @click.prevent="deleteArticle(article._id)" href=""><i class="fa fa-bitbucket pr-1"></i>Delete</a> 
                                                            </div>
                                                        </div>
                                                        <!-- ini closing footer -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>    
                                    </div> 
                                    <!-- ini closing card  -->
                                </div>
                            </div>
                        </div>       
                    </div>
                </div>
            </div>               
        </section>

        <!-- ini bagian moodal -->
        <div  class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header" >
                        <h5 class="modal-title" id="exampleModalLabel">Edit Article Form</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" >
                        <form>
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">Title:</label>
                                <input type="text" class="form-control" id="recipient-name" v-model="title_edit">
                            </div>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Content</label>
                                <textarea class="form-control" id="message-text" v-model='content_edit'></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Send message</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- ini end modal -->
  </div>
</template>

<script>
import sideBar from './sideBar'

export default {
    components : {
        sideBar
    },
    data() {
        return {
            search : '',
            title_edit : '',
            content_edit : '',
            articles : []
        }
    },
    created() {
        this.getArticles()
    },
    props : ['articleItems', 'articleInstance', "is-edit", "getArticle"],
    computed : {
        // computed bekerja seperti getter
        fiteredArticle() { 
            console.log(this.articles)           
            return this.articles.filter((article) => {
                return article.title.toLowerCase().includes(this.search)
            }) 
        }
    },
    methods : {
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
                    Swal.fire(
                    'Opps ....!',
                    `${err}`,
                    'error'
                    )
                })
        },
        updateArticle(id) {
            const article = this.articleInstance()
            console.log(article)
            article.
                get(`/${id}`)
                .then(article => {
                    this.article = article
                    console.log(article)
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
        showUpdate(articleId) {
            const article = this.articleInstance()            
            article.
                get(`/${articleId}`, {
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then( ({data}) => {
                    this.title_edit = data.title
                    this.content_edit = data.content
                    // format nama penerima , data yang dikirim
                    this.$emit('articleData',data)
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
        deleteArticle(id) {
            console.log('masuk delete article')
            
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then(confirm => {
                    if (confirm.value) {
                        const article = this.articleInstance()
                        return article
                                .delete(`/${id}`)
                                .then(({data}) => {
                                    this.getArticles()
                                    Swal.fire(
                                        'Delete Article Success!',
                                        `congrats article has been deleted`,
                                        'success'
                                    )
                                    console.log('data deleted', data)                    
                                })
                                .catch(err => {
                                    Swal.fire(
                                        'Opps ....!',
                                        `${err}`,
                                        'error'
                                        )
                                    console.log(err)
                                })
                    }                  
                })            
        },
        createArticleInstance() {
            return axios.create({
                baseURL: 'http://35.240.160.184/articles',
                headers : {
                    token : localStorage.getItem('token')
                }    
            });
        }         
    }
}
</script>

<style>
.list-group-item {
    border-top: none !important;
    border-bottom : none !important;
}

.card-body {
    display: flex !important;
    height: 100% !important;
    flex-direction: column !important;
    justify-content : space-between !important
}

</style>