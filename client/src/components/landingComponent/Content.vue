<template>
  <div v-if="statusLogin">
    <!--content-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-3 border d-flex flex-column p-0" style="height: 93vh; overflow: scroll;">
          <div class="menu" style="display: flex; flex-direction: column;">
            <div class="btn-group-vertical">
              <button type="button" class="btn btn-light d-flex">
                <i class="fas fa-desktop fa-1x mr-5"></i>View
                Site
              </button>
              <button type="button" class="btn btn-light d-flex">
                <i class="fas fa-signal fa-1x mr-5"></i>View
                Site
              </button>
              <button type="button" class="btn btn-light d-flex">
                <i class="fas fa-chart-line fa-1x mr-5"></i>Stats
              </button>
              <button type="button" class="btn btn-light d-flex">
                <i class="fas fa-spa fa-1x mr-5"></i>Plan
                <p class="ml-auto">Free</p>
              </button>
            </div>
          </div>
          <div class="d-flex my-3">
            <h4>Manage</h4>
          </div>
          <div class="menu" style="display: flex; flex-direction: column;">
            <div class="btn-group-vertical">
              <button type="button" class="btn btn-light d-flex">
                <i class="fas fa-file-alt fa-1x mr-5"></i>
                Site
                Pages
              </button>
              <button type="button" class="btn btn-light d-flex">
                <i class="fab fa-blogger fa-1x mr-5"></i>Blog
                Posts
                <a
                  href="#"
                  class="btn btn-outline-dark btn-md disabled m-0 p-0 ml-auto"
                  role="button"
                  aria-disabled="true"
                  style="width: 20%;"
                >Add</a>
              </button>
              <button type="button" class="btn btn-light d-flex">
                <i class="fas fa-photo-video fa-1x mr-5"></i>Media
                <a
                  href="#"
                  class="btn btn-outline-dark btn-md disabled m-0 p-0 ml-auto"
                  role="button"
                  aria-disabled="true"
                  style="width: 20%;"
                >Add</a>
              </button>
              <button type="button" class="btn btn-light d-flex">
                <i class="fas fa-comments fa-1x mr-5"></i>Comment
              </button>
              <button type="button" class="btn btn-light d-flex">
                <i class="fas fa-comment-alt fa-1x mr-5"></i>Feedback
                <a
                  href="#"
                  class="btn btn-outline-dark btn-md disabled m-0 p-0 ml-auto"
                  role="button"
                  aria-disabled="true"
                  style="width: 20%;"
                >Add</a>
              </button>
              <button type="button" class="btn btn-light d-flex">
                <i class="fas fa-plug fa-1x mr-5"></i>Plugin
                <a
                  href="#"
                  class="btn btn-outline-dark btn-md disabled m-0 p-0 ml-auto"
                  role="button"
                  aria-disabled="true"
                  style="width: 30%;"
                >Manage</a>
              </button>
              <button type="button" class="btn btn-light d-flex">
                <i class="fas fa-cloud-upload-alt fa-1x mr-5"></i>Import
              </button>
            </div>
          </div>
          <div class="d-flex my-3">
            <h4>Personalize</h4>
          </div>
          <div class="menu" style="display: flex; flex-direction: column;">
            <div class="btn-group-vertical">
              <button type="button" class="btn btn-light d-flex">
                <i class="fab fa-intercom fa-1x mr-5"></i>Customize
                <a
                  href="#"
                  class="btn btn-outline-dark btn-md disabled m-0 p-0 ml-auto"
                  role="button"
                  aria-disabled="true"
                  style="width: 30%;"
                >Themes</a>
              </button>
              <button type="button" class="btn btn-light d-flex">
                <i class="fab fa-blogger fa-1x mr-5"></i>Blog
                Posts
                <a
                  href="#"
                  class="btn btn-outline-dark btn-md disabled m-0 p-0 ml-auto"
                  role="button"
                  aria-disabled="true"
                  style="width: 20%;"
                >Add</a>
              </button>
              <button type="button" class="btn btn-light d-flex">
                <i class="fas fa-photo-video fa-1x mr-5"></i>Media
                <a
                  href="#"
                  class="btn btn-outline-dark btn-md disabled m-0 p-0 ml-auto"
                  role="button"
                  aria-disabled="true"
                  style="width: 20%;"
                >Add</a>
              </button>
              <button type="button" class="btn btn-light d-flex">
                <i class="fas fa-comments fa-1x mr-5"></i>Comment
              </button>
              <button type="button" class="btn btn-light d-flex">
                <i class="fas fa-comment-alt fa-1x mr-5"></i>Feedback
                <a
                  href="#"
                  class="btn btn-outline-dark btn-md disabled m-0 p-0 ml-auto"
                  role="button"
                  aria-disabled="true"
                  style="width: 20%;"
                >Add</a>
              </button>
              <button type="button" class="btn btn-light d-flex">
                <i class="fas fa-plug fa-1x mr-5"></i>Plugin
                <a
                  href="#"
                  class="btn btn-outline-dark btn-md disabled m-0 p-0 ml-auto"
                  role="button"
                  aria-disabled="true"
                  style="width: 30%;"
                >Manage</a>
              </button>
              <button type="button" class="btn btn-light d-flex">
                <i class="fas fa-cloud-upload-alt fa-1x mr-5"></i>Import
              </button>
            </div>
          </div>
        </div>
        <div
          class="border d-flex flex-column bg-light col-9"
          style="height: 93vh; overflow: scroll;"
        >
          <div id="landingPage" class="mt-5">
            <div class="container border" style="width: 70%; background-color: white;">
              <nav class="nav nav-pills nav-justified justify-content-center">
                <a class="nav-link ml-0" href="#">Published</a>
                <div
                  style="background-color:whitesmoke; border: solid black 1px; border-radius: 100%; height: 20px; width: 20px; margin-top: 10px; margin-left: 0px;"
                >
                  <p style="display: flex; justify-content: center;">{{countPost}}</p>
                </div>
                <a class="nav-link" href="#">Draft</a>

                <form class="form-inline">
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
              v-for-key="journey in post"
              class="container border mt-3 d-flex"
              style="width: 70%; background-color: white;"
            >
              <div class="col d-flex-col">
                <div class="row mt-3">
                  <h3>{{journey.title}}</h3>
                </div>
                <div class="row">
                  <p>{{journey.created_at}}</p>
                </div>
                <div class="col d-flex mt-2">
                  <p>{{journey.content}}</p>
                  <!-- <i class="fas fa-ellipsis-h mt-3 ml-auto"></i> -->
                </div>
              </div>
              <div class="col" style="display: flex; flex-direction: column; align-items: center;">
                <button
                  type="button"
                  data-toggle="modal"
                  data-target="#updateModal"
                  class="btn btn-dark mt-4 ml-auto"
                >
                  <i class="fas fa-pen-square"></i>
                </button>
                <button type="button" class="btn btn-danger mt-4 ml-auto">
                  <i class="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="formArticle">
            <createarticle-component @doneCreate="doneCreate"></createarticle-component>
          </div>
        </div>
      </div>
    </div>
    <!--modal update-->
    <div class="modal" id="updateModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update Article</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="exampleInputTitle1">Title</label>
                <input type="text" class="form-control" id="title" aria-describedby="emailHelp" />
              </div>
              <div class="form-group">
                <label for="exampleInputContent1">Content</label>
                <input type="text" class="form-control" id="content" placeholder="Content" />
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
    <!--end content-->
  </div>
</template>

<script>
const baseUrl = "http://localhost:3000";
import CreateArticle from "./CreateArticle.vue";

export default {
  name: "Content",
  props: ["statusLogin", "createArticle"],
  components: {
    "createarticle-component": CreateArticle
  },
  data() {
    return {
      post: [],
      createArticle: false,
      countPost: 0
    };
  },
  methods: {
    doneCreate(value) {
      this.createArticle = false;
    },
    showPost() {
      this.axios({
        method: "GET",
        url: baseUrl + "/articles/",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(({ data }) => {
        console.log(data);
        this.post = data;
      });
    }
  },
  created() {
    this.showPost();
  }
};
</script>

<style>
</style>