<template>
  <div v-if="isLogin" class="main-page">
    <header>
      <Navbar :isLogin="isLogin" @show-write-page="showWritePage" @user-signout="userSignout"></Navbar>
    </header>
    <main>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-2 sidebar-div">
            <Sidebar @show-all-articles="showAllArticles"></Sidebar>
          </div>
          <div class="col-md-10 mt-2 miniwp-content" style="margin-left: 15vw;">
            <Dashboard
              @show-published-articles="showPublishedArticles"
              @show-draft-articles="showDraftArticles"
              @search-articles="searchArticles"
            ></Dashboard>
            <div class="content-list mt-3">
              <ul class="list-unstyled" style="min-height: calc(80vh - 0.1rem);">
                <li class="mb-2" v-for="article in filteredArticles" :key="article.id">
                  <div class="card container px-0 py-2" style="border-radius: 5px;">
                    <div class="card-body d-flex justify-content-between py-0">
                      <div class="d-flex justify-content-start">
                        <div class="mt-1">
                          <img :src="article.featuredImage" alt height="120" width="120" />
                        </div>
                        <div class="card border-0">
                          <div class="card-body">
                            <h5 class="card-title">{{article.title}}</h5>
                            <h6 class="card-subtitle text-muted">
                              <div v-html="article.content"></div>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div class="navbar-brand navbar-blog text-right mt-1">
                        <h5
                          class="card-subtitle text-muted"
                        >{{new Date(article.createdAt) | moment("from") }}</h5>
                        <div class="mt-3">
                          <div class="container mt-3">
                            <div class="dropdown">
                              <button
                                class="btn btn-primary border-0"
                                type="button"
                                data-toggle="dropdown"
                                style="background-color: white; color: #245a72"
                              >
                                <i class="fa fa-ellipsis-v"></i>
                              </button>
                              <ul class="dropdown-menu p-2">
                                <li>
                                  <a
                                    @click.prevent="editArticle(article._id)"
                                    type="button"
                                    class="ml-2"
                                    style="color: #245a72"
                                  >
                                    <i class="fas fa-pen-nib"></i>&nbsp; Edit Article
                                  </a>
                                </li>
                                <li>
                                  <a
                                    @click.prevent="deleteArticle(article._id)"
                                    type="button"
                                    class="ml-2"
                                    style="color: #245a72"
                                  >
                                    <i class="far fa-trash-alt"></i>&nbsp; Delete Article
                                  </a>
                                </li>
                                <li>
                                  <a
                                    @click.prevent="publishArticle(article._id)"
                                    v-if="!article.isActive"
                                    type="button"
                                    class="ml-2"
                                    style="color: #245a72"
                                  >
                                    <i class="fas fa-newspaper"></i>&nbsp; Publish Article
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <h6 class="card-subtitle text-muted mt-3">{{article.tags.join(', ')}}</h6>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

const server = axios.create({
  baseURL: "http://35.197.134.160"
});

export default {
  components: {
    Navbar,
    Sidebar,
    Dashboard
  },
  props: {
    isLogin: Boolean
  },
  data() {
    return {
      articles: [],
      filteredArticles: []
    };
  },
  methods: {
    showWritePage() {
      this.$emit("show-write-page");
    },
    userSignout() {
      this.articles = [];
      this.filteredArticles = [];
      this.$emit("user-signout");
    },
    getArticles() {
      server({
        method: "get",
        url: "articles",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.articles = data;
          this.filteredArticles = this.articles;
        })
        .catch(({ response }) => {
          console.log(response.data.message);
        });
    },
    showAllArticles() {
      this.getArticles();
      this.filteredArticles = this.articles;
    },
    showPublishedArticles() {
      this.filteredArticles = [];
      for (let i = 0; i < this.articles.length; i++) {
        if (this.articles[i].isActive) {
          this.filteredArticles.push(this.articles[i]);
        }
      }
    },
    showDraftArticles() {
      this.filteredArticles = [];
      for (let i = 0; i < this.articles.length; i++) {
        if (!this.articles[i].isActive) {
          this.filteredArticles.push(this.articles[i]);
        }
      }
    },
    searchArticles(query) {
      console.log(query);
      let search = "";
      let queries = query.split(" ");
      if (queries[0] === "title=" || queries[0] === "tags=") {
        if (queries[0] === "title=") {
          search = `title=${queries[1]}`;
        } else if (queries[0] === "tags=") {
          let crits = queries[1].split(",");
          search = `tags[0]=${crits[0]}`;
          for (let i = 1; i < crits.length; i++) {
            search += `&tags[${i}]=${crits[i]}`;
          }
        }
        server({
          method: "get",
          url: `articles/q?${search}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
          .then(({ data }) => {
            this.filteredArticles = data;
          })
          .catch(({ response }) => {
            console.log(response.data.message);
          });
      }
    },
    editArticle(id) {
      server({
        method: "get",
        url: `articles/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.$emit("edit-article", data);
        })
        .catch(({ response }) => {
          console.log(response.data.message);
        });
    },
    publishArticle(id) {
      server({
        method: "patch",
        url: `articles/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.showAllArticles();
        })
        .catch(({ response }) => {
          console.log(response.data.message);
        });
    },
    deleteArticle(id) {
      Swal.fire({
        title: "Delete",
        text: "Do you want to delete this article?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      }).then(() => {
        server({
          method: "delete",
          url: `articles/${id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
          .then(({ data }) => {
            this.showAllArticles();
          })
          .catch(({ response }) => {
            console.log(response.data.message);
          });
      });
    }
  },
  created() {
    this.getArticles();
  },
  watch: {
    isLogin(value) {
      if (!value) {
        this.articles = [];
        this.filteredArticles = [];
      }
    }
  }
};
</script>

<style scoped>
.main-page {
  background-color: #dde7ee;
}
</style>