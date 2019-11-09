<template>
    <div class="container-fluid" style="height: 85vh; overflow: scroll;">
        <div class="row">
          <!-- SIDE NAV -->
          <div class="col-md-2 px-0 border-right" style="height: 85vh; overflow: scroll;">
            <div class="d-flex justify-content-center p-2 border-bottom border-dark">
                <h6 class="m-0">
                  <strong>My Blogs <span><img src="https://image.flaticon.com/icons/svg/1508/1508794.svg" alt="logoArt" width="20"> </span></strong>
                </h6>
            </div>
              <ul class="list-group mb-3 text-center">
                <li v-for="article in myArticle" :key="article._id" class="list-group-item rounded-0 d-flex justify-content-center">
                  <div>
                    <a @click="toSelected(article._id)" style="text-decoration: none; color: black; cursor:pointer;" class="my-0 stretched-link">{{article.title}}</a>
                    
                  </div>
                  
                </li>
              </ul>
          </div>
          <!-- Article Here -->
          <UserDash 
          v-if="subContent==='dashBoard'"
          :myArticle="myArticle"
          @searchResult="searchResult"
          ></UserDash>

          <!-- Create Article Here -->
          <UserWrite 
          v-if="subContent==='writePage'"
          @reFetch="fetchOwnArticles"
          ></UserWrite>

          <UserEdit
          v-if="subContent==='editPage'"
          :editData="editData"
          @reFetch="fetchOwnArticles"
          >
          </UserEdit>

        </div>
      

    </div>
</template>

<script>
import UserDash from './UserDash'
import UserWrite from './UserWrite'
import UserEdit from './UserEdit'
import axios from'../../myAxios/axios'
export default {
  props : ['subContent', 'editData'],
  data(){
    return{
      myArticle : []
    }
  },
  components:{
    UserDash,
    UserWrite,
    UserEdit
  },
  methods : {
    fetchOwnArticles(){
      this.myArticle = []
      axios.get('/users',{
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .then(({data})=>{
          data.articlesId.forEach(element=>{
            this.myArticle.unshift(element) 
          })

        })
        .catch(err=>{
          console.log(err.response.data.message)
        })
      },
      toSelected(id){
        axios.get(`/articles/${id}`)
        .then(({data})=>{
          this.$emit('selectedArticleData', data)
          this.$emit('switchContent', 'selected')
        })
        .catch(err=>{
          console.log(err.response.data.message)
        })
      },
      searchResult(filtered){
        this.myArticle = []
        filtered.forEach(element=>{
          this.myArticle.unshift(element)
        })
      }
    },
  created(){
    this.fetchOwnArticles()
  }
}
</script>

<style>

</style>