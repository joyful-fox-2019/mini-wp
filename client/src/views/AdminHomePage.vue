<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-sm-3 m-2">
        <ul class="list-group">
          <li class="list-group-item active link-list-active" v-if="toPage === 'articles'" @click.prevent="fetchArticle(page)" style="cursor: pointer">My Articles</li>
          <li class="list-group-item" v-else @click.prevent="toPageName('articles')" style="cursor: pointer">My articles</li>
          <li class="list-group-item active" v-if="toPage === 'add'">Add article</li>
          <li class="list-group-item" v-else style="cursor:pointer" @click.prevent="toPageName('add')">Add article</li>
          <li class="list-group-item active" v-if="toPage === 'edit'">Edit article</li>
          <li class="list-group-item" v-else style="cursor:pointer" @click.prevent="toPageName('edit')">Edit article</li>
        </ul>
      </div>
      <div class="col-sm m-2"  style="min-height:83vh">
        <AdminArticles 
          v-if="toPage === 'articles'" 
          :articles="articles" 
          :page="page" 
          :pageNumber="pageNumber" 
          :isSearching="isSearching"
          @changePage="changePage"
          @changeSearch="changeSearch"
          @searchArticle="searchArticle"
          @fetchArticle="fetchArticle"
          @editArticle="editArticle">
        </AdminArticles>
        <div v-if="toPage === 'add'">
          <form @submit.prevent="addNewArticle()">
            <div>
              <h4>Tags</h4>
              <div>
                <vue-tags-input
                  v-model="tag"
                  :tags="tags"
                  :autocomplete-items="filteredItems"
                  :add-only-from-autocomplete="true"
                  @tags-changed="newTags => tags = newTags"
                />
              </div>
            </div>
            <div class="form-group mt-2">
              <h4>Title</h4>
              <input type="text" class="form-control" v-model="title">
            </div>

            <div>
              <h4>Insert Picture</h4>
              <b-form-file
                v-model="file"
                :state="Boolean(file)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
              <div class="mt-1">Selected file: {{ file ? file.name : '' }}</div>
            </div>

            <div class="form-group mt-2">
              <h4>Description</h4>
              <quill v-model="description" output="html"></quill>
            </div>
            <button type="submit" class="btn btn-primary">Add Article</button>
          </form>
        </div>

        <div v-if="toPage === 'edit'">
          <form @submit.prevent="submitEditArticle()">
            <div class="mb-3">
              Id: {{ edit.id }}
            </div>
            <div>
              <h4>Tags</h4>
              <div>
                <vue-tags-input
                  v-model="edit.tag"
                  :tags="edit.tags"
                  :autocomplete-items="filteredItems"
                  :add-only-from-autocomplete="true"
                  @tags-changed="newTags => tags = newTags"
                />
              </div>
            </div>

            <div class="form-group mt-2">
              <h4>Title</h4>
              <input type="text" class="form-control" v-model="edit.title">
            </div>

            <div class="form-group mt-2">
              <h4>Description</h4>
              <quill v-model="edit.description" output="html"></quill>
            </div>
            <button type="submit" class="btn btn-primary">Edit Article</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosNpm from '../config/axios'
import AdminArticles from '../components/AdminArticles.vue'
import VueTagsInput from '@johmun/vue-tags-input';
import Swal from 'sweetalert2'

export default {
  data(){
    return{
      page: 1,
      articles: [],
      toPage: 'articles',
      description: '',
      title: '',
      file: null,
      tag: '',
      tags: [],
      edit: {
        id: null,
        description: '',
        title: '',
        tag: '',
        tags: [],
      },
      autocompleteItems: [{
        text: 'business',
      }, {
        text: 'military',
      }, {
        text: 'health',
      }, {
        text: 'politics',
      }, {
        text: 'document',
      }, {
        text: 'technology',
      }, ],
      pageNumber: 0,
      search: '',
      isSearching: false
    }
  },
  methods: {
    fetchArticle(page){
      this.isSearching = false
      axiosNpm({
        url: `/articles/my/${page}?page=10`,
        method: 'get'
      })
        .then(({ data })=>{
          this.articles = data
          this.countPage()
        })
        .catch(err=>{
          console.log(err);
        })
    },
    toPageName(name){
      this.isSearching = false
      this.toPage = name
    },
    countPage(){
      axiosNpm({
        url: `/articles/my/${1}?page=100000`,
        method: 'get'
      })
        .then(({ data })=>{
          this.pageNumber = data.length
          console.log(this.pageNumber);
          
        })
        .catch(err=>{
          console.log(err);
        })
    },
    addNewArticle(){
      if(!this.description || !this.title || !this.file || this.tags.length == 0){
        Swal.fire(
          'Empty input detected',
          'Please insert all necessary inputs',
          'error'
        )
      }
      else{
        Swal.fire({
          title: 'Uploading',
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading()}
        })
        const tags = []
        this.tags.forEach(tag=>[
          tags.push(tag.text)
        ])
        const bodyFormData = new FormData();
        const title = this.title
        const description = this.description
        bodyFormData.append('file', this.file)
        bodyFormData.append('title', title)
        bodyFormData.append('description', description)
        bodyFormData.append('tags', tags)
        axiosNpm({
          url: '/articles',
          data: bodyFormData,
          method: 'post'
        })
          .then(({ data })=>{
            Swal.close()
            Swal.fire(
              'Success Adding',
              'Success upload your article',
              'success'
            )
            this.toPage = 'articles'
            this.page = 1
            this.fetchArticle(this.page)
          })
          .catch(err=>{
            Swal.close()
            Swal.fire(
              'Error uploading',
              'Something was wrong',
              "error"
            )
            console.log(err)
          })
      }
    },
    changePage(page){
      this.page = page
      this.fetchArticle(page)
    },
    changeSearch(search){
      this.search = search
    },
    searchArticle(){
      this.isSearching = true
      const search = this.search
      axiosNpm({
        url: '/articles/search',
        method: 'post',
        data: {
          search
        }
      })
        .then(({ data })=>{
          console.log(1234);
          
          this.articles = data
        })
        .catch(err=>{
          console.log(err)
        })
    },
    editArticle(id){
      axiosNpm({
        url: `articles/${id}`,
        method: 'get'
      })
        .then(({ data })=>{
          this.edit.title = data.title
          this.edit.description = data.description
          this.edit.id = data._id
          const tags = []
          data.tags.forEach(tag=>{
            // [ { "text": "technology", "tiClasses": [ "ti-valid" ] }, { "text": "military", "tiClasses": [ "ti-valid" ] } ]
            tags.push({"text": tag, "tiClasses": ["ti-valid"]})
          })
          this.edit.tags = tags
          this.toPage = 'edit'
        })
        .catch(err=>{
          console.log(err)
        })
    },
    submitEditArticle(){
      const tags = []
      this.edit.tags.forEach(tag=>[
        tags.push(tag.text)
      ])
      const title = this.edit.title
      const description = this.edit.description
      const id = this.edit.id
      axiosNpm({
        url: `/articles/${id}`,
        method: 'put',
        data: {
          title,
          description,
          tags
        }
      })
        .then(({ data })=>{
          this.fetchArticle()
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },
  components:{
    AdminArticles,
    VueTagsInput
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    }
  },
  created(){
    if(this.$route.query.page === 'add'){
      this.toPage = 'add'
    }
    this.fetchArticle(this.page)
  }
}
</script>

<style>
.link-list-active{
  color: white
}
</style>