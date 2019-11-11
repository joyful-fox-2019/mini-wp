<template>
  <section style="margin: 20px 40px 20px 20px;;">
    <h3 class="title">Write Your Article</h3>
    <form @submit.prevent="createArticle" enctype="multipart/form-data">
      <b-field label="Title">
        <wysiwyg style="height: 100px;" placeholder="Title" v-model="title">
      </b-field>

      <b-field label="Article content">
        <wysiwyg style="min-height: 180px;" v-model="content" />
      </b-field>

      <b-field label="Add some tags">
        <b-taginput v-model="tag" ellipsis icon="label" placeholder="Add a tag"></b-taginput>
      </b-field>
      <b>Tags:</b>
      <b-tag style="margin: 2px;" rounded v-for="(item, index) in tag" :key="index">{{ item }}</b-tag>

      <b-field class="file">
        <b-upload v-model="file">
          <a class="button is-light">
            <b-icon icon="upload"></b-icon>
            <span>Click to upload</span>
          </a>
        </b-upload>
        <span class="file-name" v-if="file">{{ file.name }}</span>
      </b-field>

      <div class="buttons">
        <span @click="createArticle" class="button is-info">Publish</span>
        <span @click="cancel" class="button is-danger is-outlined">Cancel</span>
      </div>
    </form>
  </section>
</template>

<script>
import "vue-wysiwyg/dist/vueWysiwyg.css";
import axios from "axios";
const host = "https://mini-wp-aws.sigitariprasetyo.xyz";
// const host = "http://localhost:3000";

export default {
  name: "WriteArticle",
  data() {
    return {
      title: "",
      content: "",
      tag: [],
      file: null,
      isFullPage: true
    };
  },
  methods: {
    createArticle() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      const formData = new FormData();
      formData.append("image", this.file);
      formData.set("title", this.title);
      formData.set("tag", this.tag);
      formData.set("content", this.content);
      axios({
        method: "post",
        url: `${host}/article`,
        data: formData,
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data"
        }
      })
        .then(() => {
          setTimeout(() => loadingComponent.close(), 1 * 2000);
          setTimeout(
            () =>
              this.$buefy.toast.open({
                message: "Publish Article Success..",
                type: "is-success"
              }),
            2000
          );
          setTimeout(() => this.$emit("afterWrite", false), 1 * 1900);
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 2000);
          setTimeout(
            () =>
              this.$buefy.toast.open({
                message: "Sorry your request is not complete..",
                type: "is-danger"
              }),
            1 * 2000
          );
        });
    },
    cancel() {
      this.$emit("write", false);
    }
  }
};
</script>
