<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm">
        <div class="column mt-4">
          <div class="card mb-4" style="background-color : rgba(218, 216, 216, 0.198)">
            <div class="row">
              <div class="col-sm mr-5 mb-5 ml-5 mt-5">
                <div class="card mb-4">
                  <div class="card-body">
                    <input
                      type="text"
                      placeholder="Title..."
                      style="width : 100%; height: 40px"
                      v-model="inputTitle"
                    />
                  </div>
                </div>
                <div class="card mb-2">
                  <div class="card-body">
                    <wysiwyg v-model="inputContent"></wysiwyg>
                  </div>
                </div>

                <b-form-file v-model="image" class="mt-3" plain></b-form-file>
                <div class="mt-3">Selected file: {{ file2 ? file2.name : '' }}</div>

                <div class="card mb-4">
                  <div class="card-body">
                    <input
                      type="submit"
                      value="Publish your article"
                      style="width : 100%; height: 40px; background-color:rgba(37, 80, 149, 0.966); color:white"
                      v-on:click="createArticle"
                    />
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
const baseUrl = "http://localhost:3000";

export default {
  data() {
    return {
      inputTitle: "",
      inputContent: "",
      image: ""
    };
  },
  methods: {
    createArticle() {
      console.log(this.image);
      let fd = new FormData();
      fd.set("imgUrl", this.image);
      fd.set("title", this.inputTitle);
      fd.set("content", this.inputContent);

      this.axios({
        method: "POST",
        url: baseUrl + "/articles/",
        data: {
          title: this.inputTitle,
          content: this.inputContent,
          image: this.image
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(() => {
          this.inputTitle = "";
          this.inputContent = "";
          //   this.image = "";
          this.$emit("doneCreate", false);
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