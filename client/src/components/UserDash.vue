<template>
    <div class="col-sm-12 col-md-10 col-md-push-10  p-3" style="height: 85vh; overflow: scroll; background-color: rgb(226, 226, 226);" >
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
        <div class="my-3 d-flex justify-content-end">
          <button @click="editBlog(article)" class="btn btn-warning mx-2">Edit Blog</button>
          <button @click="deleteBlog(article._id)" class="btn btn-danger mx-2">Delete Blog</button>
        </div>
        </Articles>
      </div>


    </div>
</template>

<script>
import Articles from '../components/Articles'
import axios from '../../myAxios/axios'
import Swal from 'sweetalert2'
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
    },
    editBlog(payload){
      this.$emit('switchSubContent', 'editPage')
      this.$emit('switchContent', 'user')
      console.log('editblog', payload)
      this.$emit('editBlog',payload)
    },
    deleteBlog(id){
      Swal.fire({
        title: 'Are you sure want to Delete this Blog?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete it'
      }).then((result) => {
        if (result.value) {
          axios.delete(`articles/${id}`,{
            headers : {
              token : localStorage.getItem('token')
            }
          })
          .then(({data})=>{
            Swal.fire(
            `Succesfully deleted ${data.data.title}`
            )
          this.$emit('reFetch')
          })
          .catch(err=>{
            console.log(err)
          })

        }
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