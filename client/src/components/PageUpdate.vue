<template>
  <div>
    <form class="center">
      <section>
        <b-field label="Title :">
          <b-input v-model="title" placeholder="Title"></b-input>
        </b-field>
      </section>

      <b-field label="Content :">
        <quill v-model="content" output="html" :config="config" id="quill"></quill>
      </b-field>

      <section>

        <template>
          <section>
            <b-field label="Tags :">
              <b-taginput
                v-model="tags"
                ellipsis
                icon="label"
                placeholder="ex : programmer"
              >
              </b-taginput>
            </b-field>
          </section>
        </template>


        <label for="" class="label">Featured Image :</label>
        <div v-for="(img, index) in data.featured_image" :key=index>
          <img :src="img" alt="image" style="width: 100px;">
          <b-button type="is-danger" @click="remove(img)">Delete</b-button>
        </div>
        <b-field>
          <b-upload v-model="dropFiles" multiple drag-drop>
            <section class="section" style="background-color: white;">
              <div class="content has-text-centered">
                <p>
                  <b-icon style="align-items:center" icon="upload" size="is-medium">
                  </b-icon>
                </p>
                <p>Drop your files here or click to upload</p>
              </div>
            </section>
          </b-upload>
        </b-field>

        <div class="tags">
          <span v-for="(file, index) in dropFiles"
              :key="index"
              class="tag is-primary" >
                {{file.name}}
            <button class="delete is-small"
                type="button"
                @click="deleteDropFile(index)">
            </button>
          </span>
        </div>

        <b-button type="is-primary submit" @click="update">Update</b-button>
      </section>
    </form>
  </div>
</template>

<script>
import axios from '../../apis/server'

export default {
  name: "pageUpdate",
  data () {
    return {
      title: this.data.title,
      content:this. data.content,
      config: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }], // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
            [{ 'direction': 'rtl' }], // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean'] // remove formatting button
          ]
        }
      },
      dropFiles:[],
      tags: this.data.tags,
      oldImg: this.data.featured_image,
      removed: [],
      loadingComponent: ''
    }
  },
  props: [
    'data'
  ],
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    },
    addTags(){
      this.tagList.push(this.tag)
      this.tag = ''
    },
    openLoading(){
      this.loadingComponent = this.$buefy.loading.open({
        container: true ? null : this.$refs.element.$el
      })
    },
    closeLoading(){
      this.loadingComponent.close()
    },
    remove(img){ 
      this.removed.push(this.oldImg.splice(this.oldImg.indexOf(img), 1))
    },
    update(){

      this.openLoading()

      let fd = new FormData()
      this.dropFiles.forEach(image => {
        fd.append('imgUrl', image)
      });
      fd.append('remove', this.removed)
      this.tags.forEach(tag => {
        fd.append('tags', tag)
      })
      fd.set('title', this.title)
      fd.set('content', this.content)

      axios({
        method: 'put',
        url: `/article/${this.data._id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: fd
      })
        .then(({data}) => {
          this.closeLoading()
          this.dropFiles = []
          this.remove = []
          this.tags = []
          this.title = ''
          this.content = ''
          this.$buefy.toast.open({
            message: 'Update Success!',
            type: 'is-success'
          })
          this.$emit('changePage', 'personal')
        })
        .catch((err) => {
          this.closeLoading()
          this.$buefy.toast.open({
            duration: 5000,
            message: err.response.data.errors.join(', '),
            position: 'is-top',
            type: 'is-danger'
          })
        })
    }
  }
}
</script>

<style>
#quill {
  /* height: 30vh; */
  /* padding-bottom: 7%; */
  background-color: white;
}

.center{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  text-align: center;
  border-radius: 20px;
}
</style>