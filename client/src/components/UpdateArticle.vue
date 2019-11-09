<template>
<div class="write-page">
    <div class="preloader loading" v-if="isLoading">
        <span class="slice"></span>
        <span class="slice"></span>
        <span class="slice"></span>
        <span class="slice"></span>
        <span class="slice"></span>
        <span class="slice"></span>
    </div>
    <div>
        <h1>Update</h1>
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
            <br><br>
                <div>
                    <b-field label="Add some tags">
                        <b-taginput
                            v-model="tags"
                            ellipsis
                            icon="label"
                            placeholder="Add a tag">
                        </b-taginput>
                    </b-field>                    
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
    name : 'UpdateArticle',
    components : {
        Upload
    },
    props: [
        'myDetailData'
    ],
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
            content : this.myDetailData.content,
            title : this.myDetailData.title,
            file: null,
            isLoading : false,
            id: this.myDetailData._id,
            tags: this.myDetailData.tags
        }
    },
    methods : {
        uploadArticle() {
            this.isLoading = true
            let bodyFormData = new FormData()
            bodyFormData.append('image', this.file)
            bodyFormData.append('title', this.title)
            bodyFormData.append('content', this.content)
            bodyFormData.append('tags',this.tags.join(','))
            axios({
                method : 'put',
                url : `/articles/${this.id}`,
                headers : {
                    token : localStorage.getItem('token')
                },
                data : bodyFormData
            })
                .then(({ data })=>{
                    this.isLoading = false
                    this.title = ''
                    this.content = ''
                    this.file = ''
                    this.$emit('changePage',false,false,false,false,true,false,false)
                    Swal.fire('success','update success','success')
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
    overflow: auto;
}

.title {
    width: 100%;
}

.editor {
    height: 300px;
    /* overflow: auto; */
}

/* ------------ */

@keyframes preload-show-1 {
  from {
    transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-hide-1 {
  to {
    transform: rotateZ(60deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-cycle-1 {
  5% {
    transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
  10%, 75% {
    transform: rotateZ(60deg) rotateY(0) rotateX(0deg);
    border-left-color: #000;
  }
  80%, 100% {
    transform: rotateZ(60deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-show-2 {
  from {
    transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-hide-2 {
  to {
    transform: rotateZ(120deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-cycle-2 {
  10% {
    transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
  15%, 70% {
    transform: rotateZ(120deg) rotateY(0) rotateX(0deg);
    border-left-color: #000;
  }
  75%, 100% {
    transform: rotateZ(120deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-show-3 {
  from {
    transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-hide-3 {
  to {
    transform: rotateZ(180deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-cycle-3 {
  15% {
    transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
  20%, 65% {
    transform: rotateZ(180deg) rotateY(0) rotateX(0deg);
    border-left-color: #000;
  }
  70%, 100% {
    transform: rotateZ(180deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-show-4 {
  from {
    transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-hide-4 {
  to {
    transform: rotateZ(240deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-cycle-4 {
  20% {
    transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
  25%, 60% {
    transform: rotateZ(240deg) rotateY(0) rotateX(0deg);
    border-left-color: #000;
  }
  65%, 100% {
    transform: rotateZ(240deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-show-5 {
  from {
    transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-hide-5 {
  to {
    transform: rotateZ(300deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-cycle-5 {
  25% {
    transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
  30%, 55% {
    transform: rotateZ(300deg) rotateY(0) rotateX(0deg);
    border-left-color: #000;
  }
  60%, 100% {
    transform: rotateZ(300deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-show-6 {
  from {
    transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-hide-6 {
  to {
    transform: rotateZ(360deg) rotateY(-90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-cycle-6 {
  30% {
    transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
  35%, 50% {
    transform: rotateZ(360deg) rotateY(0) rotateX(0deg);
    border-left-color: #000;
  }
  55%, 100% {
    transform: rotateZ(360deg) rotateY(90deg) rotateX(0deg);
    border-left-color: #fff;
  }
}
@keyframes preload-flip {
  0% {
    transform: rotateY(0deg) rotateZ(-60deg);
  }
  100% {
    transform: rotateY(360deg) rotateZ(-60deg);
  }
}

.preloader {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 20px;
  display: block;
  width: 3.75em;
  height: 4.25em;
  margin-left: -1.875em;
  margin-top: -2.125em;
  transform-origin: center center;
  transform: rotateY(180deg) rotateZ(-60deg);
  z-index: 1;
}
.preloader .slice {
  border-top: 1.125em solid transparent;
  border-right: none;
  border-bottom: 1em solid transparent;
  border-left: 1.875em solid #000;
  position: absolute;
  top: 0px;
  left: 50%;
  transform-origin: left bottom;
  border-radius: 3px 3px 0 0;
}
.preloader .slice:nth-child(1) {
  transform: rotateZ(60deg) rotateY(0deg) rotateX(0);
  animation: 0.15s linear 0.82s preload-hide-1 both 1;
}
.preloader .slice:nth-child(2) {
  transform: rotateZ(120deg) rotateY(0deg) rotateX(0);
  animation: 0.15s linear 0.74s preload-hide-2 both 1;
}
.preloader .slice:nth-child(3) {
  transform: rotateZ(180deg) rotateY(0deg) rotateX(0);
  animation: 0.15s linear 0.66s preload-hide-3 both 1;
}
.preloader .slice:nth-child(4) {
  transform: rotateZ(240deg) rotateY(0deg) rotateX(0);
  animation: 0.15s linear 0.58s preload-hide-4 both 1;
}
.preloader .slice:nth-child(5) {
  transform: rotateZ(300deg) rotateY(0deg) rotateX(0);
  animation: 0.15s linear 0.5s preload-hide-5 both 1;
}
.preloader .slice:nth-child(6) {
  transform: rotateZ(360deg) rotateY(0deg) rotateX(0);
  animation: 0.15s linear 0.42s preload-hide-6 both 1;
}
.preloader.loading {
  animation: 2s preload-flip steps(2) infinite both;
}
.preloader.loading .slice:nth-child(1) {
  transform: rotateZ(60deg) rotateY(90deg) rotateX(0);
  animation: 2s preload-cycle-1 linear infinite both;
}
.preloader.loading .slice:nth-child(2) {
  transform: rotateZ(120deg) rotateY(90deg) rotateX(0);
  animation: 2s preload-cycle-2 linear infinite both;
}
.preloader.loading .slice:nth-child(3) {
  transform: rotateZ(180deg) rotateY(90deg) rotateX(0);
  animation: 2s preload-cycle-3 linear infinite both;
}
.preloader.loading .slice:nth-child(4) {
  transform: rotateZ(240deg) rotateY(90deg) rotateX(0);
  animation: 2s preload-cycle-4 linear infinite both;
}
.preloader.loading .slice:nth-child(5) {
  transform: rotateZ(300deg) rotateY(90deg) rotateX(0);
  animation: 2s preload-cycle-5 linear infinite both;
}
.preloader.loading .slice:nth-child(6) {
  transform: rotateZ(360deg) rotateY(90deg) rotateX(0);
  animation: 2s preload-cycle-6 linear infinite both;
}

</style>