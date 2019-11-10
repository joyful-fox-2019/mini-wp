<template>
  <div>
    <div class="column">
      <div v-if="isPublic">
      </div>
      <div v-else>
        <div v-if="!editPost">
          <b-navbar class="nav-bar">
            <template slot="start">
              <b-navbar-item v-on:click="publish">
                Published
                <b-tag class="article-count" rounded>{{articles.length}}</b-tag>
              </b-navbar-item>
              <b-navbar-item v-on:click="changeDraft">
                Draft
                <b-tag class="article-count" rounded>0</b-tag>
              </b-navbar-item>
            </template>
            <template slot="end"></template>
          </b-navbar>

          <div v-if="isPublish">
            <b-navbar class="post">
              <template slot="start">
                <p class="subtitle is-6">Post</p>
              </template>
              <template slot="end">
                <button class="btn is-6">Add new post</button>
              </template>
            </b-navbar>
            <NotFound v-if="!articles.length"></NotFound>
            <div v-else v-for="article in articles" :key="article._id">
              <MyPost :article="article"></MyPost>
            </div>
          </div>
          <div v-else>
            <b-navbar class="post">
              <template slot="start">
                <p class="subtitle is-6">Draft</p>
              </template>
              <template slot="end">
                <button class="btn is-6">Add new post</button>
              </template>
            </b-navbar>
            <NotFound v-if="!draft.length"></NotFound>
          </div>
        </div>
        <div v-else>
          <div class="column">
            <EditArticle :article="article" @afterUpdate="afterUpdate" @cancelEdit="cancelEdit"></EditArticle>
          </div>
        </div>
      </div>
    </div>
    <ListEnd></ListEnd>
  </div>
</template>
<script>
import axios from "axios";
const host = "http://mini-wp-api.sigitariprasetyo.xyz";

import CardArticle from "./CardArticle.vue";
import CardMyPost from "./CardMyPost.vue";
import EditArticle from "./form/EditArticle.vue";
import MyPost from "./SlotMyPost";
import ListEnd from "./ListEnd";
import NotFound from "./NotFound";

export default {
  name: "Home",
  props: ["articles", "isPublic"],
  components: {
    CardArticle,
    CardMyPost,
    EditArticle,
    MyPost,
    ListEnd,
    NotFound
  },
  data() {
    return {
      article: [],
      draft: [],
      editPost: false,
      isPublish: true
    };
  },
  methods: {
    publish() {
      this.isPublish = true;
    },
    changeDraft() {
      this.isPublish = false;
    },
    deletePost(id) {
      this.$emit("deletePost", id);
    },
    updatePost(id) {
      axios({
        method: "get",
        url: `https://mini-wp-aws.sigitariprasetyo.xyz/article/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data: article }) => {
          this.article = article;
          this.editPost = true;
        })
        .catch(err => {
          setTimeout(
            () =>
              this.$buefy.toast.open({
                message: err.message,
                type: "is-danger"
              }),
            500
          );
        });
    },
    afterUpdate(e) {
      this.editPost = false;
      this.$emit("afterUpdate", e);
    },
    cancelEdit(e) {
      this.editPost = false;
    }
  },
  mounted() {
    this.isPublish;
  },
  created() {}
};
</script>
<style scoped>
.title {
  margin-top: 10px;
}
.nav-bar {
  border: 2px solid #e9ebec !important;
  margin: 20px;
}
.navbar-item:hover {
  border-bottom: 3px solid #006088 !important;
  border-radius: 1px !important;
}
.article-count {
  max-width: 3px;
  max-height: 20px;
  margin-left: 8px;
  margin-top: -5px;
  border-radius: 50%;
  border: 2px solid #d6d8da;
}
.post {
  height: 25px;
  border: 2px solid #e9ebec !important;
  margin: 20px 20px 0 20px;
}
.subtitle {
  margin: auto 15px;
  padding: 0 10px;
}
.btn {
  background-color: rgb(218, 42, 112);
  height: 30px;
  margin: auto 20px;
  color: white;
  border: 1px solid rgb(92, 92, 92);
  padding: 0 15px;
  border-radius: 3px;
}
.btn:hover {
  background-color: rgb(163, 32, 84);
}
</style>
