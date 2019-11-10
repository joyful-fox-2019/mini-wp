<template>
    <!-- edit page -->
      <div class="container mt-5" style="padding: 40px;" >
        <h1 style="text-align: center;"> Edit Page </h1>
        <form>
            <div class="form-group">
              <label><b>Page Title</b></label>
              <input v-model="editTitle" type="text" class="form-control" id="pageTitle">
            </div>
            <div class="form-group">
                <label><b>Page Body</b></label>
                <Editor v-model="editContent" api-key='axnkcmia8jj36i1936fhxiqk3wagnqs5dle6xcmljp52lao9' :init="{plugins: 'wordcount'}"></Editor>
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="publish">
                <label class="form-check-label" for="exampleCheck1">Publish</label>
            </div>
            <button v-on:click.prevent="editArticle(id)" type="submit" class="btn btn-warning">Save</button>
        </form>
</template>

<script>
import axios from 'axios'
import Editor from '@tinymce/tinymce-vue'

export default {
    name : 'editpage',
    data() {
        return {
            editTitle : '',
            editContent : '',

        }
    },
    components : {
        Editor
    },
    props : ['id'],
    methods : {
        editArticle(id) {
            axios({
                method: 'put',
                url: `http://localhost:3000/wp/articles/${id}`,
                data: {
                    title: this.editTitle,
                    content: this.editContent
                },
                headers : {
                    token : localStorage.getItem('token')
                }
            })
                .then((result) => {
                    console.log('masuk then edit')
                    console.log(result)
                    this.$emit('showhome')
                }).catch((err) => {
                    this.$swal('error',err.response.data.error[0],'error')                    
                }); 
        }
    },
    watch: {
        id(){            
            axios({
                method: 'get',
                url: `http://localhost:3000/wp/articles/${this.id}`,
                headers : {
                    token: localStorage.getItem('token')                    
                }
            })
                .then(({data}) => {
                    console.log(data);
                    this.editContent= data.content
                    this.editTitle= data.title
                }).catch((err) => {
                    this.$swal('error',err.response.data.error[0],'error')
                    console.log(err)
                });
        }
    }
}
</script>

<style>

</style>