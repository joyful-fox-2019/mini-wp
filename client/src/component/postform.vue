<template>
  <div class="hero body">
    <form enctype="multipart/form-data">
      <section class="container">
        <div class="title" style="display: flex; justify-content:center">
          <h1>add new articles!</h1>
        </div>
        <br />
        <br />
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
          <span class="file-name" v-if="featured_image">{{ featured_image.name }}</span>
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
          <b-button size="is-dark" icon-left @click.prevent="publish">publish</b-button>
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
  name: "Postform",
  data() {
    return {
      dropFiles: [],
      tags: [],
      title: "",
      content: "",
      featured_image: ""
    };
  },
  components: {
    Editor
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
    publish() {
      const formData = new FormData();
      formData.append("featured_image", this.featured_image);
      formData.set("title", this.title);
      formData.set("content", this.content);
      console.log(this.tags);

      this.tags.forEach(tag => {
        formData.append("tags", tag);
      });
      console.log(this.tags);
      axios({
        method: "post",
        url: "/articles",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$emit("createdpost");
          Swal({
            title: "uploading",
            allowEscapeKey: false,
            allowOutsideClick: false,
            timer: 2000,
            onOpen: () => {
              swal.showLoading();
            }
          }).then(
            () => {},
            dismiss => {
              if (dismiss === "timer") {
                console.log("closed by timer!!!!");
                swal({
                  title: "Finished!",
                  type: "success",
                  timer: 2000,
                  showConfirmButton: false
                });
              }
            }
          );
          Swal.fire({
            icon: "success",
            title: `Success publish a new article`,
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong.. " + response.data.message
          });
        });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=DM+Serif+Display|Roboto&display=swap");

.title {
  font-size: 30px;
  font-weight: bolder;
  font-family: "DM Serif Display", serif;
}
ss {
  font-size: 12px;
  font-family: "Roboto", sans-serif;
}
.container {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 0.5rem;
}
</style>