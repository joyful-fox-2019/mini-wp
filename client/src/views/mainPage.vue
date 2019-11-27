<template>
  <div>
    <navi-bar @switchCreate="createArticle" @setLogout="nowLogout"></navi-bar>
    <div class="d-flex" style="height: calc(100vh - 54px);">
      <left-bar></left-bar>
      <main-content @updateArticle="editArticle" v-if="!createMode && !editMode"></main-content>
      <new-article @switchMain="mainMode" v-if="createMode && !editMode"></new-article>
      <edit-article @backMain="backMode" :articleData="articleData" v-if="!createMode && editMode"></edit-article>
    </div>
  </div>
</template>

<script>
import naviBar from "../components/naviBar";
import leftBar from "../components/leftBar";
import mainContent from "../components/mainContent";
import newArticle from "../components/newArticle";
import editArticle from "../components/editArticle";
import axios from "axios";

export default {
  name: "mainPage",
  components: {
    naviBar,
    leftBar,
    mainContent,
    newArticle,
    editArticle
  },
  data() {
    return {
      createMode: false,
      editMode: false,
      articleData: null
    };
  },
  methods: {
    createArticle() {
      this.createMode = true;
      this.editMode = false;
    },
    mainMode() {
      this.createMode = false;
      this.editMode = false;
    },
    backMode() {
      this.editMode = false;
      this.createMode = false
    },
    editArticle(id) {
      console.log(`http://venus.sufrendo.com/articles/${id}`)
      this.createMode = false;
      this.editMode = true;
      axios({
        method: "get",
        url: `http://venus.sufrendo.com/articles/${id}`,
        headers:{
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.articleData = data
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    nowLogout(){
      this.$emit('nowLogout');
    }
  }
};
</script>

<style scoped>
</style>