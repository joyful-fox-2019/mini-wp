<template>
        <!-- navbar side -->
        <div class="row mt-5" style="padding-top:10px;">
              <div class="col-2 bg-light">
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <a class="px-5 py-3 text-dark" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true"><i class="fa fa-tv"></i> View Site</a>
                  <a class="px-5 py-3 text-dark"  id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i class="fa fa-line-chart"></i> Stats</a>
                  <a class="px-5 py-3 text-dark" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false"><i class="fa fa-history"></i> Activity</a>
                  <a class="px-5 py-3 text-dark" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i class="fa fa-map-pin"></i> Plan</a>
                  <a class="px-5 py-3 text-dark" id="v-pills-home-tab" data-toggle="pill" href="#articles" role="tab" aria-controls="v-pills-home" aria-selected="true"><i class="fa fa-file-text"></i> Site Pages</a>
                  <a class="px-5 py-3 text-dark" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i class="fa fa-align-justify"></i> Blog Post</a>
                  <a class="px-5 py-3 text-dark" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false"><i class="fa fa-file-image-o"></i> Media</a>
                  <a class="px-5 py-3 text-dark" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i class="fa fa-comments-o"></i> Comments</a>
                  <a class="px-5 py-3 text-dark" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true"><i class="fa fa-external-link"></i> Feedback</a>
                  <a class="px-5 py-3 text-dark" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i class="fa fa-plug"></i> Plugins</a>
                  <a class="px-5 py-3 text-dark" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false"><i class="fa fa-cloud-download"></i> Import</a>
                  <a class="px-5 py-3 text-dark" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i class="fa fa-cog"></i> Customize</a>
                </div>
              </div>
              <div class="col-10">
                <div class="tab-content" id="v-pills-tabContent">
                  <div class="tab-pane fade show active" id="articles" role="tabpanel" aria-labelledby="v-pills-home-tab"> 
                    <div class="container py-4 px-1" id="articles-collection">
                      <ul class="nav bg-light" style="display: flex; justify-content: space-between;">
                            <li class="nav-item">
                              <a class="nav-link text-dark active" href="#">Published</a>
                            </li>
                            <li>
                              <form class="form-inline">
                                <input v-model="search" class="form-control mr-sm-2" type="search" placeholder="Search By Title" aria-label="Search">
                                <button v-on:click="fecthArticles()" class="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
                              </form>
                            </li> 
                        </ul>
                    </div>
                    <h4> Your Articles</h4>
                    <div class="card mt-3" style="width: 100%;" v-for="(article, index) in articles" :key="index">
                        <div class="row card-body">
                            <div class="col-sm-9 col-lg-8">
                                <h5 class="card-title"><b>{{ article.title }}</b></h5>
                                <p class="card-text"><i><b>posted by: {{ article.author }}<b></i> | {{ formatDate(article.updatedAt)}}</p>                               
                                <p class="card-text" style="font-size: 12px;" v-html="article.content"></p>
                                <button v-on:click.prevent="edit(article._id)">Edit</button>
                                <button v-on:click.prevent="hapus(article._id)">Delete</button>
                            </div>
                            <div class="col-sm-3 col-lg-4">
                                <img :src="article.image" class="card-img-right" alt="..." style="width:350px">

                            </div>
                        </div>
                        <br>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                    <div class="container py-4 px-1" id="articles-collection">
                      <ul class="nav bg-light" style="display: flex; justify-content: space-between;">
                            <li class="nav-item">
                              <a class="nav-link text-dark active" href="#">Published</a>
                            </li>
                            <li>
                              <form class="form-inline">
                                <input v-model="search" class="form-control mr-sm-2" type="search" placeholder="Search By Title" aria-label="Search">
                                <button v-on:click="fecthAllArticles()" class="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
                              </form>
                            </li> 
                        </ul>
                    </div>
                    <h4> All Articles</h4>
                    <div class="card mt-3" style="width: 100%;" v-for="(article, index) in allArticles" :key="index">
                        <div class="row card-body">
                            <div class="col-sm-9 col-lg-8">
                                <h5 class="card-title"><b>{{ article.title }}</b></h5>
                                <p class="card-text"><i><b>posted by: {{ article.author }}<b></i> | {{ formatDate(article.updatedAt)}}</p>
                                
                                <p class="card-text" style="font-size: 12px;" v-html="article.content"></p>
                            </div>
                            <div class="col-sm-3 col-lg-4">
                                <img :src="article.image" class="card-img-right" alt="..." style="width:350px">
                            </div>
                        </div>
                        <br>
                    </div>
   
                  </div>
                  <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab"> masuk 3</div>
                  <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab"> masuk 4</div>
                </div>
              </div>
      </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
    name : 'sidebar',
    data() {
        return {
            search : '',
            articles : '',
            oldTitle : '',
            oldContent : '',
            allArticles : ''
        }
    },
    methods : {
        fecthArticles() {  
            axios({
                method: 'get',
                url: `http://localhost:3000/wp/articlesUser`,
                headers:{
                    token: localStorage.getItem('token')
                },
            })
                .then((result) => {
                    console.log(result.data)
                    let filteredResult = []
                    for (let i=0; i<result.data.length; i++) {
                        if (result.data[i].title.includes(this.search)) {
                            filteredResult.push(result.data[i])
                        }
                    }
                    this.articles = filteredResult
                }).catch((err) => {
                    this.$swal('error',err.response.data.error[0],'error')
                    console.log(err)
                });
        },
        fecthAllArticles() {  
            axios({
                method: 'get',
                url: `http://localhost:3000/wp/articles`,
                headers:{
                    token: localStorage.getItem('token')
                },
            })
                .then((result) => {
                    console.log(result.data)
                    let filteredResult = []
                    for (let i=0; i<result.data.length; i++) {
                        if (result.data[i].title.includes(this.search)) {
                            filteredResult.push(result.data[i])
                        }
                    }
                    this.allArticles = filteredResult
                }).catch((err) => {
                    this.$swal('error',err.response.data.error[0],'error')
                    console.log(err)
                });
        },
        edit(id) {
            this.$emit('showedit', id)
            this.fecthArticles()
        },
        hapus(id) {
            console.log(id)
            axios({
                method: 'delete',
                url: `http://localhost:3000/wp/articles/${id}`,
                headers : {
                    token: localStorage.getItem('token')                    
                }
            })
            .then(result => {
                this.fecthArticles()
                console.log(result)
            }).catch(err => {
                this.$swal('error',err.response.data.error[0],'error')
                console.log(err)
            })
        },
        formatDate(date) {
            return moment(date).fromNow()
        }
    },
    created() {
        this.fecthArticles()
        this.fecthAllArticles()
    },
    watch : {
        search() {
            this.fecthArticles()
            this.fecthAllArticles()
        },
        articles() {}
    }
}
</script>

<style>

</style>