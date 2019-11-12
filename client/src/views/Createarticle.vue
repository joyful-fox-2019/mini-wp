<template>
  <div>
    <h2 class="mt-5 mt-md-2 mb-4"> <b></b> Create Article </h2>
    <form>
      <b-form-input required v-model="title" placeholder="Article Title"></b-form-input>
      <b-form-file
        class="mt-3"
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a image or drop it here..."
        drop-placeholder="Drop image here..."
      ></b-form-file>
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
    <b-button @click="postArticle()" variant="info" class="mt-3">Post Article</b-button>
    </form>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import axios from '../config/getdata'
import Swal from 'sweetalert2'

export default {
  data(){
    return{
      title:'',
      content: '',
      tags: null,
      editorOption: {},
      file: null
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
      postArticle(){
        Swal.showLoading()
        const formData = new FormData()
        formData.append('imgUrl', this.file)
        formData.append('title', this.title)
        formData.append('description', this.content)
        formData.append('tags', this.tags === null ? '' : this.tags)

        axios({
          url: '/articles',
          method: 'post',
          data: formData,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({ data }) => {
          console.log(data)
          this.successToast('Article Successfuly published!')
          console.log("masuk")
          this.$router.push({ path: `/admin/list-article/${localStorage.getItem('userid')}` })
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
      }
    },
    computed: {},
    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
}
</script>

<style>
  .ql-editor{
    height: 50vh;
  }
</style>