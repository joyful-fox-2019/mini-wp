<template>
  <section class="container-fluid" id="mainPage">
    <section class="col-12 container section">
      <div class="d-flex flex-column w-75 mx-auto my-5">
        <div id="title">
          <h3>{{ siteName }}</h3>
          <p>My site description</p>
        </div>
        <form class="d-flex flex-wrap justify-content-end" @submit.prevent="searchArticle">
          <div class="form-group flex-grow-1 mr-md-3">
            <input class="form-control" type="search" placeholder="Search" v-model="searchQuery" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary" type="submit">Search Article</button>
          </div>
        </form>
        <div class="dropdown-divider"></div>
        <div class="card my-3" v-for="article in filteredArticles" :key="article._id">
          <div class="card-body">
            <div class="card-title d-flex justify-content-between my-0">
              <h3>
                <a
                  href
                  @click.prevent="viewArticle(article._id, article.status)"
                >{{ article.title }}</a>
              </h3>
              <small class="text-right">{{ article.status }}</small>
            </div>
            <small class="text-muted d-block mb-4">Last updated: {{ article.updated_at }}</small>
            <div
              v-html="article.content.slice(0, Math.min(article.content.indexOf('</p>'), article.content.indexOf('<img')))"
            ></div>
          </div>
          <div class="card-footer text-right">
            <button
              class="btn btn-danger btn-sm"
              @click="deleteArticle(article._id, article.status)"
            >{{article.status === 'deleted' ? 'Permanent Delete' : 'Delete'}}</button>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import axios from "axios";
import moment from "moment";
const http = axios.create({
  baseURL: "http://localhost:3000"
});

export default {
  props: ["section"],
  data() {
    return {
      articles: [],
      searchQuery: "",
      siteName: "aliftaufik"
    };
  },
  methods: {
    fetchData() {
      http({
        method: "get",
        url: "articles/user",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.articles = data.articles
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .map(article => {
              article.updated_at = moment(article.updated_at).fromNow();
              return article;
            });
        })
        .catch(err => console.log(err));
    },
    viewArticle(id, status) {
      const selectedArticle = this.articles.find(article => {
        return article._id === id;
      });
      this.$emit("view-article", selectedArticle);
    },
    deleteArticle(id, status) {
      if (status === "deleted") {
        swal
          .fire({
            title: "Permanent Deletion!",
            text: "This deletion is permanent and cannot be reverted!",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Leave"
          })
          .then(result => {
            if (result.value) {
              http({
                method: "delete",
                url: `articles/${id}`,
                headers: {
                  access_token: localStorage.getItem("access_token")
                }
              })
                .then(({ data }) => {
                  console.log(data.message);
                  swal.fire(
                    "Deleted",
                    "Your article has been permanently deleted."
                  );
                  this.fetchData();
                })
                .catch(err => console.log(err));
            }
          });
      } else {
        swal
          .fire({
            title: "Delete Article?",
            text:
              "This deletion is temporary. You can access this article or get it back from trash.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Leave"
          })
          .then(result => {
            if (result.value) {
              http({
                method: "patch",
                url: `articles/${id}`,
                headers: {
                  access_token: localStorage.getItem("access_token")
                }
              })
                .then(({ data }) => {
                  console.log(data.message);
                  this.articles.find(article => article._id === id).status =
                    "deleted";
                })
                .catch(err => console.log(err));
            }
          });
      }
    }
  },
  computed: {
    filteredArticles() {
      let filteredArticles;
      if (this.section === "all")
        filteredArticles = this.articles.filter(
          article => article.status !== "deleted"
        );
      else
        filteredArticles = this.articles.filter(
          article =>
            article.status ===
            (this.section === "trash" ? "deleted" : this.section)
        );
      const pattern = this.searchQuery
        .split("")
        .map(char => {
          return `(?=.*${char})`;
        })
        .join("");
      const regex = new RegExp(pattern, "gi");
      return filteredArticles.filter(article => regex.test(article.title));
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
#mainPage {
  position: absolute;
  right: 0.5rem;
  top: 3.5rem;
  width: calc(100vw - 18rem);
  overflow-x: hidden;
}
</style>