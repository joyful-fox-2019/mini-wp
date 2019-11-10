<template>
  <div>
    <Navbar :userLogin="userLogin"></Navbar>
    <div id="mainContent">
      <!-- <Sidebar id="test" :userLogin="userLogin" @logout="userLogout" @tag="articleByTag"></Sidebar> -->
      <Sidebar :userLogin="userLogin"></Sidebar>
      <!-- <Content :tag="tags" @removeTagSearch="removeTag" :query="query"></Content> -->
      <div id="content">
        {{profile.username}}
        {{profile.email}}
        <div id="myArticles" v-for="(article,i) in profile.articles" :key="i">
          <card :article="article" :creator="creator"></card> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "../../config/axios";
import Card from '../components/Card'

export default {
  components: {
    Navbar,
    Sidebar,
    Card
  },
  data() {
    return {
      userLogin: false,
      profile: {},
      creator: true
    };
  },
  methods: {
    getToken() {
      if (localStorage.getItem("token")) {
        this.userLogin = true;
      } else {
        this.userLogin = false;
      }
    },
    whoAmI() {
      let token = localStorage.getItem("token");
      axios({
        url: `/users/myprofile`,
        methods: "get",
        headers: {
          token
        }
      })
        .then(({ data }) => {
          this.profile = data;
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getToken();
    this.whoAmI();
  }
};
</script>

<style>
#mainContent {
  width: 100%;
  /* display: flex;
  flex-direction: row; */
}
#myArticles {
  width: 100%;
  margin: 10px;
  /* display: flex;
  flex-direction: column;
  word-wrap: break-word; */
}
#content{
  padding : 0px 20px !important;
  width: 100% !important
}
#eachCard{
  width: 100% !important
}
</style>