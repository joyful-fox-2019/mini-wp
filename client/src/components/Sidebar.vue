<template>
  <b-menu id="sidebar">
    <b-menu-list label="Menu">
      <b-menu-list>
        <div v-if="userLogin">
          <b-icon icon="account" size="is-small"></b-icon>Profile
          <b-menu-item label="My Articles" @click="myProfile"></b-menu-item>
          <b-menu-item label="Drafts" @click="myDrafts"></b-menu-item>
          <b-menu-item label="Bookmarks " @click="myBookmark"></b-menu-item>
        </div>
      </b-menu-list>
      <b-menu-list>
        Tags
        <b-taglist id="taglist" v-for="(tag,i) in tags" :key="i">
          <b-tag type="is-info" style="cursor:pointer">
            <div @click="findByTag(tag)">{{tag}}</div>
          </b-tag>
        </b-taglist>
      </b-menu-list>
    </b-menu-list>
    <b-menu-list label="Actions">
      <b-menu-item label="Logout" v-if="userLogin" @click="conLogout"></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
import axios from "../../config/axios";

export default {
  name: "sidebar",
  props: ["userLogin"],
  data() {
    return {
      isActive: true,
      tags: []
    };
  },
  methods: {
    userLeave() {
      this.$gAuth
        .signOut()
        .then(() => {
          this.$emit("logout");
          if (this.$router.currentRoute.name !== "home") {
              localStorage.clear()
            this.$router.push({ path: "/" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    this.$emit("logout");
      if (this.$router.currentRoute.name !== "home") {
          localStorage.clear()
        this.$router.push({ path: "/" });
      } else {
        localStorage.clear()
      }
    },
    getTags() {
      axios({
        url: "/articles/tags",
        methods: "get"
      })
        .then(({ data }) => {
          let allTags = [];
          data.forEach(element => {
            allTags.push(element.name);
          });
          this.tags = allTags;
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    findByTag(tag) {
      this.$emit("tag", tag);
    },
    myProfile() {
      if (this.$router.currentRoute.name !== "myarticle") {
        this.$router.push({ path: "/myarticle" });
      }
    },
    myDrafts() {
      if (this.$router.currentRoute.name !== "draft") {
        this.$router.push({ path: "/draft" });
      }
    },
    myBookmark() {
      if (this.$router.currentRoute.name !== "bookmark") {
        this.$router.push({ path: "/bookmark" });
      }
    },
    conLogout(){
      this.$buefy.dialog.confirm({
        title: 'Logout',
        message: 'Are you sure?',
        confirmText: 'Yes',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.userLeave()
      })
    }
  },
  created() {
    if (this.$router.currentRoute.name === "home") {
      this.getTags();
      }
  }
};
</script>

<style scoped>
#sidebar {
  /* position: fixed */
  height: 92vh;
  overflow: hidden;
}
.menu {
  width: 15%;
  font-size: 14px;
}
#taglist {
  margin: 3px 3px;
}
</style>