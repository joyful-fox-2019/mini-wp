<template>
  <div>
    <div class="container py-3" style="height: 85vh; overflow: scroll;">
        <div 
        class="jumbotron p-4 p-md-5 text-white rounded bg-dark" 
        style="background:linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(../../banner.jpg); background-size: cover;"
        >
          <div class="col-md-6 px-0">
            <h1 class="display-4 font-italic">Welcome to D-Blog</h1>
            <p class="lead my-3">Create and build your blog or article, Write about your life, build a beautiful portfolio of your work — it’s up to you.</p>
            <p class="lead mb-0"><a class="linkText text-white font-weight-bold">Enjoy your visit on D-Blog</a></p>
          </div>
        </div>
        
        <main class="container-fluid">
            <form @submit.prevent="searchAllArticles" id="searchArticles">
              <div class="form-group">
                <div class="input-group">
                    <input v-model="search" type="text" class="form-control form-control-lg" id="searchBox" aria-describedby="searchBox" placeholder="Search Blog's">
                    <span class="input-group-text"><img src="https://image.flaticon.com/icons/svg/149/149852.svg" alt="searchIcon" height="20" width="30"></span>
                </div>
              </div>
            </form>
          <div class="row">
            <div class="col-md-8">
              <h3 class="pb-4 mb-4 font-italic border-bottom">
                Users Blog's
              </h3>

              <nav v-if="notSearch" aria-label="Page navigation example">
                <ul class="pagination">
                  <li v-if="page>1"  @click="fetchBack(); changePage-=1" class="page-item"><a class="page-link" style="cursor:pointer">Previous</a></li>
                  <li  v-for="(num, index) in maxPage" :key="index" 
                  @click="fetchPagination(index+1); changePage=index" 
                  :class="{'page-item':true, active:changePage == index}">
                  <a class="page-link" style="cursor:pointer">{{index + 1}}</a></li>
                  <li v-if="page !== maxPage" @click="fetchNext(); changePage+=1" class="page-item"><a class="page-link" style="cursor:pointer">Next</a></li>
                </ul>
              </nav>

              <div id="usersBlog" v-for="article in articleNow" :key="article._id" class="border-bottom p-3 my-3 rounded" style="background-color: rgb(226, 226, 226);">
                <div class="border-bottom border-secondary mb-4">
                    <h2>{{article.title}}</h2>
                    <p>created at {{article.createdAt}}, by {{article.author}}</p>
                    <p >Tags : <span class="linkText" @click="searchTag(article.tag)">{{article.tag}}</span></p>
                </div>

                <div style="cursor: pointer;" @click="selectArticle(article)">
                  <div class="imgContainer mb-4  d-flex justify-content-center">
                    <img :src="article.featured_image" class="w-75" style="object-fit: contain;" height="300">
                  </div>

                  <div class="px-5 d-flex justify-content-center" style="max-height:200px; overflow:hidden">
                    {{article.content | truncate(300, '...')}}

                  </div>
                </div>
              </div>

              <nav v-if="notSearch" aria-label="Page navigation example">
                <ul class="pagination">
                  <li v-if="page>1"  @click="fetchBack(); changePage-=1" class="page-item"><a class="page-link" style="cursor:pointer">Previous</a></li>
                  <li  v-for="(num, index) in maxPage" :key="index" 
                  @click="fetchPagination(index+1); changePage=index" 
                  :class="{'page-item':true, active:changePage == index}">
                  <a class="page-link" style="cursor:pointer">{{index + 1}}</a></li>
                  <li v-if="page !== maxPage" @click="fetchNext(); changePage+=1" class="page-item"><a class="page-link" style="cursor:pointer">Next</a></li>
                </ul>
              </nav>
                              
            </div>
        
            <aside class="col-md-4">
          
              <div class="p-4">
                <h4 class="font-italic">Tags</h4>
                <ul class="list-unstyled mb-0">
                  <li class="linkText"><a @click="searchTag('Sports')">Sports</a></li>
                  <li class="linkText"><a @click="searchTag('Daily-Lifes')">Daily-Lifes</a></li>
                  <li class="linkText"><a @click="searchTag('Politics')">Politics</a></li>
                  <li class="linkText"><a @click="searchTag('Healths')">Healths</a></li>
                  <li class="linkText"><a @click="searchTag('Travels')">Travels</a></li>
                  <li class="linkText"><a @click="searchTag('Automotives')">Automotives</a></li>
                  <li class="linkText"><a @click="searchTag('Electronics')">Electronics</a></li>
                  <li class="linkText"><a @click="searchTag('Hobbies')">Hobbies</a></li>
                  <li class="linkText"><a @click="searchTag('Foods')">Foods</a></li>
                </ul>
              </div>
          
            </aside>
        
          </div>
      
        </main>
    </div>
            
  </div>
