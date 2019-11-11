<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top" style="background-color: #145474;">
      <button class="navbar-brand btn" onclick="home();">
        <img src="../img/wordpress.png" alt="chatIcon" width="40" height="35" class="mr-2 button" />
        My Sites
      </button>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link btn" href="#">
              <img
                src="../img/newspaper.png"
                alt="chatIcon"
                width="28"
                height="25"
                class="mr-2 button"
              />
              Reader
              <span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>

        <button
          class="btn btn-light mr-5"
          style=" color:#145474; width: 100px;"
          data-toggle="modal"
          data-target="#writeModalArticle"
        >
          <i class="far fa-edit"></i>
          Write
        </button>

        <a href="#" class="btn">
          <img
            src="../img/whiteChatIcon.png"
            alt="chatIcon"
            width="25"
            height="25"
            class="mr-2 button"
          />
        </a>
      </div>
    </nav>

    <div
      class="modal fade"
      id="writeModalArticle"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Write Article</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class style="width: 100%;">
              <!-- <div class="" style="height: 350px;" id="editor">
                                <h1>Edit Area</h1>
                                <p>Hello World!</p>
                                <p>Some initial <strong>bold</strong> text</p>
                                <p><br></p>
              </div>-->

              <form>
                <div class="form-group">
                  <label for="exampleInputTitle">title</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="emailHelp"
                    v-model="inputTitle"
                    placeholder="Enter Title"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">Content</label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    v-model="inputContent"
                  ></textarea>
                  <!-- <Vueditor id="editor" style="height: 300px"></Vueditor> -->
                </div>

                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  v-on:click.prevent="addArticle"
                >
                  add
                  Article
                </button>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      inputTitle: "",
      inputContent: "",
      inputUsername: "",
      myHTML: "",
      editor: ""
    };
  },
  methods: {
    handleFileEditor() {
      this.editor = this.$refs.file.files[0];
    },
    addArticle() {
      // let formData = new FormData();
      // formData.append("#editor", this.editor);
      // console.log(formData);
      axios({
        method: "post",
        url: "http://localhost:3000/article/",
        data: {
          title: this.inputTitle,
          content: this.inputContent
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          Swal.fire({
            title: "Success",
            text: "add article Success",
            icon: "success"
          });
          this.inputTitle = "";
          this.inputContent = "";
          this.$emit("addEvent");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>