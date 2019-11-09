<template>
  <div  class="main-content flex-column items-center" style="height: 90vh; overflow: auto;">
    <div class="my-10 mx-20 shadow p-4">
      <form class="flex-column items-center">
        <div class="flex flex-wrap justify-center my-4" >
          <h2 style="display: block; width: 100%; text-align: center;">Title</h2>
          <input type="text" v-model="article.title" placeholder="title" style="border:none; border-bottom: 1px gray solid;" class="p-2">
        </div>
        <quill-editor v-model="article.content" ref="myQuillEditor">
        </quill-editor>
      </form>
      <form @submit.prevent="addTag" class="my-4">
        <h3>Add Tags</h3>
        <input type="text" v-model="article.tag" placeholder="tag" class="p-2 my-2" style="border:none; border-bottom: 1px gray solid;">
        <input type="submit" value="add" class="py-2 px-4 rounded mx-2">
      </form>
      <div class="flex flex-wrap p-2">
        <div v-for="(tag, index) in article.tags" :key="index"><span class="p-1 bg-blue-200 mx-1">{{tag}} <i class="fas fa-times" @click="deleteTag(tag)"></i></span></div>
      </div>
      <div class="p-2 rounded my-2">
        <h3>Add an image to your article?</h3>
        <br>
        <input type="file" id="files" @change="selectImage" >
        <div>
        </div>
      </div>
      <button type="button" @click="createArticle('draft')" class="py-2 px-4 my-4 bg-blue-500 hover:bg-blue-600 text-white">Save to Drafts</button>
      <button type="button" @click="createArticle('published')" class="py-2 px-4 my-4 bg-green-500 hover:bg-green-600 text-white">Publish</button>
      <br>
      <h4 class="cursor-pointer text-red-700" @click="closeEditor">Exit instead?</h4>
    </div>
  </div>
</template>

<script>
import quill from 'vue-quill-editor'
import axios from '../config/axios'
export default {
  name: 'NewArticle',
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
    publishArticle () {
      this.createArticle('published')
    },
    closeEditor () {
      this.emptyEditor()
      this.$router.push('/articles')
    },
    emptyEditor () {
      this.article = {
        content: '',
        title: '',
        tags: [],
        tag: '',
        image: null
      }
    },
    saveDraft () {
      this.createArticle('draft')
    },
    selectImage (event) {
      this.article.image = event.target.files[0]
    },
    addTag() {
      if(!this.article.tags.includes(this.article.tag) && this.article.tag.length>0) {
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
    createArticle (status) {
      const fd = new FormData()
      const {content, title, tags, image} = this.article

      if(image) fd.append('image', image)
      fd.append('title', title)
      fd.append('content', content)
      tags.forEach(tag => {
        fd.append('tags', tag)
      })
      fd.append('status', status)

      axios({
        method: 'POST',
        url: `/articles`,
        headers: {
          token: localStorage.getItem('token')
        },
        data : fd
      })
      .then(({ data }) => {
        console.log(data.article);
        console.log(data.message);
        this.emptyEditor()
        this.$router.push('/articles')
      })
      .catch(({ response })=>{
        console.log(response.data);
      })
    }
  },
  created() {
  }
}
</script>

<style>
  .ql-editor {
    min-height: 200px;
  }
</style>