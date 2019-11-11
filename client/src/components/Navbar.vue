<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" @click="home">
          <i class="fab fa-wordpress fa-2x"></i> &nbsp;&nbsp;
          <h2>
            <b>SAP-MiniPress</b>
          </h2>
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-end">
        <Search @qSearch="qSearch"></Search>
      </div>
    </nav>
  </div>
</template>

<script>
import Search from "./Search";

export default {
  name: "Navbar",
  components: {
    Search
  },
  methods: {
    home() {
      this.$emit("home", true);
    },
    qSearch(key) {
      this.$emit("qSearch", key);
    }
  }
};
</script>
<style scoped>
.navbar {
  background-color: #006088 !important;
}
.navbar-item {
  color: white !important;
}
.navbar-item:hover {
  background-color: #002c40 !important;
  color: white !important;
}
</style>