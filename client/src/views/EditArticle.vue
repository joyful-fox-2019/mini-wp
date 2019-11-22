<template>
  <div  class="main-content flex-column items-center" style="height: 90vh; overflow: auto;">
    <div class="my-10 mx-20 shadow p-4">
      <div class=" mx-4 my-2 mt-4 h-10" style="border:none; border-bottom: 1-x solid gray;">
        <h1 class="text-center">{{article.title}}</h1>
      </div>
      <form class="flex-column items-center">
        <div class="flex justify-center my-4" >
          <input type="text" v-model="article.title" placeholder="title" style="border:none; border-bottom: 1px gray solid;" class="p-2">
        </div>
        <quill-editor v-model="article.content" ref="myQuillEditor">
        </quill-editor>
      </form>
      <form @submit.prevent="addTag">
        <h3>Add Tags</h3>
        <input type="text" v-model="article.tag" placeholder="tag" class="p-2 border border-gray-700 my-4">
        <input type="submit" value="add" class="p-2 rounded mx-2">
      </form>
      <div class="flex flex-wrap">
        <div v-for="(tag, index) in article.tags" :key="index"><span class="p-1 bg-blue-200 mx-1">{{tag}} <i class="fas fa-times" @click="deleteTag(tag)"></i></span></div>
      </div>
      <div class="p-2 rounded my-2">
        <h3>Add an image to your article?</h3>
        <br>
        <input type="file" id="files" @change="selectImage" >
        <div>
        </div>
      </div>
      <button type="button" @click="updateArticle('draft')" class="p-2 my-4 bg-blue-500 hover:bg-blue-600 text-white">Save to Drafts</button>
      <button type="button" @click="updateArticle('published')" class="p-2 my-4 bg-green-500 hover:bg-green-600 text-white">Publish</button>
      <br>
      <h4 class="cursor-pointer text-red-700" @click="deleteArticle">Delete this article?</h4>
    </div>
  </div>
</template>

<script>
import quill from 'vue-quill-editor'
import axios from '../config/axios'
export default {
  name: 'EditArticle',
  data() {
    return {
      article: {
        content: '',
        title: '',
        tags: [],
        tag: '',
        image: null
      }
    }
  },
  methods: {
    selectImage (event) {
      this.article.image = event.target.files[0]
    },
    addTag() {
      if(!this.article.tags.includes(this.article.tag)) {
        this.article.tags.push(this.article.tag)
      } 
      this.article.tag = ''
    },
    deleteTag(tag) {
      let result = this.article.tags.filter(el => {
        return el !== tag
      })
      this.article.tags = result
    },
    deleteArticle () {
      const { slug } = this.$route.params
      this.$dialog.confirm('Are you sure?')
      .then(dialog => {
        axios({
          method: 'DELETE',
          url: `/articles/${slug}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.$noty.success(data.message)
          this.$router.push('/articles')
        })
        .catch(({ response }) => {
          this.$noty.error(response.data.message)
        })
        dialog.close()
      })
      .catch(dialog=> {
        dialog.close()
      })
    },
    updateArticle (status) {
      let fd = new FormData()
      const {content, title, tags, image} = this.article

      if(image) fd.append('image', image)
      fd.append('title', title)
      fd.append('content', content)
      tags.forEach(tag => {
        fd.append('tags', tag)
      })
      fd.append('status', status)
      this.$dialog.confirm('Are you sure?')
      .then(dialog => {
        axios({
          method: 'PATCH',
          url: `/articles/${this.$route.params.slug}`,
          headers: {
            token: localStorage.getItem('token')
          },
          data : fd
        })
        .then(({ data }) => {
          this.$noty.success(data.message)
          this.$router.push('/articles/' + this.$route.params.slug)
        })
        .catch(({ response })=>{
          this.$noty.error(response.data.message)
        })
        dialog.close()
      })
      .catch(dialog=> {
        dialog.close()
      })

    }
  },
  created() {
    axios({
      method: 'GET',
      url: `/articles/${this.$route.params.slug}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({ data }) => {
      this.article = data
    })
    .catch(({ response }) => {
      this.$noty.error(response.data.message)
      this.$router.push('/articles')
    })
  },
}
</script>

<style>
  .ql-editor {
    min-height: 200px;
  }
</style>