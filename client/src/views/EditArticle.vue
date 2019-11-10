<template>
<div>
  <Navbar  :userLogin="userLogin"></Navbar>
  <div id="formArticle">
      <form @submit.prevent="updateArticle">
        <b-field label="Title">
            <b-input type="text" v-model="title"></b-input>
        </b-field>

        <b-field label="Content">
            <div class="field">
              <editor
              v-model="content"
              api-key="len2fw22p8rdjbvkee1128okxped3d2fnf5l11br8vsupt3t"
              ></editor>
            </div>
        </b-field>

        <b-field label="Add some tags">
          <b-taginput
              v-model="tags"
              ellipsis
              icon="label"
              placeholder="Add a tag">
          </b-taginput>
        </b-field>

        <b-field label="Upload image header">
          <br>
          <p>Previous Image</p>
          <img :src="currentImage" style="width: 50px; height: 50px">
          <div style="margin: 0px auto; width: 60%">
            <b-upload v-model="dropFiles"
                multiple
                drag-drop>
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon
                        icon="upload"
                        size="is-large">
                    </b-icon>
                  </p>
                  <p>Drop your file here or click to upload</p>
                </div>
              </section>
            </b-upload>
          </div>
        </b-field>

        <div class="tags" >
            <span v-for="(file, index) in dropFiles"
                :key="index"
                class="tag is-primary" >
                {{file.name}}
                <button class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)">
                </button>
            </span>
        </div>

        <button class="button is-primary" type="submit">Create Article</button>
      <form>
    </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Editor from '@tinymce/tinymce-vue'
import axios from '../../config/axios'

export default {
  components :{
    Navbar,
    Editor
  },
  data(){
    return{
      userLogin : false,
      title : '',
      content : '',
      tags : [],
      dropFiles : [],
      currentImage : ''
    }
  },
  methods : {
    getToken(){
      if (localStorage.getItem('token')){
        this.userLogin = true
      } else {
        this.userLogin = false
      }
    },
    getArticleDetail(){
      let {articleId} = this.$route.params
      console.log(articleId)
      axios({
        url : `/articles/${articleId}`,
        method : 'get'
      })
        .then(({data})=>{
          this.title = data.title
          this.content = data.content
          this.tags = data.tags
          this.currentImage = data.image
          console.log(data.image)
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    updateArticle(){
      let token = localStorage.getItem('token')
      let {articleId} = this.$route.params
      console.log(this.title)
      console.log(this.content)
      console.log(this.tags)
      console.log(this.dropFiles[0])
       let formData = new FormData();
      formData.append('image',this.dropFiles[0])
      formData.append('title',this.title)
      formData.append('content',this.content)
      formData.append('tags',this.tags)
      console.log(formData);
      axios({
        method : 'patch',
        url : `/articles/${articleId}`,
        data : formData,
        headers : {
          token,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(({data})=>{
          console.log(data);
        })
        .catch((err)=>{
          console.log(err);
        })
    }
  },
  created(){
    this.getToken()
    this.getArticleDetail()
  }
}
</script>

<style>

</style>