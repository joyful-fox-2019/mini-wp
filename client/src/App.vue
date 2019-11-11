<template>
  <div id="app">
    <app-navbar @statusLogin="statusLogin" @createNow="createNow"></app-navbar>
    <app-homepage :statusLogin="status" :createNow="createArticle" @successCreate="successCreate"></app-homepage>
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
      createArticle: false
    };
  },
  methods: {
    statusLogin(status) {
      this.status = status;
    },
    createNow(value) {
      this.createArticle = value;
    },
    successCreate(value) {
      this.createArticle = value;
    }
  },
  components: {
    "app-navbar": Navbar,
    "app-homepage": Homepage
  },
  created() {
    if (localStorage.getItem("token")) this.status = true;
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
