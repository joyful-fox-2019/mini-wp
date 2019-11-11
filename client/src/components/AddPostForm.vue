<template>
  <div id="add-post-form" class="row">
    <form class="container row valign center">
      <h4>Create a post</h4>
      <input 
        type="text" 
        v-model="quillTitle"
        placeholder="Title" />
      <div id="editor" ref="editor"></div>
      <br />

      <div class="input-container">
        <div class="feature-image-text">
          <h6>Upload an image: </h6>
        </div>
        <input type="file" name="file" @change="changeFile" ref="myFiles"/>
        <button
          class="post-submit-button col btn waves-effect waves-light black"
          type="submit"
          @click.prevent="getQuillValue"
        >Submit post</button>
      </div>

      <br />
      <br />
    </form>
  </div>
</template>

<script>
export default {
  name: "add-post-form",
  data() {
    return {
      imageToUpload: null,
      editor: null,
      quillTitle: ''
    };
  },
  mounted() {
    this.instantiateQuillEditor();
    console.log("ini updateArticle", this.updateArticle)
  },
  methods: {
    changeFile: function() {
      this.imageToUpload = this.$refs.myFiles.files[0]
    },
    instantiateQuillEditor: function() {
      this.editor = new Quill("#editor", {
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              ["link", "blockquote", "code-block", "image"],
              [{ list: "ordered" }, { list: "bullet" }]
            ]
          }
        },
        placeholder: "Start writing your thoughts...",
        theme: "snow"
      });
    },
    getQuillValue: function() {
      let title = this.quillTitle;
      let content = this.editor.root.innerHTML;
      let splitByHTML;

      if (content.includes("<img")) {
        splitByHTML = content.split(">");

        splitByHTML.forEach((el, i) => {
          if (el.includes("<img")) {
            let replaced = el.replace("<img", '<img class="responsive-img" ');
            splitByHTML[i] = replaced + ">";
          } else if (el.length != 0 && i !== splitByHTML.length - 1) {
            splitByHTML[i] = el + ">";
          }
        });
        content = splitByHTML.join("");
      }

      const access_token = localStorage.getItem("access_token");

      if (this.imageToUpload) {
        let imageUrl = ''
        let data = new FormData()
        data.append("image", this.imageToUpload)
  
        axios({
          method: "post",
          url: process.env.HOST_SERVER + '/articles/upload-single',
          data,
          headers: { access_token }
        })
          .then(({ data }) => {
            imageUrl = data
            // console.log("ini response", data);
            return axios({
              method: 'post',
              url: process.env.HOST_SERVER + '/articles',
              data: {
                title, content, imageUrl
              },
              headers: { access_token }
            })
          })
          .then(({ data }) => {
            M.toast({ html: data.message });
            this.quillTitle = "";
            this.editor.root.innerHTML = "";
            this.$emit('get-articles');
            this.$emit('article-submitted')
          })
          .catch(err => {
            M.toast({ html: err.message });
          })
      }
      else {
        axios({
              method: 'post',
              url: process.env.HOST_SERVER + '/articles',
              data: {
                title, content
              },
              headers: { access_token }
            })
          .then(({ data }) => {
            M.toast({ html: data.message });
            this.quillTitle = "";
            this.editor.root.innerHTML = "";
            this.$emit('get-articles');
            this.$emit('article-submitted')
          })
          .catch(err => {
            M.toast({ html: err.message });
          })
      }
    }
  }
};
</script>

<style>
</style>