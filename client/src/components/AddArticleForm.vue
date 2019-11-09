<template>
  <div>
    <form @submit.prevent="addArticle" class="has-margin-t">
      <b-field>
        <b-input v-model="title" placeholder="Title"></b-input>
      </b-field>
      <b-field class="file">
          <b-upload v-model="file">
              <a class="button bg-surface t-standard">
                  <b-icon icon="upload"></b-icon>
                  <span>Upload Image</span>
              </a>
          </b-upload>
          <span class="file-name" v-if="file">
              {{ file.name }}
          </span>
      </b-field>
      <div>
      <wysiwyg v-model="description" />
      </div>
      <div class="has-margin-t">
        <b-field>
          <b-taginput
            v-model="tags"
            :data="filteredTags"
            autocomplete
            field="user.first_name"
            icon="label"
            placeholder="Add a topic"
            @typing="getFilteredTags">
            <template slot-scope="props">
              {{props.option}}
            </template>
            <template slot="empty">
              There are no items
            </template>
          </b-taginput>
        </b-field>
      </div>
      <button class="button bg-primary-gradient post-button" type="submit">
        <b-icon icon="plus-circle"></b-icon>
        <span>POST ARTICLE</span>
      </button>
    </form>
  </div>
</template>

<script>
const tagOptions = ['Art', 'Beauty', 'Books', 'Comics', 'Culture', 'Fiction', 'Film', 'Food', 'Gaming', 'Humor', 'Music', 'Photography', 'Sports', 'Style', 'Business', 'Economy', 'Work', 'Technology', 'Science', 'Religion']
import axios from '../../helpers/axios'

export default {
  name: 'AddArticleForm',
  data() {
    return {
      title: '',
      file: null,
      description: '',
      tags: [],
      filteredTags: []
    }
  },
  methods: {
    getFilteredTags(text) {
      this.filteredTags = tagOptions.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(text.toLowerCase()) >= 0
      })
    },
    addArticle() {
      let body = new FormData()
      body.append('title', this.title)
      body.append('file', this.file)
      body.append('description', this.description)
      body.append('tags', this.tags)
      const loadingComponent = this.$buefy.loading.open()
      axios.post('/articles', body, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          loadingComponent.close()
        })
        .catch(err => {
          loadingComponent.close()
          this.$emit('alert', err)
        })
    }
  }
}
</script>

<style scoped>
  .container {
  width: 70% !important;
  margin-top: 20px;
  }
  .post-button {
    margin-top: 20px;
    float: right;
  }
  .button {
    font-family: 'Yeseva One', cursive;
    font-weight: bold;
  }
  @media only screen and (max-width: 600px) {
    .container {
      width: 90% !important;
    }
  }
</style>