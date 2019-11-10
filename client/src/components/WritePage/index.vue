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
      <div class="d-flex flex-row flex-lg-column justify-content-lg-between w-lg-25" id="control">
        <button class="btn btn-success btn-lg-block" @click="post">Post</button>
        <button class="btn btn-primary btn-lg-block mx-3 mx-lg-0" @click="save">Save</button>
        <button class="btn btn-danger btn-lg-block" @click="cancel">Cancel</button>
      </div>
    </div>
    <div id="quill-container"></div>
    <!-- <QuillEditor v-model="content" id="quill-container"></QuillEditor> -->
  </section>
</template>

<script>
// import QuillEditor from "./QuillEditor";
import Quill from "quill";
import axios from "axios";
// import FormData from "form-data";

const http = axios.create({
  baseURL: "http://localhost:3000"
});

export default {
  data() {
    return {
      titleFocused: false,
      title: "",
      content: "",
      editor: null
    };
  },
  methods: {
    post() {
      if (!this.title) {
        swal.fire("Warning", "Article title cannot empty!", "warning");
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
        }).then(({ data }) => {
          console.log(data.message);
          this.$emit("switch-page", "dashboard");
        });
      }
    },
    save() {
      if (!this.title) {
        swal.fire("Warning", "Article title cannot empty!", "warning");
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
    cancel() {
      swal.fire("are you sure?");
    },
    update() {
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

        // this part the image is inserted
        // by 'image' option below, you just have to put src(link) of img here.
      };
    }
  },
  // computed: {
  //   computedContent: {
  //     get() {
  //       return this.content;
  //     },
  //     set(val) {
  //       this.content = val;
  //     }
  //   }
  // },
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