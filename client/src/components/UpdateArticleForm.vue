<template>
  <div>
    <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="title"
          placeholder="Enter name"
        ></b-form-input>
    </b-form-group>

     <b-row>
        <b-col>
            <label class="mt-3">Content:</label>
            <Editor v-model="content" api-key="78f3yvvyvqkfkiwwske32ed6kbpbpjp25sa8jq9mctqk6v5j" :init="{plugins: 'wordcount'}"></Editor>
        </b-col>
    </b-row>

    <b-row>
        <b-col style="display: flex; justify-content: flex-end">
            <b-button @click.prevent="updateArticle" class="mt-3" pill variant="outline-secondary">Update Article</b-button>
        </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import Editor from '@tinymce/tinymce-vue'

export default {
    name: "UpdateArticleForm",
    props: ["articleToBeUpdated"],
    components: {
        Editor
    },
    data(){
        return {
            title: this.articleToBeUpdated.title,
            content: this.articleToBeUpdated.content,
            id: this.articleToBeUpdated._id
        }
    },
    methods: {
        updateArticle(id) {
            axios({
                method: "PUT",
                url: `http://miniwpserver.hoandreasm.xyz/articles/${this.id}`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    title: this.title,
                    content: this.content,
                }
            })
                .then(({ data }) => {
                    Swal.fire({
                        icon: 'success',
                        title: `Success updating the article`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$emit('showhomepagefromupdate')

                })
                .catch(err => {
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong.. Or! Your are not authorized lol'
                    })
                })
        }
    }

}
</script>

<style>

</style>