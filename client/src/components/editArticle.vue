<template>
  <div class="mt-2" style="width: 100%">
    <button @click="backMain" type="button" class="btn btn-secondary mb-2">Close</button>
    <button @click="editArticle" type="button" class="btn btn-primary mb-2">Submit</button>
    <input type="text" placeholder="title..." class="form-control mb-2" v-model="editTitle" />
    <b-field class="file">
      <b-upload v-model="articleData.feature_image">
        <a class="button is-warning">
          <b-icon icon="upload"></b-icon>
          <span>choose featured image</span>
        </a>
      </b-upload>
      <span class="file-name" v-if="articleData">{{ articleData.feature_image }}</span>
    </b-field>
    <wysiwyg v-model="articleData.content" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "editArticle",
  data() {
    return {
      editTitle: articleData.title
    };
  },
  props:['articleData'],
  methods: {
    backMain() {
      this.myHTML = "";
      this.myTitle = "";
      this.$emit("backMain");
    },
    publishArticle() {
      const title = this.myTitle;
      const content = this.myHTML;
      let formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("feature-image", this.myFile);

      axios({
        method: "post",
        url: "http://venus.sufrendo.com:3000/articles/",
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        },
        config: { headers: { "Content-Type": "multipart/form-data" } }
      })
      .then(({data})=>{
        console.log(data);
        this.switchMain();
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
};
</script>

<style scoped>
</style>