<template>
    <div class="col-md-10 p-3" style="height: 85vh; overflow: scroll; background-color: rgb(226, 226, 226);" >
        <form @submit.prevent="searchMyArticle" id="searchArticles">
          <div class="form-group">
            <div class="input-group">
                <input v-model="search" type="text" class="form-control form-control-lg" id="searchBox" aria-describedby="searchBox" placeholder="Search My Blog's">
                <span class="input-group-text"><img src="https://image.flaticon.com/icons/svg/149/149852.svg" alt="searchIcon" height="20" width="30"></span>
            </div>
          </div>
        </form>
      <h3 class="pb-3 font-italic">
        My Recently Created
      </h3>
      <hr>
      <div v-if="isEmpty">
        <div class="pb-2 my-2">
          <div class="d-flex justify-content-center">
            <h2 class="font-weight-bold">NO BLOG'S HAVE BEEN MADE</h2>
          </div>
          
        </div>
      </div>
      <div>
        <Articles
        v-for="article in myArticle" :key="article._id"
        :articleParent="article"
        >  
        </Articles>
      </div>


    </div>
</template>

<script>
import Articles from '../components/Articles'
import axios from '../../myAxios/axios'
export default {
  props : ['myArticle'],
  components :{
    Articles
  },
  data(){
    return{
      search : '',
      filtered : []
    }
  },
  methods :{
    searchMyArticle(){
      axios.get(`/users/search?filter=${this.search}`,{
        headers :{
          token : localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        data.forEach(element=>{
          this.filtered.unshift(element)
        })
        this.$emit('searchResult',this.filtered)
        this.filtered = []
      })
      .catch(err=>{
        console.log(err.response.data.message)
      })
    }
  },
  computed : {
    isEmpty(){
      if(this.myArticle.length === 0){
        return true
      }else{
        return false
      }
    }
  }
}
</script>

<style>

</style>