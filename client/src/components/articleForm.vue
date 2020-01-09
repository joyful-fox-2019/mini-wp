<template>
  <div class="create-zone">
    <div>
      <b-form @submit="creating">
        <b-form-group id="input-group-2" label="Your Title:" label-for="input-3">
          <b-form-input id="input-4" v-model="form.title" required placeholder="Enter title"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Your Content:" label-for="input-4">
          <quillEditor v-model="form.content" ref="myQuill"></quillEditor>
        </b-form-group>

        <div>
          <!-- Styled -->
          <b-form-file
            v-model="file"
            :state="Boolean(file)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
          <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
        </div>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: "",
        title: "",
        content: ""
      },
      file: null
    };
  },
  methods: {
    creating(evt) {
      evt.preventDefault();
      let formdata = new FormData();
      formdata.append("image", this.file);
      formdata.append("title", this.form.title);
      formdata.append("content", this.form.content);
      axios({
        url: "http://mini-wp-server.itsjoel.site/article/user",
        method: "POST",
        headers: {
          token: localStorage.getItem("token")
        },
        data: formdata
      })
        .then(({ data }) => {
          this.$emit("aftercreateart");
        })
        .catch(err => {
          this.$dlg.alert(
            "Please remember that title and content can't be empty",
            {
              messageType: "error"
            }
          );
        });
    }
  },
  components: {
    quillEditor
  }
};
</script>

<style>
</style>