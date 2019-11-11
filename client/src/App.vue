<template>
  <div id="app">
    <app-navbar @statusLogin="statusLogin" @createArticle="createArticle"></app-navbar>
    <app-homepage :statusLogin="status" :createArticle="article"></app-homepage>
  </div>
</template>

<script>
import Navbar from "./views/Navbar.vue";
import Homepage from "./views/HomePage.vue";

export default {
  name: "app",
  data() {
    return {
      status: false,
      article: false
    };
  },
  methods: {
    statusLogin(status) {
      this.status = status;
      console.log(this.status);
    },
    createArticle(status) {
      this.article = status;
    }
  },
  components: {
    "app-navbar": Navbar,
    "app-homepage": Homepage
  }
};
</script>

<style>
* {
  padding: 0%;
  margin: 0%;
}

body {
  font-family: "Poppins", sans-serif;
}
</style>
