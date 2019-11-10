<template>
 <div id="writePage">
<navbar :userLogin="userLogin" @loggedIn="isLogin"></navbar>
    <!-- <Sidebar id="test" :userLogin="userLogin" @logout="userLogout"></Sidebar> -->
    <div id="formArticle">
      <form @submit.prevent="createArticle">
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
        <a @click="saveToDraft">Save to draft</a>
      <form>
    </div>
 </div>
    
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import axios from '../../config/axios'

export default {
  name : 'createArticle',
  components : {
    Editor,
    Sidebar,
    Navbar
  },
  data(){
    return{
      tags : [],
      content : '',
      title : '',
      dropFiles : [],
      userLogin : true,
      
    }
  },
  methods : {
    createArticle(){
      let token = localStorage.getItem('token')
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
        method : 'post',
        url : '/articles/add',
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
    },
    deleteDropFile(index){
      this.dropFiles.splice(index, 1)
    },
     userLogout(){
      localStorage.clear()
      this.userLogin = false
    },
     isLogin(){
      let token = localStorage.getItem('token')
      if(token){
        this.userLogin = true
      } else {
        this.userLogin = false
      }
    },
    saveToDraft(){
      let token = localStorage.getItem('token')
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
        method : 'post',
        url : '/articles/addDraft',
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
    },
  }
}
</script>

<style>
#formArticle{
width: 100%;
margin : 10px auto;
height: 92vh;
overflow: scroll;
padding: 20px;

}
#writePage{
  display: flex;
  flex-direction: row
}
</style>
