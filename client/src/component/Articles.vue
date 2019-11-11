<template>
  <div class="columns is-multiline">
    <div class="column is-four-fifths">
      <div class="rows">
        <div class="row">
          <small class="has-text-grey-light">
            <i></i>
          </small>
        </div>
        <div class="row" style="display: flex; justify-content: space-between">
          <strong class="title">{{articledata.title}}</strong>
          <div v-if="user == articledata.author.name">
            <div class="buttons">
              <b-button
                type="is-dark"
                size="is-small"
                icon-pack="fas"
                icon-left="fas fa-trash-alt"
                @click.prevent="remove(articledata._id)"
              >delete</b-button>
              <b-button
                type="is-warning"
                size="is-small"
                icon-pack="far"
                icon-left="far fa-edit"
                @click.prevent="toupdate"
              >update</b-button>
            </div>
          </div>
        </div>
        <div class="row">
          <small class="has-text-grey content">{{articledata.content}}</small>
        </div>
        <br />
        <div class="row" style="display: flex; justify-content: flex-end">
          <small>
            <strong>{{articledata.author.name}}</strong>
          </small>
        </div>
        <div class="row" style="display: flex; justify-content: space-between">
          <div class="row" style="display: flex; justify-content: space-around-">
            <div v-for="(tag,i) in articledata.tags" :key="i">
              <span>
                <b-taglist attached>
                  <b-tag class="tagCard" style="background-color: #f1d6ab">{{ tag }}</b-tag>
                  <b-tag class="tagCard" style="background-color: #e3b04b" type="is-dark">{{ }}</b-tag>
                </b-taglist>
                <p></p>
              </span>
            </div>
          </div>

          <small class="has-text-grey-light">{{formatdate}}</small>
        </div>
      </div>
    </div>
    <div class="column">
      <figure class="image is-square">
        <img :src="articledata.featured_image" alt="not found" />
      </figure>
    </div>
  </div>
</template>

<script>
import { ToastProgrammatic as Toast } from "buefy";
import axios from "../config/axios";
import Swal from "sweetalert2";
import moment from "moment";

export default {
  name: "Articles",
  props: ["articledata"],
  data() {
    return {
      tags: article.tags,
      user: localStorage.getItem("name")
    };
  },
  methods: {
    remove(id) {
      axios({
        method: "delete",
        url: `/articles/${id}`
      })
        .then(({ data }) => {
          this.$emit("deletedpost");
          Swal.fire({
            icon: "success",
            title: `Success deleted the article`,
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong.. " + response.data.message
          });
        });
    },
    toupdate() {
      this.$emit("articleupdate", this.articledata);
    }
  },
  computed: {
    formatdate: function() {
      return moment(this.articledata.createdAt).fromNow();
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=DM+Serif+Display|Roboto&display=swap");

.title {
  font-size: 30px;
  font-weight: bolder;
  font-family: "DM Serif Display", serif;
}
.content {
  font-size: 12px;
  font-family: "Roboto", sans-serif;
}
img {
  border-right: solid 3px #f1d6ab;
  width: 500px !important;
}
@media only screen and (max-width: 600px) {
  .container {
    width: 90% !important;
  }
}
.tagCard {
  font-size: 9px;
  font-style: italic;
  background-color: rgba(94, 94, 94, 0.384);
  padding: 5px;
  border-radius: 3px;
  margin-right: 3px;
}
</style>