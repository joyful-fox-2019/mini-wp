<template>
  <div v-if="isLogin" class="write-page">
    <header>
      <Navbar :isLogin="isLogin" @show-write-page="showWritePage" @user-signout="userSignout"></Navbar>
    </header>
    <main>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-2 sidebar-div">
            <Sidebar @show-all-articles="showAllArticles"></Sidebar>
          </div>
          <div class="col-md-10 mt-3 miniwp-content" style="margin-left: 18vw">
            <div class="content-list ml-5" style="margin-top: 10vh; width: 80%;">
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    v-model.trim="title"
                    class="form-control"
                    id="inputPassword"
                    placeholder="Title"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Tags</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    v-model.trim="tags"
                    class="form-control"
                    id="inputPassword"
                    placeholder="Tags - separate with a comma, e.g. hacktiv,startup,coding,bootcamp"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Content</label>
                <div class="col-sm-10" style="height: calc(50vh + 2rem)">
                  <quill-editor
                    class="bg-white"
                    v-model="content"
                    ref="myQuillEditor"
                    style="height: 50vh;"
                  ></quill-editor>
                </div>
              </div>
              <div class="form-group row" style="margin-top: 6vh">
                <label for="inputPassword" class="col-sm-2 col-form-label">Featured Image</label>
                <div class="col-sm-10">
                  <div class="addphoto">
                    <img :src="imageLink" alt width="200" />
                    <div class="fileUpload white-btn btn width100 ml-3" style="margin-top: -5.5rem">
                      <span>Upload Your Featured Image</span>
                      <input @change="uploadImage" type="file" class="uploadlogo" accept="image/*" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row flex-row-reverse mb-5 mt-0 mr-5">
                <button
                  v-if="!isEdit"
                  @click.prevent="createArticle"
                  type="button"
                  class="btn btn-outline-dark"
                >Submit to Draft</button>
                <button
                  v-if="isEdit"
                  @click.prevent="editArticle(id)"
                  type="button"
                  class="btn btn-outline-dark"
                >Edit Article</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import axios from "axios";
import Swal from "sweetalert2";

const server = axios.create({
  baseURL: "http://localhost:3000"
});

export default {
  components: {
    Navbar,
    Sidebar,
    quillEditor
  },
  props: {
    isLogin: Boolean,
    article: Object,
    isEdit: Boolean
  },
  data() {
    return {
      title: "",
      tags: "",
      content: "",
      imageLink:
        "https://i2.wp.com/www.scribblesandcrumbs.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg?w=1170",
      img: "",
      id: ""
    };
  },
  methods: {
    uploadImage(event) {
      this.img = event.target.files[0];
      let bodyFormData = new FormData();
      if (this.img) {
        Swal.fire({
          title: "wait a minute to upload data",
          allowOutsideClick: () => !Swal.isLoading()
        });
        Swal.showLoading("Please wait..");
      } else {
        Swal.fire({
          icon: "error",
          title: "No Image Selected"
        });
      }
      bodyFormData.append("image", this.img);
      server({
        method: "post",
        url: "upload",
        data: bodyFormData,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.imageLink = data.link;
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "Image Uploaded"
          });
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    createArticle() {
      console.log(server)
      let tagsArr = this.tags.split(",");
      server({
        method: "post",
        url: "articles",
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          title: this.title,
          content: this.content,
          featuredImage: this.imageLink,
          tags: tagsArr
        }
      })
        .then(({ data }) => {
          this.showAllArticles();
        })
        .catch(({ response }) => {
          console.log(response.data.message);
        });
    },
    editArticle(id) {
      let tagsArr = [];
      if (typeof this.tags === "String") {
        tagsArr = this.tags.split(",");
      } else {
        tagsArr = this.tags;
      }
      server({
        method: "put",
        url: `articles/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          title: this.title,
          content: this.content,
          featuredImage: this.imageLink,
          tags: tagsArr
        }
      })
        .then(({ data }) => {
          this.showAllArticles();
        })
        .catch(({ response }) => {
          console.log(response.data.message);
        });
    },
    showAllArticles() {
      this.$emit("show-all-articles");
    },
    showWritePage() {
      this.title = "";
      this.tags = "";
      this.content = "";
      this.imageLink =
        "https://i2.wp.com/www.scribblesandcrumbs.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg?w=1170";
      this.id = "";
      this.$emit("show-write-page");
    },
    userSignout() {
      this.title = "";
      this.id = "";
      this.tags = "";
      this.content = "";
      this.$emit("user-signout");
    }
  },
  created() {
    if (Object.keys(this.article)[0]) {
      this.title = this.article.title;
      this.tags = this.article.tags;
      this.content = this.article.content;
      this.imageLink = this.article.featuredImage;
      this.id = this.article._id;
      this.isEdit = true;
    }
  }
};
</script>

<style scoped>
.write-page {
  background-color: white;
}
</style>