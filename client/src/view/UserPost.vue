<template>
  <div>
    <b-navbar class="nav-bar">
      <template slot="start">
        <b-navbar-item v-on:click="changePublish">
          Published
          <b-tag class="article-count" rounded>{{publish.length}}</b-tag>
        </b-navbar-item>
        <b-navbar-item v-on:click="changeDraft">
          Draft
          <b-tag class="article-count" rounded>{{draft.length}}</b-tag>
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
          <button @click="writePost" class="btn is-6">Add new post</button>
        </template>
      </b-navbar>
      <NotFound v-if="!publish.length"></NotFound>
      <div v-else v-for="article in publish" :key="article._id">
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
      <div v-else v-for="article in draft" :key="article._id">
        <MyPost :article="article"></MyPost>
      </div>
    </div>
  </div>
</template>

<script>
import NotFound from "../components/NotFound";
import MyPost from "../components/SlotMyPost";
import axios from "axios";

// const host = 'http://mini-wp-api.sigitariprasetyo.xyz'
const host = "http://localhost:3000";

export default {
  name: "UserPost",
  components: {
    NotFound,
    MyPost
  },
  data() {
    return {
      isFullPage: true,
      isPublish: true,
      draft: [],
      publish: [],
      id: null
    };
  },
  methods: {
    changeDraft() {
      this.isPublish = false;
    },
    changePublish() {
      this.isPublish = true;
    },
    writePost() {
      this.$router.push("/write-post");
    },
    getMyPost() {
      axios({
        method: "get",
        url: `${host}/article/user`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data: articles }) => {
          articles.forEach(el => {
            if (el.publish == true) {
              this.publish.push(el);
            } else {
              this.draft.push(el);
            }
          });
        })
        .catch(err => {
          this.next(err);
        });
    },
    autoPublish() {
      let id = this.draft[0]._id;
      axios({
        method: "patch",
        url: `${host}/article/${id}/update`,
        data: {
          publish: true
        },
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
                message: "Publish Article Success..",
                type: "is-success"
              }),
            2000
          );
          setTimeout(() => this.$router.push(`/`), 1 * 1900);
        })
        .catch(({ response }) => {
          const loadingComponent = this.$buefy.loading.open({
            container: this.isFullPage ? null : this.$refs.element.$el
          });
          setTimeout(() => loadingComponent.close(), 1 * 2000);
          this.$buefy.toast.open({
            message: "Sorry your request is not complete..",
            type: "is-danger"
          });
        });
    }
  },
  created() {
    this.getMyPost();
    let result = this.$crontab.addJob({
      name: "counter",
      interval: {
        seconds: "0",
        minutes: "34",
        hours: "2"
      },
      job: this.autoPublish
    });
  }
};
</script>
<style scoped>
.nav-bar {
  border: 2px solid #e9ebec !important;
  margin: 20px;
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