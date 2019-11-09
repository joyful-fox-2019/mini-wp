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
  </section>
</template>

<script>
import Quill from "quill";
import axios from "axios";
const http = axios.create({
  baseURL: "http://localhost:3000"
});

export default {
  data() {
    return {
      title: "",
      content: "",
      titleFocused: false
    };
  },
  methods: {
    post() {
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
    },
    save() {},
    cancel() {}
  },
  mounted() {
    var quill = new Quill("#quill-container", {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "code-block"]
        ]
      },
      scrollingContainer: "#quill-container",
      placeholder: "Start your writing journey...",
      theme: "snow"
    });
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