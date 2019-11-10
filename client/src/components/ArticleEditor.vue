<template>
  <div>
    <b-form @reset="onReset">
      <b-form-group id="article-title">
        <b-form-input
          id="article-title"
          v-model="form.title"
          required
          placeholder="Title..."
        ></b-form-input>
      </b-form-group>

       <b-form-file
        v-model="file"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        @change="onFileChanged"
      ></b-form-file>
      
      <div>
        <quill v-model="content" output="html" :config="config"></quill>
      </div>

      <b-button type="submit" variant="primary" @click="onSubmit">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from '../../config/axios'

export default {
  data() {
    return {
      file: null,
      form: {
        title: ''
      },
      content: this.getContent(),
      config: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], 
            // ['blockquote', 'code-block','image'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }], 
            [{ 'align': [] }],
            ['clean']
          ]
        }
      }
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
          this.title = data.title;
          return data.content;
        })
        .catch( error => {
          console.log(error);
        })
      } else {
        return '';
      }
    },
    onSubmit() {
      var bodyFormData = new FormData();
      bodyFormData.append('title', this.form.title);
      bodyFormData.append('content', this.content);
      bodyFormData.append('featuredImage', this.file);
      
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
      })
      .catch( error => {
          console.log(error);
      })
    },
    onReset() {
    }
  }
};
</script>

<style>

</style>