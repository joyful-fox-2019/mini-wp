<template>
  <div class="card container mt-5 p-0" style="border-radius: 5px; height: 3rem">
    <div class="card-body d-flex justify-content-between p-0">
      <div class="navbar-menu container p-0 mx-0" style="width: 50vw">
        <a
          @click.prevent="showPublishedArticles"
          class="navbar-brand navbar-blog py-2 px-3"
          style="color: #245a72; cursor: pointer"
        >
          <span class="text-link">Published &nbsp;</span>
          <i class="fas fa-blog"></i>
        </a>
        <a
          @click.prevent="showDraftArticles"
          class="navbar-brand navbar-blog py-2 px-3"
          style="color: #245a72; margin-left: -1.3rem; cursor: pointer"
        >
          <span class="text-link">Draft &nbsp;</span>
          <i class="fab fa-firstdraft"></i>
        </a>
      </div>
      <div class="search-icon">
        <div class="form-inline mr-1" style="height: 100%;">
          <input
            @keydown.enter="searchArticles"
            v-model="query"
            type="search"
            class="form-control"
            placeholder="Search - title= javascript or tags= javascript,startup,coding (multiple tags)"
            aria-label="Search"
            style="width: 30vw"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  },
  methods : {
    showPublishedArticles() {
      this.$emit('show-published-articles')
    },
    showDraftArticles() {
      this.$emit('show-draft-articles')
    },
    searchArticles() {
      this.$emit('search-articles', this.query)
    }
  }
};
</script>

<style>
</style>