<template>
  <div class="main">
    <b-navbar class="post">
      <template slot="start">
        <p class="subtitle is-6">Post</p>
      </template>
      <template slot="end">
        <button @click="writePost" class="btn is-6">Add new post</button>
      </template>
    </b-navbar>
    <Card :article="detail"></Card>
  </div>
</template>


<script>
import axios from "axios";
import moment from "moment";

import Card from "../components/CardMyPost";

const host = 'https://mini-wp-aws.sigitariprasetyo.xyz'
// const host = "http://localhost:3000";

export default {
  name: "App",
  components: {
    Card
  },
  data() {
    return {
      detail: [],
      editPost: false
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
        this.$router.push("/");
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
    getArticle() {
      axios({
        method: "get",
        url: `${host}/article/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data: article }) => {
          this.detail = article;
        })
        .catch(err => {
          this.next(err);
        });
    },
    moment(date) {
      return moment(date).format("LLL");
    },
    writePost() {
      this.$router.push("/write-post");
    }
  },
  created() {
    this.getArticle();
  }
};
</script>
<style scoped>
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 2px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #006088;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #006088;
}
.main {
  height: 84vh;
  overflow: scroll;
  overflow-x: hidden;
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