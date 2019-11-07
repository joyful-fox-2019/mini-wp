<template>
<div class="write-page">
    <div>
        <h1>Write</h1>
    </div>
    <form @submit.prevent="uploadArticle()">
        <div style="margin:20px 0 10px 0;">
            <div>
                <label for="title" style="margin: 20px 0 0 0;">Title</label>
            </div>
            <div>
                <input v-model="title" type="text" class="title"></div>
            </div>
            <div style="margin:20px 0 10px 0;">
                <div>
                    <label for="content" style="margin: 20px 0 0 10px 0;">Content</label>
                </div>
                <div>
                        <quill v-model="content" :config="config" output="html" class="editor" style="background-color:white;"></quill>
                </div>
            </div>
            <div style="margin:60px 0 10px 0; display:flex;">
                <div>
                    <b-field class="file">
                        <b-upload v-model="file">
                            <a class="button is-primary">
                                <i class="fas fa-upload" style="margin-right:5px;"></i>
                                <span>Upload Article Image</span>
                            </a>
                        </b-upload>
                        <span class="file-name" v-if="file">
                            {{ file.name }}
                        </span>
                    </b-field>
                </div>
                <div style="margin-left:10px;">
                    <button class="button is-info" type="submit" >Upload</button>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
import Upload from './Upload'
import Swal from 'sweetalert2'
import axios from '../apis/server'
export default {
    name : 'WriteArticle',
    components : {
        Upload
    },
    data() {
        return {
            config: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                        ['blockquote', 'code-block','image'],

                        [{ 'header': 1 }, { 'header': 2 }], // custom button values
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
                        [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
                        [{ 'direction': 'rtl' }], // text direction

                        [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                        [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
                        [{ 'align': [] }],

                        ['clean'] // remove formatting button
                    ]
                }
            },
            content : '',
            title : '',
            file: null
        }
    },
    methods : {
        uploadArticle() {
            let bodyFormData = new FormData()
            bodyFormData.append('image', this.file)
            bodyFormData.append('title', this.title)
            bodyFormData.append('content', this.content)
            axios({
                method : 'post',
                url : '/articles',
                headers : {
                    token : localStorage.getItem('token')
                },
                data : bodyFormData
            })
                .then(({ data })=>{
                    this.title = ''
                    this.content = ''
                    this.file = ''
                    this.$emit('changePage',false,true,false,false)
                    Swal.fire('success','success','success')
                })
                .catch(err=>{
                    Swal.fire('error','success','error')
                })
        },
        previewFile (event) {
            // this.formUploadImg.img = event.target.files[0]
            this.formUploadImg.img = event.target.files[0]
        }
    }
}
</script>

<style scoped>
.write-page {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    height: 90vh;
    /* overflow: scroll; */
}

.title {
    width: 100%;
}

.editor {
    height: 300px;
    /* overflow: auto; */
}
</style>