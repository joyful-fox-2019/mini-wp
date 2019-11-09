<template>
  <div>
    <SigningPage @signed-in="signedIn = true" v-if="!signedIn"></SigningPage>
    <main v-else>
      <DashboardPage></DashboardPage>
    </main>
  </div>
</template>

<script>
import SigningPage from "./pages/SigningPage";
import DashboardPage from "./pages/DashboardPage";

import axios from "axios";
const http = axios.create({
  baseURL: "http://localhost:3000"
});

export default {
  components: {
    SigningPage,
    DashboardPage
  },
  data() {
    return {
      signedIn: false
    };
  },
  created() {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      http({
        method: "get",
        url: "user/status",
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