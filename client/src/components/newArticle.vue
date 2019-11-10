<template>
  <div class="mt-2" style="width: 100%">
    <button @click="switchMain" type="button" class="btn btn-secondary mb-2">Close</button>
    <button @click="publishArticle" type="button" class="btn btn-primary mb-2">Submit</button>
    <input type="text" placeholder="title..." class="form-control mb-2" v-model="myTitle" />
    <b-field class="file">
      <b-upload v-model="file">
        <a class="button is-warning">
          <b-icon icon="upload"></b-icon>
          <span>choose featured image</span>
        </a>
      </b-upload>
      <span class="file-name" v-if="file">{{ file.name }}</span>
    </b-field>
    <wysiwyg v-model="myHTML" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "newArticle",
  data() {
    return {
      myHTML: "",
      myTitle: "",
      file: ""
    };
  },
  methods: {
    switchMain() {
      this.myHTML = "";
      this.myTitle = "";
      this.file = "",
      this.$emit("switchMain");
    },
    publishArticle() {
      const title = this.myTitle;
      const content = this.myHTML;
      let formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("file", this.file);

      axios({
        method: "post",
        url: "http://localhost:3000/articles/",
        data: formData,
        headers: {
          token: "eyJhbGciOiJIUzI1NiJ9.NWRjODQ5MWQzNGU1MzY0ODkyMjU5NjNk.R8hqubB28oteALL0ygCAEJsT2PG47or0cr-p0OzlpIs"
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