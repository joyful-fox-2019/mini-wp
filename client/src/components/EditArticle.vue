<template>
    <form method="post" enctype="multipart/form-data">
        <section>
            <h3 class="subtitle">Edit Article</h3>
            <b-field>
                <b-input placeholder="Title"
                    type="search"
                    icon="subtitles"
                    v-model="title">
                </b-input>
            </b-field>
            <b-field>
                <b-input placeholder="Author"
                    type="search"
                    icon="account-box"
                    v-model="author">
                </b-input>
            </b-field>
            <quillEditor v-model="content"></quillEditor>
        </section>
        <section style="margin-bottom:10px;">
            <b-field>
                <b-upload v-model="featured_image"
                    multiple
                    drag-drop>
                    <section class="section">
                        <div class="content has-text-centered">
                            <p>
                                <b-icon
                                    icon="upload"
                                    size="is-large">
                                </b-icon>
                            </p>
                            <p>Drop your featured image here or click to upload</p>
                        </div>
                    </section>
                </b-upload>
            </b-field>
            <div class="tags">
                <span v-for="(file, index) in featured_image"
                    :key="index"
                    class="tag is-primary" >
                    {{file.name}}
                    <button class="delete is-small"
                        type="button"
                        @click="deleteDropFile(index)">
                    </button>
                </span>
            </div>
        </section>
        <section>
            <b-field label="Article tags">
                <b-taginput
                    v-model="tags"
                    ellipsis
                    icon="label"
                    placeholder="Article tags">
                </b-taginput>
            </b-field>
        </section>
        <div class="field" style="display:flex; align-items:center; margin-top:20px;">
            Status :
            <b-switch v-model="status" type="is-success" style="margin-left:10px;">
            </b-switch>
        </div>
        <b-button @click.prevent="editArticle" class="edit-btn" type="is-info" id="edit-btn" style="margin-top:10px;">
            <i class="fas fa-paste" style="margin-right:10px;"></i>
            Update Article
        </b-button>
    </form>
</template>

<script>
    import axios from "../config/axios.js";
    import Swal from "sweetalert2";
    // require styles
    import "quill/dist/quill.core.css";
    import "quill/dist/quill.snow.css";
    import "quill/dist/quill.bubble.css";
    import { quillEditor } from "vue-quill-editor";

    export default {
        name: "EditArticle",
        data: function() {
            return {
                title: "",
                content: "",
                author: "",
                featured_image: [],
                tags: [],
                status: false
            };
        },
        props: {
            mainpage: String,
            modified: String
        },
        methods: {
            getArticle() {
                axios({
                    method: "GET",
                    url: `/articles/${this.modified}`,
                    headers: {
                        "jwt_token": localStorage.getItem("token")
                    }
                })
                .then((response) => {
                    this.title = response.data.title;
                    this.content = response.data.content;
                    this.author = response.data.author;
                    this.tags = response.data.tags;
                    this.status = response.data.status;
                })
                .catch((err) => {
                    this.changeMainPage("home");
                    this.danger(err.response.data.message);
                });
            },
            editArticle() {
                let formData = new FormData();
                formData.append("title", this.title);
                formData.append("author", this.author);
                formData.append("content", this.content);
                if (this.featured_image.length > 0) {
                    formData.append("featured_image", this.featured_image[0]);
                }
                formData.append("tags", this.tags);
                formData.append("status", this.status);
                axios({
                    method: "PUT",
                    url: `/articles/${this.modified}`,
                    data: formData,
                    headers: {
                        "jwt_token": localStorage.getItem("token")
                    }
                })
                .then((response) => {
                    this.changeMainPage("home");
                    this.success("Update successfully");
                })
                .catch((err) => {
                    if (Array.isArray(err.response.data.message)) {
                        this.danger(err.response.data.message.join(", "));
                    } else {
                        this.danger(err.response.data.message);
                    }
                });
            },
            deleteDropFile(index) {
                this.featured_image.splice(index, 1)
            },
            changeMainPage(mainpage) {
                this.$emit("change-main-page", mainpage);
            },
            switchStatus() {
                if (this.status === false) {
                    this.status = true;
                } else {
                    this.status = false;
                }
            },
            success(message) {
                this.$buefy.toast.open({
                    duration: 1500,
                    message: message,
                    position: "is-top-right",
                    type: "is-success"
                })
            },
            danger(message) {
                this.$buefy.toast.open({
                    duration: 1500,
                    message: message,
                    position: "is-top",
                    type: "is-danger"
                })
            }
        },
        created() {
            this.getArticle();
        },
        components: {
            quillEditor
        }
    }
</script>

<style lang="scss" scoped>
    .quill-editor, .quill-code {
        height: 20rem;
        margin-bottom: 100px;
    }
    .quill-editor {
        border: 1px solid #ccc;
        border-bottom: none;
    }
    .quill-code {
        border: none;
        height: auto;
        > code {
            width: 100%;
            margin: 0;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 0;
            height: 10rem;
            overflow-y: auto;
        }
    }
</style>
