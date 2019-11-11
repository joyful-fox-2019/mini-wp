<template>
  <div class="hero body">
    <form enctype="multipart/form-data">
      <section class="container">
        <h1>update article</h1>
        <b-field label="Title">
          <b-input v-model="title"></b-input>
        </b-field>

        <b-field class="file">
          <b-upload v-model="featured_image">
            <a class="button is-warning">
              <b-icon icon="upload"></b-icon>
              <span>upload image</span>
            </a>
          </b-upload>
          <span
            class="file-name"
            v-if="featured_image"
          >{{ featured_image.name ? featured_image.name : featured_image.slice(44) }}</span>
        </b-field>
        <Editor
          api-key="hg7sq4gzacvq7ukek16rctkizscx637xwv6b3ji2y8m1mq83"
          cloud-channel="5-dev"
          :init="{plugins: 'wordcount'}"
          v-model="content"
        ></Editor>

        <b-field label="Tag">
          <b-taginput v-model="tags" type="is-dark"></b-taginput>
        </b-field>

        <b-field style="display: flex; justify-content: flex-end;">
          <b-button size="is-dark" icon-left @click.prevent="updateok">republish</b-button>
        </b-field>
      </section>
    </form>
  </div>
</template>


<script>
import axios from "../config/axios";
import Editor from "@tinymce/tinymce-vue";
import Swal from "sweetalert2";

export default {
  name: "Updateform",
  data() {
    return {
      dropFiles: [],
      tags: this.toupdate.tags,
      title: this.toupdate.title,
      content: this.toupdate.content,
      featured_image: this.toupdate.featured_image
    };
  },
  props: ["toupdate"],
  components: {
    Editor
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
    updateok() {
      console.log(this.toupdate._id);
      const formData = new FormData();
      formData.append("featured_image", this.featured_image);
      formData.set("title", this.title);
      formData.set("content", this.content);
      this.tags.forEach(tag => {
        formData.append("tag", tag);
      });
      console.log(formData);
      axios({
        method: "patch",
        url: `/articles/${this.toupdate._id}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(({ data }) => {
          this.$emit("updatedpost");
          Swal.fire({
            icon: "success",
            title: `Success posted a new article`,
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message
          });
        });
    }
  }
};
</script>

<style scoped>
.container {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 0.5rem;
}
</style>