<template>
  <section class="section container" id="writePage">
    <div class="d-flex flex-column flex-lg-row justify-content-between m-3 mb-4">
      <div class="w-100 w-lg-75">
        <h1 class="my-5">
          <input
            type="text"
            placeholder="Title"
            id="title"
            v-model="title"
            @focus="titleFocused = true"
            @blur="titleFocused = false"
          />
          <span class="d-block w-75" :class="{underline: !titleFocused, hardline: titleFocused}"></span>
        </h1>
      </div>
      <div class="d-flex flex-row flex-lg-column justify-content-lg-around w-lg-25" id="control">
        <button
          class="btn btn-success btn-lg-block"
          @click="post"
        >{{selectedArticle.status === 'posted' ? 'Update' : 'Post'}}</button>
        <button
          class="btn btn-primary btn-lg-block mx-3 mx-lg-0"
          v-if="selectedArticle.status !== 'posted'"
          @click="save"
        >Save</button>
        <button class="btn btn-danger btn-lg-block" @click="cancel('dashboard')">Cancel</button>
      </div>
    </div>
    <div id="quill-container"></div>
  </section>
</template>

<script>
import Quill from "quill";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000"
});

export default {
  props: ["selectedArticle"],
  data() {
    return {
      titleFocused: false,
      title: "",
      content: "",
      editor: null,
      modified: false
    };
  },
  methods: {
    post() {
      if (!this.title) {
        swal.fire("Warning", "Article title cannot empty!", "warning");
      } else if (this.selectedArticle.status) {
        http({
          method: "put",
          url: `articles/${this.selectedArticle._id}`,
          data: {
            title: this.title,
            content: this.content,
            status: "posted"
          },
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
          .then(({ data }) => {
            console.log(data.message);
            this.$emit("switch-page", "dashboard");
          })
          .catch(err => console.log(err));
      } else {
        http({
          method: "post",
          url: "articles",
          data: {
            title: this.title,
            content: this.content,
            status: "posted"
          },
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
          .then(({ data }) => {
            console.log(data.message);
            this.$emit("switch-page", "dashboard");
          })
          .catch(err => console.log(err));
      }
    },
    save() {
      if (!this.title) {
        swal.fire("Warning", "Article title cannot empty!", "warning");
      } else if (this.selectedArticle.status) {
        http({
          method: "put",
          url: `articles/${this.selectedArticle._id}`,
          data: {
            title: this.title,
            content: this.content,
            status: "draft"
          },
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
          .then(({ data }) => {
            console.log(data.message);
            this.$emit("switch-page", "dashboard");
          })
          .catch(err => console.log(err));
      } else {
        http({
          method: "post",
          url: "articles",
          data: {
            title: this.title,
            content: this.content,
            status: "draft"
          },
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        }).then(({ data }) => {
          console.log(data.message);
          this.$emit("switch-page", "dashboard");
        });
      }
    },
    cancel(page) {
      if (this.modified) {
        swal
          .fire({
            title: "Leaving editor?",
            text: "All unsaved changes will be lost.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Leave"
          })
          .then(result => {
            if (result.value) {
              this.$emit("switch-page", page);
            }
          });
      } else {
        this.$emit("switch-page", page);
      }
    },
    update() {
      if (this.content) {
        this.modified = true;
      }
      this.content = this.editor.getText() ? this.editor.root.innerHTML : "";
    },
    imgHandler() {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.onchange = () => {
        const file = input.files[0];
        console.log("User trying to uplaod this:", file);
        const data = new FormData();
        data.append("image", file);

        http({
          method: "post",
          url: "upload",
          data
        })
          .then(({ data }) => {
            const range = this.editor.getSelection();
            const link = `${data.link}`;
            this.editor.insertEmbed(range.index, "image", link);
          })
          .catch(err => console.log(err));
      };
    }
  },
  mounted() {
    this.editor = new Quill("#quill-container", {
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["image", "code-block"]
          ],
          handlers: {
            image: this.imgHandler
          }
        }
      },
      scrollingContainer: "#quill-container",
      placeholder: "Start your writing journey...",
      theme: "snow"
    });
    this.title = this.selectedArticle.title || "";
    this.editor.root.innerHTML = this.selectedArticle.content || "";

    this.editor.on("text-change", () => this.update());
  }
};
</script>

<style scoped>
#writePage {
  margin-top: 5rem;
  margin-bottom: 2rem;
  left: 50%;
  height: 115vh;
}

#title {
  outline: none;
  border: none;
  width: 75%;
}

.underline {
  border-top: 1px solid #e9ecef;
}

.hardline {
  border-top: 2px solid #a7a9aa;
}

#quill-container {
  /* height: 80vh; */
  height: calc(100% - 16rem);
}

#control button {
  margin-top: 0;
  min-width: 10rem;
}
</style>