<template>
  <div>
    <h1 class="my-3">Blog Post</h1>
    <b-form>
      <b-form-group id="article-title" class="py-2 pt-4">
        <b-form-input
          id="article-title"
          v-model="form.title"
          required
          placeholder="Title..."
        ></b-form-input>
      </b-form-group>

       <b-form-file
        class="p-4"
        v-if="articleId == ' '"
        v-model="file"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        @change="onFileChanged"
      ></b-form-file>

      <div class="py-2">
      <quill-editor v-model="content"
                    ref="myQuillEditor">
      </quill-editor>
      </div>

      <b-button type="submit" variant="primary" @click.prevent="onSubmit">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from '../../config/axios'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'

export default {
  data() {
    return {
      file: null,
      form: {
        title: ''
      },
      content: ''
    }
  },
  props: ['articleId'],
  methods: {
    onFileChanged (event) {
      this.file = event.target.files[0]
    },
    getContent() {
      if (this.articleId) {
        axios({
          method: 'get',
          url: `/articles/${this.articleId}`,
          headers: {
            authorization: localStorage.getItem('jwt_token'),
            'Content-Type': 'multipart/form-data'
          }
        })
        .then( ({data}) => {
          this.form.title = data.title;
          this.content = data.content;

        })
        .catch( error => {
          console.log(error);
        })
      } else {
        this.content = ''
      }
    },
    onSubmit() {
      var bodyFormData = new FormData();
      bodyFormData.append('title', this.form.title);
      bodyFormData.append('content', this.content);
      if (this.file) {
        bodyFormData.append('featuredImage', this.file);
      }
    
      if (this.articleId) {
        axios({
          method: 'put',
          url: `/articles/${this.articleId}`,
          data: {
            title: this.form.title,
            content: this.content
          },
          headers: {
            authorization: localStorage.getItem('jwt_token')
          }
        })
        .then( ({data}) => {
            this.articles = data;
        })
        .catch( error => {
            console.log(error);
        })
        
      } else {
        axios({
          method: 'post',
          url: `/articles`,
          data: bodyFormData,
          headers: {
            authorization: localStorage.getItem('jwt_token'),
            'Content-Type': 'multipart/form-data'
          }
        })
        .then( ({data}) => {
            this.articles = data;
            this.changePage('home')
        })
        .catch( error => {
            console.log(error);
        })
      }
      
    },
    changePage(value) {
      this.$emit('change-page', value)
    }
  },
  components: {
    quillEditor
  },
  created () {
    this.getContent()
  }
};
</script>

<style>
.ql-editor{
    min-height:300px;
}
</style>