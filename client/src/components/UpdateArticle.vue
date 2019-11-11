<template>
  <form id="update-article" @submit.prevent="updateArticle()" class="m-2">
        <div class="card-header d-flex justify-content-between">
        <h3>Update your article</h3>
        </div>
        <label>Title:</label>
        <br>
        <input type="text" class="form-control" v-model='FormUpdateData.title'>
        <br>
        <label>Tags</label>
        <br>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" value="World" v-model="FormUpdateData.tags">
        <label class="form-check-label">World</label>
        </div>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" value="Regional" v-model="FormUpdateData.tags">
        <label class="form-check-label">Regional</label>
        </div>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" value="Megapolitan" v-model="FormUpdateData.tags">
        <label class="form-check-label">Megapolitan</label>
        </div>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" value="Science" v-model="FormUpdateData.tags">
        <label class="form-check-label">Science</label>
        </div>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" value="Technology" v-model="FormUpdateData.tags">
        <label class="form-check-label">Technology</label>
        </div>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" value="Health" v-model="FormUpdateData.tags">
        <label class="form-check-label">Health</label>
        </div>
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" value="Lifestyle" v-model="FormUpdateData.tags">
        <label class="form-check-label">Lifestyle</label>
        </div>
        <br>
        <br>
        <label>Description</label>
        <br>
        <quill v-model="FormUpdateData.content" :config="config" output="html"></quill>
        <br>
        <br>
        <div class="d-flex justify-content-center">
        <button class="btn" type="submit" style="background-color: #ffafb0; color:white;">Update Article</button>
        </div>
    </form>
</template>

<script>
import Vue from 'vue'
import VueQuill from 'vue-quill'
import axios from 'axios'
import swal from 'sweetalert2'
Vue.use(VueQuill)
export default {
    name: 'UpdateArticle',
    props: ['updateData'],
    data () {
        return {
            FormUpdateData: {},
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
    watch : {
        updateData: {
            handler (val) {
                this.FormUpdateData = val
            }
        }
    },
    methods: {
        updateArticle () {
            axios({
                url: `http://hackpress-server.panji-h8.online/article/${this.FormUpdateData._id}`,
                method: 'patch',
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    title: this.FormUpdateData.title,
                    tags: this.FormUpdateData.tags,
                    content: this.FormUpdateData.content
                }
            })
            .then (({ data }) => {
                swal.fire({
                    title: 'Success updating new article',
                    type: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
            })
            .catch (err => {
                swal.fire({
                    title: 'Failed updating new article',
                    type: 'error',
                    showConfirmButton: false,
                    text: err.response.data,
                    timer: 2000
                })
            })
        }
    },
    created () {
        this.FormUpdateData = this.updateData
    }
}
</script>

<style>

</style>