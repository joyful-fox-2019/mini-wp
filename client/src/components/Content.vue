<template>
  <div class="" style="margin-top: 90px;">
      <div class="row">
          <div class="col-3 ml-3 d-none d-md-block" id="sideNavBar">
              <div class="card p-2">
                  <h1>Masuk Pak eko</h1>
                  <div class="d-flex justify-content-center">
                        <button class="btn btn-primary" @click="showArticleForm()">Create Article</button>
                  </div>
              </div>
          </div>
          <div class="col-md-8 col-sm-12" id="main-content">
              <div class="card p-2">
                  <div v-if='articleForm'>
                      <form id="create article" @submit.prevent="CreateArticle()" enctype="multipart/form-data" class="m-2">
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
                            <button class="btn" type="submit" style="background-color: #ffafb0;">Create Article</button>
                          </div>
                      </form>
                  </div>
                  <div v-for="(data, index) in arrData" :key="index">
                      <div class="container">
                          <div class="row">
                              <div class="col-md-4 col-sm-6">
                                  <img :src="data.featured_image" width="100%">
                              </div>
                              <div class="col-md-8 col-sm-6">
                                  <div class="row">
                                      <h3>{{data.title}}</h3>
                                  </div>
                                  <div class="row">
                                      <div v-for="(el, index) in data.tags" :key="index">
                                      <p>{{el}} &nbsp;</p>
                                      </div>
                                  </div>
                                  <hr>
                                  <div class="row">
                                      <p>Created by: {{data.author}}</p>
                                  </div>
                              </div>
                          </div>
                          <div class="row">
                            <p v-html="data.content"></p>
                          </div>
                      </div>
                      
                      <h1>{{data}}</h1>
                  </div>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
                  <h1>Masuk Pak Budi</h1>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQuill from 'vue-quill'
Vue.use(VueQuill)
export default {
    props: ['arrData'],
    name: 'Content',
    data () {
        return {
            articleForm: false,
            title: '',
            content: '',
            imageData: '',
            url: '',
            formUploadImage: {
                image: ''
            },
            tags: [],
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
        showArticleForm () {
            this.articleForm = true
        },
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
                    url: 'http://localhost:3000/upload',
                    method: 'post',
                    data: bodyFormData
                })
                .then (({ data }) => {
                    this.url = data.file
                    return axios({
                        url: 'http://localhost:3000/article',
                        method: 'post',
                        data: {
                            title: this.title,
                            content: this.content,
                            tags: this.tags,
                            featured_image: this.url
                        },
                        headers: {
                            token: localStorage.getItem('token')
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
                    this.title = ''
                    this.imageData = ''
                    this.formUploadImage.image = ''
                    this.content = ''
                    this.url = ''
                    this.tags = []
                    this.articleForm = false
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
        }
    },
    created () {
        this.articleForm = false
    }
}
</script>

<style>

#sideNavBar {
    position: fixed;
}

@media screen and (max-width: 767px) {
  #main-content {
    margin: 2px !important; 
    }
}
@media screen and (min-width: 768px) {
  #main-content {
    margin-left: 27%;
    }
}

</style>