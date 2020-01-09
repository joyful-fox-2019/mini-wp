<template>
  <div class="edit mt-4">
    <b-card :img-src="datafound[0].featured_image" img-alt="Card image" img-left class="mb-3 edit">
      <b-card-text>
        <b-form @submit="onSubmit">
          <b-form-group id="input-group-1" label="Title : " label-for="input-1">
            <b-form-input id="input-1" type="text" required v-model="title"></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Content :" label-for="input-2">
            <quillEditor ref="myQuill" id="input-2" v-model="content"></quillEditor>
          </b-form-group>

          <b-form-group id="input-group-3" label="Status :" label-for="input-3">
            <b-form-select id="input-3" :options="statusArr" required v-model="status"></b-form-select>
          </b-form-group>

          <b-form-file
            v-model="img"
            :state="Boolean(img)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
          <div class="mt-3">Selected file: {{ img ? img.name : '' }}</div>

          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-card-text>
    </b-card>
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
      statusArr: ["Draft", "Published"],
      title: this.datafound[0].title,
      content: this.datafound[0].content,
      status: this.datafound[0].status,
      id: this.datafound[0]._id,
      img: null
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let formdata = new FormData();
      if (this.img !== null) {
        formdata.append("image", this.img);
      } else {
        formdata.append("image", this.datafound[0].featured_image);
      }
      formdata.append("title", this.title);
      formdata.append("content", this.content);
      formdata.append("status", this.status);
      axios({
        url: `http://mini-wp-server.itsjoel.site/article/user/${this.id}`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        },
        data: formdata
      })
        .then(({ data }) => {
          this.$emit("backmysite", "mysite");
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
  props: {
    datafound: Array
  },
  components: {
    quillEditor
  }
};
</script>

<style>
.edit img {
  height: 487px !important;
  width: 200px !important;
}
</style>