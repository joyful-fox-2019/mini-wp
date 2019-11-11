<template>
  <div>
    <div class="home">
      <Navbar @home="home" @qSearch="qSearch"></Navbar>
      <div class="columns">
        <div v-if="!formLogin" class="column left-side is-one-fifth">
          <Sidebar
            :username="username"
            :isLogin="isLogin"
            @write="writeBtn"
            @login="loginBtn"
            @logout="afterLogout"
            @isPublic="ownPost"
            @home="home"
          ></Sidebar>
          <div>
            <Quote :quote="quote"></Quote>
          </div>
        </div>
        <div v-if="isHome" class="column main">
          <routerView :articles="articles" :isPublic="isPublic" @afterUpdate="afterUpdate"></routerView>
          <ListEnd></ListEnd>
        </div>
        <div v-if="isWrite" class="column">
          <WriteArticle @write="writeBtn" @afterWrite="afterWrite"></WriteArticle>
        </div>
      </div>

      <div class="coulmns is-half is-centered">
        <LoginForm v-if="formLogin" @login="afterLogin" class="is-half"></LoginForm>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import swal from "sweetalert2";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import WriteArticle from "./components/form/WriteArticle";
import LoginForm from "./components/form/LoginForm";
import Quote from "./components/Quotes.vue";
import ListEnd from "./components/ListEnd";

const host = 'https://mini-wp-aws.sigitariprasetyo.xyz'
// const host = "http://localhost:3000";

export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
    WriteArticle,
    LoginForm,
    Quote,
    ListEnd
  },
  data() {
    return {
      articles: [],
      isHome: true,
      isLogin: false,
      isWrite: false,
      formLogin: false,
      username: null,
      isPublic: true,
      isFullPage: true,
      quote: {}
    };
  },
  methods: {
    handleJwt() {
      this.$router.push("/");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      this.auth();
    },
    next(err) {
      if (err.response.status == 499) {
        this.handleJwt();
        this.auth();
      } else {
        setTimeout(
          () =>
            this.$buefy.toast.open({
              message: err.response.data,
              type: "is-danger"
            }),
          500
        );
      }
    },
    fetchArticle() {
      axios({
        method: "get",
        url: `${host}/article`,
        body: {
          publish: true
        }
      })
        .then(({ data: articles }) => {
          this.articles = articles;
        })
        .catch(err => {
          this.next(err);
        });
    },
    getQuote() {
      axios({
        method: "get",
        url: `https://api.quotable.io/random`
      })
        .then(({ data: quote }) => {
          this.quote = quote;
        })
        .catch(err => {
          this.next(err);
        });
    },
    qSearch(key) {
      axios({
        method: "get",
        url: `${host}/article/search?q=${key}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data: articles }) => {
          this.articles = articles;
          this.isHome = true;
        })
        .catch(err => {
          this.next(err);
        });
    },
    writeBtn(e) {
      if (e) {
        this.isWrite = e;
        this.isHome = false;
      } else {
        this.isWrite = e;
        this.isHome = true;
      }
    },
    afterWrite(e) {
      this.isWrite = e;
      this.isHome = true;
      this.isPublic = true;
      this.isWrite = false;
      this.fetchArticle();
    },
    loginBtn(e) {
      this.formLogin = e;
      this.isHome = false;
      this.isWrite = false;
    },
    afterLogin(e) {
      this.formLogin = false;
      this.isHome = e;
      this.auth();
    },
    afterLogout(e) {
      this.isHome = true;
      this.formLogin = e;
      this.articles = [];
      this.isPublic = true;
      this.auth();
      this.fetchArticle();
      setTimeout(
        () =>
          this.$buefy.toast.open({
            message: "Loged out Success, Thank you for your visit...",
            type: "is-danger"
          }),
        1000
      );
    },
    auth() {
      if (localStorage.getItem("token")) {
        this.isLogin = true;
        this.username = localStorage.getItem("username");
      } else {
        this.isLogin = false;
      }
    },
    home(e) {
      this.isHome = e;
      this.isPublic = true;
      this.isWrite = false;
      this.fetchArticle();
    },
    ownPost(e) {
      this.isPublic = false;
      this.isHome = true;
      this.isWrite = false;
    },
    afterUpdate(e) {
      this.isHome = true;
      this.isPublic = false;
      this.getMyPost();
    }
  },
  created() {
    this.fetchArticle();
    this.auth();
    this.getQuote();
  }
};
</script>
<style scoped>
.home {
  overflow: hidden;
  overflow-y: hidden;
}
.left-side {
  padding: 20px;
  padding-left: 30px;
  padding-top: 30px;
  height: 94vh;
  border-right: 2px solid #e9ebec;
}
.main {
  background-color: #f6f7f7;
}
</style>