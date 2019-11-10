<template>
  <div class="sidebar">
    <div class="btn-group-vertical text-left" style="width: 100%">
      <div class="card container" style="border: none">
        <div class="card-body">
          <h6 class="card-title">{{`${username}.hacktivwp.com`}}</h6>
          <h5 class="card-subtitle mb-2 text-muted" style="font-size: 1.2rem">{{fullname}}</h5>
        </div>
      </div>
      <a
        type="button"
        @click.prevent="showAllArticles"
        class="btn-side btn btn-light"
        style="font-size: 1rem; width: 100%;"
      >
        <i class="fas fa-history ml-3 mr-2"></i>Activity
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullname: localStorage.getItem("name")
    };
  },
  methods: {
    showAllArticles() {
      this.$emit("show-all-articles");
    }
  },
  computed: {
    username() {
      return this.fullname
        .toLowerCase()
        .split(" ")
        .join("");
    }
  }
};
</script>

<style>
</style>