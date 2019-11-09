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
            <p>{{ article.content }}</p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  props: ["section"],
  created() {}
};
</script>

<style>
</style>