<template>
    <form id="create-article" @submit.prevent="CreateArticle()" enctype="multipart/form-data" class="m-2">
        <div class="card-header d-flex justify-content-between">
        <h3>What's your story today ?</h3>
        <button type="button" class="close" aria-label="Close" @click="closeCreateForm()">
        <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <label>Title:</label>
        <br>
        <input type="text" class="form-control" v-model='title'>
        <br>
        <label>Tags</label>
        <br>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" value="World" v-model="tags">
        <label class="form-check-label">World</label>
        </div>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" value="Regional" v-model="tags">
        <label class="form-check-label">Regional</label>
        </div>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" value="Megapolitan" v-model="tags">
        <label class="form-check-label">Megapolitan</label>
        </div>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" value="Science" v-model="tags">
        <label class="form-check-label">Science</label>
        </div>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" value="Technology" v-model="tags">
        <label class="form-check-label">Technology</label>
        </div>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" value="Health" v-model="tags">
        <label class="form-check-label">Health</label>
        </div>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" value="Lifestyle" v-model="tags">
        <label class="form-check-label">Lifestyle</label>
        </div>
        <br>
        <br>
        <label>Description</label>
        <br>
        <quill v-model="content" :config="config" output="html"></quill>
        <br>
        <br>
        <div class="custom-file">
        <input @change="previewImage" id="input-file" class="custom-file-input" type="file" />
        <label class="custom-file-label" for="validatedCustomFile"></label>
        </div>
        <div class="d-flex justify-content-center mt-2">
        <div class="image-preview" v-if="imageData.length > 0">
            <img class="preview" :src="imageData" style="max-width: 360px; max-height: 240px; ">
        </div>
        </div>
        <br>
        <div class="d-flex justify-content-center">
        <button class="btn" type="submit" style="background-color: #ffafb0; color:white;">Create Article</button>
        </div>
    </form>
</template>

<script>
import Vue from 'vue'
import VueQuill from 'vue-quill'
Vue.use(VueQuill)
export default {
    name: 'CreateArticle',
    data() {
        return {
            title: '',
            content: '',
            imageData: '',
            url: '',
            formUploadImage: {
                image: ''
            },
            tags: [],
            dariNavBar: {
            },
            articleForm: true,
            UserArticle: false,
            detailsPage: false,
            config: {
                modules: {
                    toolbar:  [
                        ['bold', 'italic', 'underline', 'strike'],  
                        ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],              
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'script': 'sub'}, { 'script': 'super' }],      
                        [{ 'indent': '-1'}, { 'indent': '+1' }],          
                        [{ 'direction': 'rtl' }],                         
                        [{ 'size': ['small', false, 'large', 'huge'] }],  
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'color': [] }, { 'background': [] }],     
                        [{ 'font': [] }],
                        [{ 'align': [] }],
                        ['clean']                                         
                    ]
                }
            }
        }
    },
    methods: {
        previewImage (event) {
            var input = event.target
            if (input.files && input.files[0]) {
                var reader = new FileReader()
                reader.onload = (e) => {
                    this.imageData = e.target.result
                }
            reader.readAsDataURL(input.files[0])
            }
            this.formUploadImage.image = event.target.files[0]
        },
        closeCreateForm () {
            this.articleForm = false
            this.dariNavBar.mainContent = true
            this.UserArticle = false
            this.showList()
        },
        CreateArticle () {
            if (!this.formUploadImage.image) {
                swal.fire({
                type: 'error',
                title: 'failed to upload file ',
                text: 'Cannot be empty',
                showConfirmButton: false,
                timer: 2000
                })
            } else {
                swal.fire({
                    title: 'wait a minute to upload data',
                    allowOutsideClick: () => this.swal.isLoading(),
                    showConfirmButton: false
                })
                let { image } = this.formUploadImage
                var bodyFormData = new FormData()
                bodyFormData.append('file', image)
                axios({
                        url: 'http://localhost:3000/article/upload',
                        method: 'post',
                        data: bodyFormData,
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                .then (({ data }) => {
                    this.url = data.file
                    return axios({
                        url: 'http://localhost:3000/article',
                        method: 'post',
                        headers: {
                            token: localStorage.getItem('token')
                        },
                        data: {
                            file: data.file,
                            content: this.content,
                            title: this.title,
                            tags: this.tags
                        }
                    })
                })
                .then (({ data }) => {
                    swal.close()
                    swal.fire({
                        title: 'Success Creating new article',
                        type: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    this.dariNavBar.mainContent = true
                    this.title = ''
                    this.imageData = ''
                    this.formUploadImage.image = ''
                    this.content = ''
                    this.url = ''
                    this.tags = []
                    this.articleForm = false
                    this.UserArticle = false
                    this.showList()
                })
                .catch (err => {
                    swal.close()
                    swal.fire({
                        title: 'Failed creating new article',
                        type: 'error',
                        showConfirmButton: false,
                        text: err.response.data,
                        timer: 2000
                    })
                })
            }
        },
        showList () {
            axios({
                url: 'http://localhost:3000/article/news',
                method: 'get',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then (({ data }) => {
                this.dariNavBar.result = data
                console.log(this.dariNavbar)
                this.$emit('dariNavbar', this.dariNavBar)
                this.$emit('articleForm', false)
                this.$emit('UserArticle', false)
                // console.log(data)
            })
        }
    }
}
</script>

<style>

</style>