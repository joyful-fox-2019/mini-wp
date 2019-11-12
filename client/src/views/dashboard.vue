<template>
  <div>
    <div class="hero-body">
      <Navbar @logout="logout" @createpost="addpost"></Navbar>
      <Welcome></Welcome>
      <div class="columns">
        <!-- sidebar -->
        <div class="column is-3" style="padding: 50px; padding-top:20;">
          <!-- <Navmenu></Navmenu> -->

          <!-- <img src="../../image/default.jpg" alt="not found" /> -->
          <img src="../../image/peopleilus.jpg" alt="not found" />
          <img src="../../image/mug.jpg" alt="not found" />
          <img src="../../image/productive.jpg" alt="not found" />
        </div>
        <!-- sidebar end -->

        <!-- main -->
        <div class="column is-9" style="padding:  40px 50px 90px 50px;">
          <!-- ARTICLES -->
          <div v-if="!createpost && !updatepoststatus">
            <Tabs @search="showArticles"></Tabs>
            <div class="container">
              <div>
                <!-- <div class="columns is-multiline" id="article"> -->
                <div id="article">
                  <Articles
                    v-for="(article, index ) in articles"
                    :key="index"
                    :articledata="article"
                    :name="name"
                    @deletedpost="removed"
                    @articleupdate="updatepost"
                  ></Articles>
                </div>
                <!-- </div> -->
              </div>
            </div>
          </div>
          <Postform v-if="createpost && !updatepoststatus" @createdpost="createdd"></Postform>
          <Updateform
            v-if="!createpost && updatepoststatus"
            @updatedpost="updatedd"
            :toupdate="dataupdate"
          ></Updateform>
        </div>
      </div>
    </div>
  </div>

  <!-- end main -->
</template>

<script>
import axios from "../config/axios";
import Navbar from "../component/Navbar";
import Welcome from "../component/Welcome";
import Navmenu from "../component/Navmenu";
import Tabs from "../component/Tabs";
import Articles from "../component/Articles";
import Postform from "../component/postform";
import Updateform from "../component/updateform";
import Swal from "sweetalert2";

export default {
  name: "dashboard",
  props: ["articledata", "isLogin", "name"],
  components: {
    Navbar,
    Welcome,
    Navmenu,
    Tabs,
    Articles,
    Postform,
    Updateform
  },
  data() {
    return {
      articles: [],
      createpost: false,
      updatepoststatus: false,
      dataupdate: null
    };
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
    showArticles(target) {
      console.log(`masuk ih`);
      if (!target) target = "";
      console.log(target);
      // console.log(localStorage.getItem("token"));
      console.log(`masuk`);
      axios({
        method: "get",
        url: `/articles?title=${target}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.articles = data;
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong.. \n" + response.data.message
          });
        });
    },
    addpost() {
      this.createpost = true;
    },
    updatepost(articledata) {
      this.dataupdate = articledata;
      console.log(articledata);
      this.updatepoststatus = true;
      this.createpost = false;
    },
    removed() {
      console.log(`removed`);
      this.showArticles();
    },
    createdd() {
      this.createpost = false;
      this.showArticles();
    },
    updatedd() {
      this.updatepoststatus = false;
      this.showArticles();
    }
  },
  watch: {
    isLogin(value) {
      if (value) {
        this.showArticles();
      }
    }
  },
  created() {
    if (this.isLogin) {
      this.showArticles();
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

* {
  font-family: "Montserrat", sans-serif;
}

@media only screen and (max-width: 600px) {
  .container {
    width: 90% !important;
  }
}
</style>