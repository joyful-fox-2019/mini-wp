<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm">
        <div class="column mt-4">
          <div class="card mb-4" style="background-color : rgba(218, 216, 216, 0.198)">
            <form v-on:submit.prevent="createArticle">
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
                  <div class="card mb-2 pl-4">
                    <b-form-file v-model="image" class="mt-3" plain></b-form-file>
                    <div class="mt-3">Selected file: {{ image ? image.name : '' }}</div>
                  </div>

                  <div class="card mb-4">
                    <div class="card-body">
                      <input
                        type="submit"
                        value="Publish your article"
                        style="width : 100%; height: 40px; background-color:rgba(37, 80, 149, 0.966); color:white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const baseUrl = "http://localhost:3000";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      inputTitle: "",
      inputContent: "",
      image: null
    };
  },
  methods: {
    createArticle() {
      console.log(this.image);
      const fd = new FormData();
      fd.append("title", this.inputTitle);
      fd.append("content", this.inputContent);
      fd.append("image", this.image);
      this.axios({
        method: "POST",
        url: baseUrl + "/articles",
        data: fd,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(respone => {
          this.inputTitle = "";
          this.inputContent = "";
          this.image = [];
          Swal.fire({
            icon: "success",
            title: "Create Article Successfully"
          });
          this.$emit("successCreate", false);
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Sorry,",
            text: err.response.data.errors.join(", ")
          });
        });
    }
  }
};
</script>

<style>
</style>