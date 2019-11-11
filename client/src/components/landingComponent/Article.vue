<template>
  <div
    class="border d-flex flex-column bg-light col-9"
    v-bind:class="{'col-9' : !createNow, 'col-12': createNow}"
    style="height: 93vh; overflow: scroll;"
  >
    <div v-if="!createNow" id="landingPage" class="mt-5">
      <div class="container border" style="width: 70%; background-color: white;">
        <nav class="nav nav-pills nav-justified justify-content-center">
          <a class="nav-link ml-0" href="#">Published</a>
          <div
            style="background-color:whitesmoke; border: solid black 1px; border-radius: 100%; height: 20px; width: 20px; margin-top: 10px; margin-left: 0px;"
          >
            <p style="display: flex; justify-content: center;">{{countArticle}}</p>
          </div>
          <a class="nav-link" href="#">Draft</a>
          <form class="form-inline ml-auto">
            <input
              class="form-control ml-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style="width: 200px;"
            />
          </form>
          <a class="nav-link ml-0" href="#">
            <i class="fas fa-search fa-1x"></i>
          </a>
        </nav>
      </div>
      <div
        v-for="(article, i) in articles"
        :key="i"
        class="container border mt-3 d-flex"
        style="width: 70%; background-color: white;"
      >
        <div class="col d-flex-col">
          <div class="row mt-3">
            <h3>{{article.title}}</h3>
          </div>
          <div class="row">
            <p>{{article.created_at}}</p>
          </div>
          <div class="col d-flex mt-2">
            <p>{{article.content}}</p>
            <!-- <i class="fas fa-ellipsis-h mt-3 ml-auto"></i> -->
          </div>
        </div>
        <div class="col" style="display: flex; flex-direction: column; align-items: center;">
          <button
            @click="formUpdateArticle(article._id)"
            type="button"
            data-toggle="modal"
            data-target="#updateModal"
            class="btn btn-dark mt-4 ml-auto"
          >
            <i class="fas fa-pen-square"></i>
          </button>
          <button
            @click="deleteArticle(article._id)"
            type="button"
            class="btn btn-danger mt-4 ml-auto"
          >
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
    <!--modal update-->
    <div v-show="modalUpdate" class="modal" id="updateModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update Article</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="updateArticle">
              <div class="form-group">
                <label for="exampleInputTitle1">Title</label>
                <input
                  v-model="update.updateTitle"
                  type="text"
                  class="form-control"
                  id="title"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputContent1">Content</label>
                <input
                  v-model="update.updateContent"
                  type="text"
                  class="form-control"
                  id="content"
                  placeholder="Content"
                />
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Update</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!--end modal update-->
    <!--quil-->
    <createarticle-component v-if="createNow"></createarticle-component>
    <!--end quil-->
  </div>
</template>

<script>
const baseUrl = "http://localhost:3000";
import Swal from "sweetalert2";
import CreateArticle from "../createArticle/CreateArticle.vue";

export default {
  components: {
    "createarticle-component": CreateArticle
  },
  props: ["createNow"],
  data() {
    return {
      articles: [],
      update: {
        updateId: null,
        updateTitle: "",
        updateContent: "",
        updateCreated_at: ""
      },
      modalUpdate: false,
      countArticle: 0
    };
  },
  created() {
    this.showArticles();
  },
  methods: {
    showArticles() {
      Swal.showLoading();
      this.axios({
        method: "GET",
        url: baseUrl + "/articles/",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          Swal.close();
          data.forEach(element => {
            let newTime = this.getTime(element.created_at);
            element.created_at = `${newTime} ago`;
          });
          this.articles = data;
          this.countArticle = this.articles.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTime(date) {
      var seconds = Math.abs((new Date() - new Date(date)) / 1000);
      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    },
    deleteArticle(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.axios({
            method: "DELETE",
            url: baseUrl + `/articles/${id}`,
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(() => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.showArticles();
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    formUpdateArticle(id) {
      this.modalUpdate = true;
      let finded = this.articles.filter(element => {
        return element._id === id;
      });
      this.update.updateId = finded[0]._id;
      this.update.updateTitle = finded[0].title;
      this.update.updateContent = finded[0].content;
    },
    updateArticle() {
      let { updateId, updateTitle, updateContent } = this.update;

      this.axios({
        method: "PUT",
        url: baseUrl + `/articles/${updateId}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          updateTitle,
          updateContent
        }
      }).then(response => {
        this.update.updateTitle = "";
        this.update.updateContent = "";
        this.modalUpdate = false;
        $("#updateModal").modal("hide");
        this.showArticles();
      });
    }
  }
};
</script>

<style>
</style>