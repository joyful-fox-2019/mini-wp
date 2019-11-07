<template>
  <div  class="main-content flex-column items-center" style="height: 90vh;">
    <div class="m-4">
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
        <input type="text" v-model="article.tag" placeholder="tag" class="p-2 border border-gray-700 my-4">
        <input type="submit" value="add" class="p-2 rounded mx-2">
      </form>
      <div class="flex flex-wrap">
        <div v-for="(tag, index) in article.tags" :key="index"><span class="p-1 bg-blue-200 mx-1">{{tag}} <i class="fas fa-times" @click="deleteTag(tag)"></i></span></div>
      </div>
      <button type="button" @click="createArticle" class="p-2 my-4 bg-blue-500 hover:bg-blue-600 text-white">Save</button>
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
        tag: ''
      }
    }
  },
  methods: {
    addTag() {
      if(!this.article.tags.includes(this.article.tag)) {
        this.article.tags.push(this.article.tag)
      } 
      this.article.tag = ''
    },
    deleteTag(tag) {
      let result = this.tags.filter(el => {
        return el !== tag
      })
      this.tags = result
    },
    createArticle () {
      const {content, title, tags} = this.article

      axios({
        method: 'POST',
        url: `/articles`,
        headers: {
          token: localStorage.getItem('token')
        },
        data : {
          content, title, tags
        }
      })
      .then(({ data }) => {
        console.log('success');
        console.log(data);
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