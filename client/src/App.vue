<template>
  <div>
    <SigningPage @signed-in="signedIn = true" v-if="!signedIn"></SigningPage>
    <main v-else>
      <Navbar
        :page="page"
        @switch-page="switchPage"
        @signed-out="signedIn = false; page = 'dashboard'"
      ></Navbar>
      <DashboardPage v-if="page === 'dashboard'"></DashboardPage>
      <WritePage v-if="page === 'write'" @switch-page="switchPage"></WritePage>
    </main>
  </div>
</template>

<script>
import SigningPage from "./components/SigningPage";
import Navbar from "./components/Navbar";
import DashboardPage from "./components/DashboardPage";
import WritePage from "./components/WritePage";

import axios from "axios";
const http = axios.create({
  baseURL: "http://localhost:3000"
});

export default {
  components: {
    SigningPage,
    Navbar,
    DashboardPage,
    WritePage
  },
  data() {
    return {
      signedIn: false,
      page: "dashboard"
    };
  },
  methods: {
    switchPage(val) {
      this.page = val;
    }
  },
  created() {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      http({
        method: "get",
        url: "users/status",
        headers: {
          access_token
        }
      })
        .then(() => {
          this.signedIn = true;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>