<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div
        class="col-3 px-1 bg-white position-fixed pt-3"
        id="sticky-sidebar"
        style="height: 100%; width: 200px;"
      >
        <a href class="nav-link">
          <i class="fas fa-desktop pr-3"></i>
          View Site
        </a>
        <a href class="nav-link">
          <i class="fas fa-chart-bar pr-4"></i>Stats
        </a>
        <a href class="nav-link">
          <i class="fas fa-history pr-4"></i>Activity
        </a>
        <h6 class="pt-4 text-secondary">Manage</h6>
        <a href class="nav-link">
          <i class="fas fa-sticky-note pr-4"></i>Site Pages
        </a>
        <a href class="nav-link">
          <i class="fas fa-align-left pr-4"></i>Blog Posts
        </a>
        <a href class="nav-link">
          <i class="fas fa-photo-video pr-4"></i>Media
        </a>
        <a href class="nav-link">
          <i class="fas fa-cloud-download-alt pr-4"></i>Import
        </a>
        <button class="btn btn-danger ml-5" v-on:click.prevent="signOut" style="margin-top: 100px;">
          Sign
          Out
        </button>
      </div>

      <div class="col-9 offset-3 mt-5" style="height: 400px; " id="mainArea">
        <!-- <h1>Main Area</h1>
        ...-->

        <div class="d-flex" style="height: 50px; width: 700px; background-color: white; ">
          <a href class="nav-link">
            <h6 class="pt-1 pl-5">Published</h6>
          </a>
          <a href class="nav-link">
            <h6 class="pt-1 pl-5">Drafts</h6>
          </a>

          <input
            type="text"
            v-model="search"
            class="ml-auto mt-1 mr-1"
            placeholder="Search title.."
            style="height: 40px;"
          />
          <!-- <a class="nav-link ml-auto pt-2"><i class="fas fa-search"></i></a> -->
        </div>

        <div class="articles">
          <div
            class="mt-5"
            style="height: 70px; width: 700px; background-color: white;"
            v-for="(article, i) in filteredList"
            :key="i"
          >
            <div class="d-flex">
              <img :src="article.img" />
              <h5 class="pl-3">
                <h3>{{article.title}}</h3>

                <small id="smallText" class="form-text text-muted">{{article.createdAt}}</small>
              </h5>

              <div class="ml-auto mt-2 mr-2">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-toggle="modal"
                  :data-target="'#halu' + article._id"
                  id="buttonArticle"
                >Read</button>
                <button
                  type="button"
                  class="btn btn-success"
                  data-toggle="modal"
                  :data-target="'#edit' + article._id"
                  id="buttonArticle"
                >Edit</button>
                <button
                  type="button"
                  class="btn btn-danger"
                  v-on:click="deleteArticle(article._id)"
                  id="buttonArticle"
                >Delete</button>

                <div
                  class="modal fade"
                  :id="'halu' + article._id"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLongTitle"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">{{article.title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div v-html="article.content" class="modal-body"></div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="modal fade"
                  :id="'edit' + article._id"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLongTitle"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Edit Article</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="form-group">
                            <label for="exampleInputTitle">title</label>
                            <input
                              type="text"
                              class="form-control"
                              aria-describedby="emailHelp"
                              v-model="editTitle"
                              placeholder="Enter Title"
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleFormControlTextarea1">Content</label>
                            <textarea
                              class="form-control"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              v-model="editContent"
                            ></textarea>
                          </div>
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-dismiss="modal"
                            v-on:click.prevent="updateArticle(article._id)"
                          >
                            Update
                            Article
                          </button>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editTitle: "",
      editContent: ""
    };
  },
  methods: {
    signOut() {
      Swal.fire({
        title: "Are you sure to signout ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
          localStorage.clear();
          this.$emit("signOutEvent");
        }
      });
    },
    deleteArticle(id) {
      Swal.fire({
        title: "Are you sure to Delete this article?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
          return axios({
            method: "delete",
            url: `http://34.87.110.250/article/${id}`,
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(response => {
              Swal.fire({
                title: "Success",
                text: "Article Deleted",
                icon: "success"
              });
              this.$emit("deleteEvent");
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    updateArticle(id) {
      axios({
        method: "put",
        url: `http://34.87.110.250/article/${id}`,
        data: {
          title: this.editTitle,
          content: this.editContent
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          Swal.fire({
            title: "Success",
            text: "Article Updated",
            icon: "success"
          });
          this.$emit("editEvent");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  props: ["filteredList", "search"]
};
</script>

<style scoped>
#buttonArticle {
  height: 40px;
  padding-right: 60px;
  margin-top: 7px;
}

img {
  width: 80px;
}
</style>