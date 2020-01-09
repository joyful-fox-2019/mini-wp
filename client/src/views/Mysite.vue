<template>
  <div class="container-fluid">
    <div class="row">
      <Sidebar
        @draftsection="filteredshow"
        @publishsection="filteredshow"
        @allsection="filteredshow"
      ></Sidebar>
      <div class="col-md-10 mt-4">
        <Post
          v-for="article in showFilter"
          :key="article._id"
          :user="article.author.full_name"
          :date="article.created_at"
          :image="article.featured_image"
          :title="article.title"
          :content="article.content"
          :status="article.status"
          :id="article._id"
          :page="'mysite'"
          @removecontent="destroycontent"
          @editarticle="editmyarticle"
        ></Post>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/sidebar";
import Post from "../components/post";
import axios from "axios";

export default {
  data() {
    return {
      mySite: [],
      keyword: ""
    };
  },
  methods: {
    getData() {
      axios({
        url: "http://mini-wp-server.itsjoel.site/article/user",
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.mySite = data.reverse();
        })
        .catch(err => {
          this.$dlg.alert("Sorry we can't find the data that you want", {
            messageType: "error"
          });
        });
    },
    destroycontent(id) {
      axios({
        url: `http://mini-wp-server.itsjoel.site/article/user/${id}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$dlg.toast("Data deleted", {
            messageType: "success"
          });
          this.getData();
        })
        .catch(err => {
          this.$dlg.alert("Oops ! an error occurred,please try again later", {
            messageType: "error"
          });
        });
    },
    editmyarticle(id) {
      let found = this.mySite.filter(item => {
        return item._id === id;
      });
      this.$emit("editfile", "edit", found);
    },
    filteredshow(arg) {
      this.keyword = arg;
    }
  },
  computed: {
    showFilter() {
      if (this.keyword) {
        return this.mySite.filter(item => {
          return item.status === this.keyword;
        });
      } else {
        return this.mySite;
      }
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.getData();
    }
  },
  components: {
    Sidebar,
    Post
  }
};
</script>

<style>
.col-md-10 {
  height: calc(100vh - 40px - 40px);
  overflow: scroll;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
</style>