<template>
    <!-- add page -->
      <div class="container mt-5" style="padding: 40px;" >
          <h1 style="text-align: center;"> Add New Page </h1>
          <form enctype="multipart/form-data">
              <div class="form-group">
                <label><b>Page Title</b></label>
                <input v-model="title"  type="text" class="form-control" id="pageTitle" placeholder="Page Title">
              </div>
              <div class="form-group">
                <label><b>Author</b></label>
                <input v-model="author"  type="text" class="form-control" id="author" placeholder="Author/Aliase">
              </div>
              <div class="form-group">
                  <label><b>Page Body</b></label>
                  <Editor v-model="content" api-key='axnkcmia8jj36i1936fhxiqk3wagnqs5dle6xcmljp52lao9' :init="{plugins: 'wordcount'}"></Editor>
              </div>

            <div class="form-group">
                <!-- Styled -->
                <b-form-file
                v-model="image"
                :state="Boolean(image)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                ></b-form-file>
                <div class="mt-3">Selected file: {{ this.image.name}}</div>
            </div>

              <div class="form-group form-check">
                  <input type="checkbox" class="form-check-input" id="publish">
                  <label class="form-check-label" for="exampleCheck1">Publish</label>
              </div>
              <button v-on:click.prevent="addArticle()" type="submit" class="btn btn-warning">Save</button>
          </form>
      </div> 
</template>

<script>
import axios from 'axios'
import Editor from '@tinymce/tinymce-vue'

export default {
    name: 'addpage',
    data() {
        return {
            title : '',
            content : '',
            image : '',
            author : ''
        }
    },
    components: {
        Editor
    },
    methods : {
        addArticle() {
            let bodyFormData = new FormData()
            bodyFormData.append('title', this.title)
            bodyFormData.append('content', this.content)
            bodyFormData.append('author', this.author)
            bodyFormData.append('image', this.image)
            console.log(bodyFormData.get('image') , 'body form data')
            axios({
                method: 'post',
                url: 'http://localhost:3000/wp/articles',
                data: bodyFormData,
                headers : {
                    token: localStorage.getItem('token')                    
                }
            })
                .then((result) => {
                    console.log(result)
                    this.$emit('showhome')
                }).catch((err) => {
                    this.$swal('error',err.response.data.error[0],'error')
                    console.log(err)
                });
        },

    }
}
</script>

<style>

</style>