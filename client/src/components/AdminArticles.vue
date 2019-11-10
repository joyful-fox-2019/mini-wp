<template>
  <div>
    <div class="d-flex justify-content-between mb-1">
      <h4>Your Articles</h4>
      <form class="form-inline my-2 my-lg-0" @submit.prevent="searchArticle()">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col" style="width: 5%">Id.</th>
          <th scope="col" >Title</th>
          <th scope="col" style="width: 20%">Tags</th>
          <th scope="col" style="width: 5%">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article._id">
          <th scope="row">{{ article._id }}</th>
          <td>{{ article.title }}</td>
          <td>
            <span v-for="(tag, index) in article.tags" :key="index">
              <span v-if="index !== article.tags.length - 1">{{ tag }}, </span>
              <span v-else>{{ tag }}</span>
            </span>
          </td>
          <td class="d-flex">
            <img src="../../public/edit.png" style="width: 24px; cursor: pointer" class="m-1" @click.prevent="editArticle(article._id)">
            <img src="../../public/trash.png" style="width: 24px; cursor: pointer" class="m-1" @click.prevent="deleteArticle(article._id)">
          </td>
        </tr>
      </tbody>
    </table>
    <nav v-if="!isSearching">
      <ul class="pagination">
        <li class="page-item" :class="{disabled: (page === 1)}" @click.prevent="changePage(page - 1)">
          <span class="page-link">Previous</span>
        </li>
        <li class="page-item" v-for="(pagin, index) in pagination" :key="index" @click.prevent="changePage(pagin)" :class="{active: (pagin === page)}"><a class="page-link" href="#">{{ pagin }}</a>
        <li class="page-item" :class="{disabled: (page === pagination)}" @click.prevent="changePage(page + 1)">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axiosNpm from '../config/axios'
export default {
  data(){
    return {
      search: ''
    }
  },
  computed: {
    pagination(){
      return Math.ceil(this.pageNumber / 10)
    }
  },
  methods: {
    changePage(page){
      if(page < 1){
        Swal.fire(
          'Page error',
          'Already at minimum page',
          'error'
        )
      }
      else if(page > this.pagination){
        Swal.fire(
          'Page error',
          'Already at maximum page',
          'error'
        )
      }
      else{
        this.$emit('changePage', page)
      }
    },
    searchArticle(){
      this.$emit('searchArticle')
    },
    deleteArticle(id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            return axiosNpm({
              url: `/articles/${id}`,
              method: 'delete'
            })
          }
      })
        .then(({ data })=>{
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.$emit('fetchArticle', this.page)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    editArticle(id){
      this.$emit('editArticle', id)
    }
  },
  watch: {
    search(value){
      this.$emit('changeSearch', value)
    }
  },
  props:['articles', 'page', 'pageNumber', 'isSearching']
}
</script>

<style>

</style>