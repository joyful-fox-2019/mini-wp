<template>
  <div>
    <h2 class="mt-2 mb-4"> <b></b> Create Article </h2>
    <form>
      <b-form-input required v-model="text" placeholder="Article Title"></b-form-input>
      <b-form-file
        class="mt-3"
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a image or drop it here..."
        drop-placeholder="Drop image here..."
      ></b-form-file>
      <quill-editor 
        class="mt-3"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        >
    </quill-editor>
    <b-form-input required v-model="tags" class="mt-3" placeholder="Tags"></b-form-input>
    <b-button variant="info" class="mt-3">Post Article</b-button>
    </form>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  data(){
    return{
      text:'',
      content: '',
      tags: '',
      editorOption: {
        // some quill options
      },
      file:null
    }
  },
  components: {
    quillEditor
  },
  methods: {
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html
      }
    },
    computed: {
      editor() {
        // return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
}
</script>

<style>
  .ql-editor{
    height: 50vh;
  }
</style>