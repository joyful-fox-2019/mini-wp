<template>
  <div>
    <LoginPage v-if="page==='loginPage'" :isLogin="isLogin" @login-success="loginSuccess"></LoginPage>
    <MainPage
      v-if="page==='mainPage'"
      :isLogin="isLogin"
      @show-write-page="showWritePage"
      @user-signout="userSignout"
      @edit-article="editArticle"
    ></MainPage>
    <WritePage
      v-if="page==='writePage'"
      :isLogin="isLogin"
      :isEdit="isEdit"
      :article="article"
      @show-write-page="showWritePage"
      @show-all-articles="showAllArticles"
      @user-signout="userSignout"
    ></WritePage>
  </div>
</template>

<script>
import LoginPage from "./views/LoginPage";
import MainPage from "./views/MainPage";
import WritePage from "./views/WritePage";

export default {
  name: "App",
  components: {
    LoginPage,
    MainPage,
    WritePage
  },
  data() {
    return {
      isLogin: false,
      page: "",
      article: {},
      isEdit: false
    };
  },
  methods: {
    loginSuccess() {
      this.isLogin = true;
      this.page = "mainPage";
    },
    showWritePage() {
      this.article = {};
      this.isEdit = false;
      this.page = "writePage";
    },
    showAllArticles() {
      this.page = "mainPage";
    },
    userSignout() {
      localStorage.clear();
      sessionStorage.clear();
      this.isLogin = false;
      this.page = "loginPage";
    },
    editArticle(data) {
      this.article = data;
      this.isEdit = true;
      this.page = "writePage";
    }
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.isLogin = true;
      this.page = "mainPage";
    } else {
      this.isLogin = false;
      this.page = "loginPage";
    }
  }
};
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>