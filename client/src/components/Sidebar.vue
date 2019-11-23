<template>
  <div class="sidebar">
    <div class="btn-group-vertical text-left" style="width: 100%">
      <div class="card container" style="border: none">
        <div class="card-body">
          <h5 style="font-size: 1rem" class="card-title">{{`${username.slice(0,8)}.hacktivwp`}}</h5>
          <h5 class="card-subtitle mb-2 text-muted" style="font-size: 1.2rem">{{fullname}}</h5>
        </div>
      </div>
      <a
        @click.prevent="showAllArticles"
        class="btn-side btn btn-light"
        style="font-size: 1rem; width: 100%; cursor: pointer"
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
        [0]
    }
  }
};
</script>

<style>
</style>