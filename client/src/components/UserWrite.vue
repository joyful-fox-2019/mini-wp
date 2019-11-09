<template>
    <div class="col-md-10 p-3" style="height: 85vh; overflow: scroll; background-color: rgb(226, 226, 226);" >
        <form @submit.prevent="writeArticle">
          <div class="form-group">
            <label for="articleTitle"><strong>Title</strong></label>
            <input v-model="title" type="text" class="form-control" id="articleTitle" placeholder="your article title">
          </div>
          <div class="form-group">
            <label for="articleTag"><strong>Tag</strong></label>
            <select v-model="tag" class="form-control" id="articleTag">
              <option value="" selected disabled hidden>Choose Tag Here</option>
              <option>Sports</option>
              <option>Daily-Lifes</option>
              <option>Politics</option>
              <option>Healths</option>
              <option>Travels</option>
              <option>Automotives</option>
              <option>Electronics</option>
              <option>Hobbies</option>
              <option>Foods</option>
            </select>
          </div>
          <div class="form-group">
            <label for="addImage"><strong>Add Image</strong></label>
            <input @change="previewFile" type="file" class="form-control-file" id="addImage">
            <button @click.prevent="uploadImage" class="btn btn-info my-2">Upload Image</button>
          </div>
          <div class="form-group">
              <quill-editor class="bg-white" v-model="content"
                ref="myQuillEditor"
                >
              </quill-editor>
          </div>
          <button class="btn btn-primary" type="submit">Publish !</button>
        </form>

    </div>
</template>


<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import axios from'../../myAxios/axios'
import Swal from 'sweetalert2'
  export default {
      components: {
    quillEditor
  },
    data() {
      return {
        title : '',
        tag : '',
        author : '',
        content: '',
        formUploadImg: {
        img: ''
        },
        imageLink : 'https://i2.wp.com/www.scribblesandcrumbs.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg?w=1170'
      }
    },
    methods :{
      previewFile (event) {
        this.formUploadImg.img = event.target.files[0]
      },
      writeArticle(){
        axios.post('/articles',{
          title : this.title,
          tag : this.tag,
          content : this.content,
          createdAt : Date(),
          author : localStorage.getItem('user'),
          featured_image : this.imageLink
        },{
          headers :{
            token : localStorage.getItem('token')
          }
        })
        .then(({data})=>{
          Swal.fire({
            icon: 'success',
            title: 'Blog Created',
            text:`${data.data.title} successfully published !`
          })
          this.title = ''
          this.tag = ''
          this.content = ''
          this.createdAt = ''
          this.author = ''
          this.$emit('reFetch')
        })
        .catch(err=>{
          Swal.fire({
            icon: 'error',
            title: err.response.data.message.join('\n'),
            text:`Do you even Try Bruh?`
          })
        })
      },
      uploadImage(){
        let { img } = this.formUploadImg
        let bodyFormData = new FormData()
        if(this.formUploadImg.img !== ''){
          Swal.fire({
            title: 'wait a moment to upload data',
            allowOutsideClick: () => !Swal.isLoading()
          })
          Swal.showLoading('wait a minute ')
        }else{
          Swal.fire({
            icon: 'error',
            title: 'No Image Selected'
          })
        }
        bodyFormData.append('image', img)
        axios.post('/users',bodyFormData,
        {
          headers :{
            token : localStorage.getItem('token')
          }
        })
        .then(({data})=>{
          this.imageLink = data.link
          Swal.close()
          Swal.fire({
            icon: 'success',
            title: 'Image Uploaded'
          })
        })
        .catch(err=>{
          console.log(err.response.data.message)
        })
      }
    }
  }
</script>



<style>
.ql-editor{
    height:40vh;
}
</style>