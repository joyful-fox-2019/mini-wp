<template>
  <div style="width: 100%;">
    <div
      class="ml-auto flex-fill d-flex flex-column align-items-center"
      style="background: #f1f2f6; height: 100%"
    >
      <div
        class="d-flex align-items-center mt-4"
        style="width: 980px; height: 50px; background: white;"
      >
        <div class="px-3">Published</div>
        <div class="px-3">Drafts</div>
        <div class="px-3">Scheduled</div>
        <div class="px-3">Trashed</div>
        <div class="px-3 ml-auto">
          <form action>
            <input
              v-model="searchTitle"
              type="text"
              class="search"
              placeholder="Filter article by title..."
            />
          </form>
        </div>
      </div>
      <!-- ARTICLES -->
      <div class="mt-4" style="width: 980px; overflow: scroll;">
        <div v-for="(article, i) in filteredArticles" :key="i" class="card">
          <div class="card-body">
            <h5 class="card-title">{{article.title}}</h5>
            <img :src="article.featureImage" style="width: 300px" />
            <span v-html="article.content"></span>
            <div class="d-flex">
              <p class="card-text text-muted mr-auto">{{getReadableTime(article.createdAt)}}</p>
              <a
                @click="deleteArticle(article._id)"
                class="btn btn-danger mx-2"
                href="#"
                role="button"
              >
                <i class="far fa-trash-alt"></i> Delete
              </a>
              <a
                @click.prevent="updateArticle(article._id)"
                class="btn btn-primary mx-2"
                href="#"
                role="button"
              >
                <i class="far fa-edit"></i>
                Edit
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- MODAL -->
      <b-modal id="bv-modal-example<delete_me>" hide-footer>
        <template v-slot:modal-title>
          Using
          <code>$bvModal</code> Methods
        </template>
        <div class="d-block text-center">
          <h3>Hello From This Modal!</h3>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "mainContent",
  component: {},
  data() {
    return {
      articles: [],
      searchTitle: ''
    };
  },
  methods: {
    getArticles() {
      axios({
        method: "get",
        url: `http://venus.sufrendo.com/articles`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          if (!data.length) {
            this.articles = [];
          } else {
            this.articles = data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateArticle(id) {
      this.$emit("updateArticle", id);
    },
    deleteArticle(id) {
      axios({
        method: "delete",
        url: `http://venus.sufrendo.com/articles/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.getArticles();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getReadableTime(createdDate) {
      let time = Math.floor(
        (new Date().getTime() - new Date(createdDate).getTime()) / 86400000
      );
      return `${time} days ago`;
    }
  },
  computed: {
    filteredArticles: function() {
      if(!this.searchTitle){
        return this.articles
      }
      return this.articles.filter(article => article.title.includes(this.searchTitle))
    }
  },
  created() {
    this.getArticles();
  }
};
</script>

<style scoped>
</style>