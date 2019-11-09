<template>
  <div class="container">
    <form>
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
      <button class="button bg-primary-gradient post-button" type="submit">
        <b-icon icon="plus-circle"></b-icon>
        <span>POST ARTICLE</span>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      file: null,
      description: ''
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