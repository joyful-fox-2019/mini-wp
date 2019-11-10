<template>
  <div>
    <h1 class="title">Create Article</h1>
    <div class="box">
      <form enctype="multipart/form-data">
      <section>
      <b-field label="Title">
        <b-input v-model="title"></b-input>
      </b-field>
        <b-field label="Upload Image">
        <b-field class="file">
          <b-upload v-model="img">
            <a class="button">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
          <span class="file-name" v-if="img">
            {{ img.name }}
          </span>
        </b-field>
      </b-field>
      <editor v-model="content" api-key="rv4pqjmlywbjseru0mp8am5zn0q57k48mdi5ql9e317x5jci" :init="{plugins: 'wordcount'}"></editor>
      <br>
      <b-field label="Tags">
        <b-taginput
          v-model="tags"
          type="is-dark">
        </b-taginput>
      </b-field>
        <br>
      <b-button type="is-info expanded" @click.prevent="handlecreatearticle">
                  Submit
      </b-button>
      <b-button type="is-danger" outlined>Cancel</b-button>
      </section>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "../config/axios";
import Editor from '@tinymce/tinymce-vue';
import Swal from "sweetalert2";
export default {
  name: 'Createarticle',
  data(){
    return {
      img: '',
      title: '',
      content: '',
      tags: []
    }
  },
  components:{
    Editor
  },
  methods: {
    handlecreatearticle(){
      const formData = new FormData()
      formData.append('img', this.img)
      formData.set('title', this.title)
      formData.set('content', this.content)
      this.tags.forEach(element => {
        formData.append('tag', element)
      });
    
      Swal.showLoading()
      axios({
        method:'post',
        url:`/article`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then(({ data }) => {
        Swal.close()
        Swal.fire({
          type: 'success',
          title: 'success create article'
        })
        this.$emit('successcreate')
      })
      .catch(({ response }) => this.next(response.data))
    }
  }
}
</script>

<style>

</style>