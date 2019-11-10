<template>
  <section class="container-fluid" id="mainPage">
    <section class="col-12 container section">
      <div class="d-flex flex-column w-75 mx-auto mt-5">
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
        <div class="card my-3" v-for="article in filteredArticles" :key="article.id">
          <div class="card-body">
            <div class="card-title">
              <h3>
                {{ article.title }}
                <small>{{ article.status }}</small>
              </h3>
            </div>
            <small class="text-muted">{{ article.updated_at }}</small>
            <div v-html="article.content"></div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import axios from "axios";
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
  computed: {
    filteredArticles() {
      let filteredArticles;
      if (this.section === "all") filteredArticles = this.articles;
      else
        filteredArticles = this.articles.filter(
          article => article.status === this.section
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
    http({
      method: "get",
      url: "articles/user",
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .then(({ data }) => {
        this.articles = data.articles;
      })
      .catch(err => console.log(err));
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