<template>
  <section style="margin-top: 20px;">
    <b-navbar class="post">
      <template slot="start">
        <p class="title is-6">Edit your Article</p>
      </template>
      <template slot="end">
        <!-- <button @click="writePost" class="btn is-6">Add new post</button> -->
      </template>
    </b-navbar>
    <form class="form-input" enctype="multipart/form-data">
      <b-field label="Title">
        <b-input v-model="title"></b-input>
      </b-field>

      <b-field label="Add some tags">
        <b-taginput v-model="tag" ellipsis icon="label" placeholder="Add a tag"></b-taginput>
      </b-field>

      <b-field label="Article content">
        <wysiwyg class="content" v-model="content" />
      </b-field>

      <div class="file-upload">
        <img :src="data.url" alt="img" srcset class="img" />

        <b-field class="file">
          <b-upload v-model="file">
            <a class="button is-light">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload new image</span>
            </a>
          </b-upload>
          <span class="file-name" v-if="file">{{ file.name }}</span>
        </b-field>
      </div>
      <div class="buttons">
        <span @click.prevent="updateArticle(data._id)" class="button is-info">Update</span>
        <span
          @click.prevent="cancelUpdate(data._id, data.title)"
          class="button is-danger is-outlined"
        >Cancel</span>
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
  name: "EditArticle",
  data() {
    return {
      data: {},
      title: "",
      content: "",
      file: "",
      tag: [],
      isFullPage: true
    };
  },
  methods: {
    getArticle() {
      axios({
        method: "get",
        url: `${host}/article/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data: article }) => {
          this.data = article;
          this.title = article.title;
          this.content = article.content;
          this.tag = article.tag;
        })
        .catch(err => {
          this.next(err);
        });
    },
    updateArticle(id) {
      if (this.file == "") {
        var formData = {
          title: this.title,
          tag: this.tag,
          content: this.content
        };
      } else {
        var formData = new FormData();
        formData.append("image", this.file);
        formData.set("title", this.title);
        formData.set("tag", this.tag);
        formData.set("content", this.content);
      }
      axios({
        method: "patch",
        url: `${host}/${id}/update`,
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(() => {
          const loadingComponent = this.$buefy.loading.open({
            container: this.isFullPage ? null : this.$refs.element.$el
          });
          setTimeout(() => loadingComponent.close(), 1 * 2000);
          setTimeout(
            () =>
              this.$buefy.toast.open({
                message: "Update Article Success..",
                type: "is-success"
              }),
            2000
          );
          // setTimeout(() => this.$emit("afterUpdate", false), 1 * 1900);
          setTimeout(
            () =>
              this.$router.push(
                `/detail/${this.$route.params.id}/${this.$route.params.title}`
              ),
            1 * 1900
          );
        })
        .catch(({ response }) => {
          console.log(response);
          const loadingComponent = this.$buefy.loading.open({
            container: this.isFullPage ? null : this.$refs.element.$el
          });
          setTimeout(() => loadingComponent.close(), 1 * 2000);
          this.$buefy.toast.open({
            message: "Sorry your request is not complete..",
            type: "is-danger"
          });
        });
    },
    cancelUpdate(id, title) {
      this.$router.push(`/detail/${id}/${title.split(" ").join("-")}`);
    }
  },
  created() {
    this.getArticle();
  }
};
</script>
<style scoped>
.form-input {
  margin: 10px 23px 20px 25px;
}
.post {
  height: 20px;
  border: 2px solid #e9ebec !important;
  margin: 20px 20px 20px 20px;
}
.title {
  margin: auto 15px;
  padding: 0 10px;
}
.img {
  max-width: 100px;
}
.content {
  padding: 20px;
  background-color: #fff;
  min-height: 100px;
  max-height: 250px;
  overflow: scroll;
  overflow-x: hidden;
  margin-bottom: 20px;
}
.file-upload {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}
</style>
