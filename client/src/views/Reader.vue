<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 mt-4">
        <Post
          v-for="article in filteredList"
          :key="article._id"
          :user="article.author.full_name"
          :date="article.created_at"
          :image="article.featured_image"
          :title="article.title"
          :content="article.content"
          :status="article.status"
          :page="'reader'"
        ></Post>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Post from "../components/post";

export default {
  data() {
    return {
      published: []
    };
  },
  props: {
    keywordfile: String
  },
  methods: {
    getAllPublished() {
      axios({
        url: "http://mini-wp-server.itsjoel.site/article/",
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.published = data;
        })
        .catch(err => {
          this.$dlg.alert(
            "Sorry,an error occured,you might want to comeback again later ",
            {
              messageType: "error"
            }
          );
        });
    }
  },
  computed: {
    filteredList() {
      if (this.keywordfile) {
        return this.published.filter(item => {
          return item.title === this.keywordfile;
        });
      } else {
        return this.published;
      }
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.getAllPublished();
    }
  },
  components: {
    Post
  }
};
</script>

<style>
.col-md-12 {
  height: calc(100vh - 40px - 40px);
  overflow: scroll;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
</style>