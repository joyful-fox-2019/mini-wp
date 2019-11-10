<template>
  <section style="margin: 20px 40px 90px 20px;;">
    <h3 class="title">Write Your Article</h3>
    <form @submit.prevent="createArticle" enctype="multipart/form-data">
      <b-field label="Title">
        <b-input v-model="title"></b-input>
      </b-field>

      <b-field label="Article content">
        <wysiwyg class="content" v-model="content" />
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
        <span @click="createArticle(true)" class="button is-info">Publish</span>
        <span @click="createArticle(false)" class="button is-info">Add to Draft</span>
        <span @click="cancel" class="button is-danger is-outlined">Cancel</span>
      </div>
    </form>
  </section>
</template>

<script>
import "vue-wysiwyg/dist/vueWysiwyg.css";
import axios from "axios";
const host = "http://mini-wp-api.sigitariprasetyo.xyz";

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
    handleJwt() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      this.$router.push("/");
    },
    next(err) {
      if (err.response.status == 499) {
        this.handleJwt();
      } else {
        setTimeout(
          () =>
            this.$buefy.toast.open({
              message: err.response.data,
              type: "is-danger"
            }),
          500
        );
      }
    },
    createArticle(status) {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      const formData = new FormData();
      formData.append("image", this.file);
      formData.set("title", this.title);
      formData.set("tag", this.tag);
      formData.set("content", this.content);
      formData.set('publish', status)
      axios({
        method: "post",
        url: `http://localhost:3000/article`,

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
                message: "Create Article Success..",
                type: "is-success"
              }),
            2000
          );
          this.$router.push("/");
        })
        .catch(err => {
          this.next(err)
          setTimeout(() => loadingComponent.close(), 1 * 2000);
        })
    },
    cancel() {
      this.$emit("write", false);
      this.$router.push('/user-post')
    }
  }
};
</script>
<style scoped>
.content {
  padding: 20px;
  background-color: #fff;
  min-height: 150px;
  max-height: 250px;
  overflow: scroll;
  overflow-x: hidden;
  margin-bottom: 20px;
}
.file {
  margin-top: 35px;
}
.buttons {
  margin-bottom: 50px;
}
</style>