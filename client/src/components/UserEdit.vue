<template>
    <div class="col-md-10 p-3" style="height: 85vh; overflow: scroll; background-color: rgb(226, 226, 226);" >
        <form @submit.prevent="editArticle(editData._id)">
          <h1>Edit Blog</h1>
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
          <button class="btn btn-primary" type="submit">Edit Blog</button>
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
    props : ['editData'],
    components: {
      quillEditor
  },
    data() {
      return {
        title : this.editData.title,
        tag : this.editData.tag,
        content: this.editData.content,
        formUploadImg: {
          img: ''
        },
        imageLink : `${this.editData.featured_image}`
      }
    },
    methods :{
      previewFile (event) {
        this.formUploadImg.img = event.target.files[0]
      },
      editArticle(id){
        axios.patch(`/articles/${id}`,{
          title : this.title,
          tag : this.tag,
          content : this.content,
          createdAt : Date(),
          featured_image : this.imageLink
        },{
          headers :{
            token : localStorage.getItem('token')
          }
        })
        .then(({data})=>{
          Swal.fire({
            icon: 'success',
            title: 'Blog Edited',
            text:`Successfully Edited !`
          })
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
            title: 'wait a minute to upload data',
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
    },
    created(){
      let { img } = this.formUploadImg
      let bodyFormData = new FormData()
      bodyFormData.append('image', img)
    }
  }
</script>



<style>
.ql-editor{
    min-height:200px;
}
</style>