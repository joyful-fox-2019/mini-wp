<template>
  <div>
    <h2 class="mt-2 mb-4"> <b></b> Edit Article "{{ title }}" </h2>
    <form enctype="multipart/form-data" @submit.prevent="updateData()">
      <b-form-input required v-model="title" placeholder="Article Title"></b-form-input>
      <quill-editor 
        class="mt-3"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        >
      </quill-editor>
      <b-form-input required v-model="tags" class="mt-3" placeholder="Tags"></b-form-input>
      <b-form-file
        class="mt-3"
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a image or drop for edit article here..."
        drop-placeholder="Drop image here..."
      ></b-form-file>
      <img :src="imgUrl" class="mt-3" width="50%">
      
      <b-button @click="goBack" variant="secondary" class="mt-3">Back</b-button>
      <b-button variant="info" type="submit" class="mt-3">Edit Article</b-button>
      <b-button @click="deleteArticle()" variant="danger" class="mt-3">Delete Article</b-button>
    </form>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import axios from '../config/getdata'

export default {
  data(){
    return{
      title:'',
      content: '',
      tags: '',
      editorOption: {},
      file: null,
      imgUrl: '',
    }
  },
  components: {
    quillEditor
  },
  methods: {
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    },
    goBack() {
    window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    fetchDetailArticle(){
      axios({
        method: 'get',
        url: `/articles/findArticle/${this.$route.params.id}`
      })
      .then(({ data }) => {
        this.imgUrl = data.imgUrl
        this.title = data.title
        this.content = data.description
        this.tags = data.tags.join(', ')
        console.log(this.tags)
      })
      .catch(err => {
        this.next(err.respponse.data)
      })
    },
    updateData(){

      const formData = new FormData()
      if(this.file == null){
        formData.append('imgUrl', this.imgUrl)
      }
      else{
        formData.append('imgUrl', this.file)
      }
      formData.append('title', this.title)
      formData.append('description', this.content)
      formData.append('tags', this.tags === null ? '' : this.tags)

      axios({
        url: `/articles/${this.$route.params.id}/img`,
        method: 'patch',
        data: formData,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(({ data }) => {
        console.log(data)
      })
      .catch(err => {
        console.log(this.err.response)
        this.next(err)
      })
    },
    deleteArticle(){
      axios({
        url: `/articles/${this.$route.params.id}`,
        method: `delete`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({ data }) => {
        console.log((data))
        this.$routes
        this.$router.push({ path: `/admin/list-article/${localStorage.getItem('userid')}` })
        this.successToast('Article Successfuly deleted!')
      })
      .catch(err => {
        console.log(err.response.data)
        this.next(err.response.data)
      })
    }
  },
  computed: {
    editor() {
      // return this.$refs.myQuillEditor.quill
    },
  },
  mounted() {
    console.log('this is current quill instance object', this.editor),
    window.scrollTo(0, 0);
  },
  created(){
    this.fetchDetailArticle()
    
  }
}
</script>

<style>
  .ql-editor{
    height: 50vh;
  }
</style>