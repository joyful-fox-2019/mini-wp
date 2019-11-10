<template>
  <b-container fluid>

    <b-row>
        <b-col>
            <label for="input-default">Title:</label>
            <b-form-input v-model="title" id="input-default" placeholder="Enter your article title"></b-form-input>
        </b-col>
    </b-row>

    <b-row>
        <b-col>
            <div class="mt-3">Selected file: {{ this.file }}</div>
                <b-form-file
                v-model="file"
                :state="Boolean(file)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                ></b-form-file>
        </b-col>
    </b-row>

    <b-row>
        <b-col>
            <label class="mt-3">Content:</label>
            <Editor v-model="content" api-key="78f3yvvyvqkfkiwwske32ed6kbpbpjp25sa8jq9mctqk6v5j" :init="{plugins: 'wordcount'}"></Editor>
        </b-col>
    </b-row>

    <b-row>
        <b-col style="display: flex; justify-content: flex-end">
            <b-button @click="createArticle" class="mt-3" pill variant="outline-secondary">Write Article</b-button>
        </b-col>
    </b-row>

</b-container>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: "AddArticleForm",
    data() {
        return {
            title: '',
            content: '',
            file: null
        }
    },
    components: {
        Editor
    },
    methods: {
        createArticle() {
            console.log(this.featured_image);
            const formData = new FormData()
            formData.append('featured_image', this.file)
            formData.set('title', this.title)
            formData.set('content', this.content)

            axios({
                method: "POST",
                url: "http://localhost:3000/articles/",
                data: formData,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({ data }) => {
                    Swal.fire({
                        icon: 'success',
                        title: `Success posted a new article`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(err => {
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong..'
                    })
                })
        }
    }
}
</script>

<style>

</style>