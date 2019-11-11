<template>
  <div>
    <navBar @addEvent="addEvent"></navBar>
    <container
      :filteredList="filteredList"
      :search="search"
      @signOutEvent="signOutEvent"
      @deleteEvent="deleteEvent"
      @editEvent="editEvent"
    ></container>
  </div>
</template>

<script>
import axios from "axios";
import navBar from "../components/navBar";
import container from "../components/container";

export default {
  data() {
    return {
      articles: [],
      search: ""
    };
  },
  methods: {
    getData() {
      axios({
        method: "get",
        url: "http://localhost:3000/article",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            let date = new Date(response.data[i].createdAt);
            let formated = date.toString().slice(0, 15);
            response.data[i].createdAt = formated;
          }
          this.articles = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    addEvent() {
      this.getData();
    },
    signOutEvent() {
      this.$emit("signOutEvent");
    },
    deleteEvent() {
      this.getData();
    },
    editEvent() {
      this.getData();
    }
  },
  components: {
    navBar,
    container
  },
  computed: {
    filteredList() {
      return this.articles.filter(value => {
        return value.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },

  created() {
    this.getData();
    console.log("Created Trigerred");
  }
};
</script>

<style>
</style>