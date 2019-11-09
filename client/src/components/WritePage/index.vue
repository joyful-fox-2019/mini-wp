<template>
  <section class="section container" id="writePage">
    <div class="d-flex flex-column flex-lg-row justify-content-between m-3 mb-4">
      <div class="w-75">
        <h1 class="my-5">
          <input
            type="text"
            placeholder="Title"
            id="title"
            v-model="title"
            @focus="focused = true"
            @blur="focused = false"
          />
          <span class="d-block w-75" :class="{underline: !focused, hardline: focused}"></span>
        </h1>
      </div>
      <div class="d-flex flex-row flex-lg-column justify-content-between border w-25" id="control">
        <button class="btn btn-success btn-block">Post</button>
        <button class="btn btn-info btn-block">Save</button>
        <button class="btn btn-danger btn-block">Cancel</button>
      </div>
    </div>
    <div id="quill-container"></div>
  </section>
</template>

<script>
import Quill from "quill";

export default {
  data() {
    return {
      title: "",
      focused: false,
      content: ""
    };
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
      placeholder: "Compose an epic...",
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
</style>