</template>

<script>
import axios from '../../myAxios/axios'
export default {
  data(){
    return{
      allArticles : [],
      articleNow : [],
      search : '',
      tagged : [],
      page : 1,
      maxPage : 1,
      notSearch : true,
      changePage : 0
      
    }
  },
  methods : {
    fetchAllBlog(){
      this.allArticles = []
      axios.get('/articles')
      .then(({data})=>{
        data.forEach((element)=>{
          element.createdAt = this.date(element.createdAt)
          this.allArticles.unshift(element)
        })
        console.log(data.length)
        this.maxPage = Math.floor((data.length-1)/4)
        console.log(this.maxPage)  
      })
      .catch(err=>{
        console.log(err.response.data.message)
      })
    },
    fetchPagination(page){
      console.log('CHANGED', page)
      this.articleNow = []
      this.page = page
      this.inactive = false
      this.activate = true
      axios.get(`/articles/page/${page}`)
      .then(({data})=>{
        data.forEach(element=>{
          element.createdAt = this.date(element.createdAt)
          this.articleNow.push(element)
        })   
      })
      .catch(err=>{
        console.log(err.response.data.message)
      })
    },
    fetchNext(){
      this.articleNow = []
      this.page +=1
      axios.get(`/articles/page/${this.page}`)
      .then(({data})=>{
        data.forEach(element=>{
          element.createdAt = this.date(element.createdAt)
          this.articleNow.push(element)
        })    
      })
      .catch(err=>{
        console.log(err.response.data.message)
      })
    },
    fetchBack(){
      this.articleNow = []
      this.page -=1
      axios.get(`/articles/page/${this.page}`)
      .then(({data})=>{
        data.forEach(element=>{
          element.createdAt = this.date(element.createdAt)
          this.articleNow.push(element)
        })  
      })
    },
    date(date){
      Date.prototype.toISODate = function() {
        return this.getFullYear() + '-' +
               ('0'+ (this.getMonth()+1)).slice(-2) + '-' +
               ('0'+ this.getDate()).slice(-2);
        }
        return new Date(date).toISODate();
    },
    selectArticle(payload){
      this.$emit('selectedArticleData', payload)
      this.$emit('switchContent', 'selected')
    },
    searchAllArticles(){
      if(this.search === ''){
        this.page = 1
        this.fetchPagination(this.page)
        this.notSearch = true
      }else{
        axios.get(`/articles/search?filter=${this.search}`,{
          headers :{
            token : localStorage.getItem('token')
          }
        })
        .then(({data})=>{
          console.log(this.search)
          this.notSearch = false
          this.articleNow= []
          data.forEach(element=>{
            element.createdAt = this.date(element.createdAt)
            this.articleNow.unshift(element)
          })
        })
        .catch(err=>{
          console.log(err.response.data.message)
        })
      }



    },
    searchTag(tag){
      this.allArticles.forEach(element=>{
        if(element.tag === tag){
          this.tagged.push(element)
        }
      })
      this.$emit('taggedData', {tag, data:this.tagged})
      this.$emit('switchContent', 'tag')
    },
    
  },
  computed :{

  },
  
  created(){
    this.fetchAllBlog()
    this.fetchPagination(this.page)
  }
}
</script>

<style scoped>
  .linkText{
     cursor:pointer;
     color:blue;
     text-decoration:underline;
  }
</style>