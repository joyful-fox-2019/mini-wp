<template>
  <div>
    <div class="card" style="overflow: hidden;">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <div class="buttons is-right" style="position: absolute; right: 10px; top: 10px;">
              <b-tooltip label="Publish" position="is-bottom" v-if="!article.publish">
                <b-button
                  size="is-small"
                  @click="publish(article._id)"
                  icon-left="upload"
                  native-type="submit"
                  type="is-info is-outlined"
                ></b-button>
              </b-tooltip>
              <b-tooltip label="Edit" position="is-bottom">
                <b-button
                  size="is-small"
                  @click="updatePost(article._id)"
                  icon-left="pencil"
                  native-type="submit"
                  type="is-info is-outlined"
                ></b-button>
              </b-tooltip>
              <b-tooltip label="Delete" position="is-bottom">
                <b-button
                  size="is-small"
                  @click="deletePost(article._id)"
                  icon-left="delete"
                  native-type="submit"
                  type="is-danger is-outlined"
                ></b-button>
              </b-tooltip>
            </div>
            <div style="margin-top: 10px;" class="title is-3" v-html="article.title"></div>
          </div>
        </div>
        <hr />

        <div>
          <div class="is-center">
            <img
              v-bind:src="article.url"
              alt="Placeholder image"
              style="display:cover;max-height:350px;margin-left:15vw"
            />
          </div>
          <div>
            <div class="content" v-html="article.content"></div>
            <p
              class="tag date is-white"
              style="color: darkgrey; margin-left:-5px;"
            >{{ moment(article.createdAt) }}</p>
            <p class="owner">
              <strong>(by/{{article.owner.username}})</strong>
            </p>
            <span
              v-for="(item, index) in article.tag"
              :key="index"
              class="tags tag is-rounded"
              v-html="item "
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios";

const host = "https://mini-wp-aws.sigitariprasetyo.xyz";
// const host = "http://localhost:3000";

export default {
  name: "CardMyPost",
  props: ["article"],
  data() {
    return {
      isFullPage: true
    };
  },
  methods: {
    handleJwt() {
      this.$router.push("/");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      this.auth();
    },
    next(err) {
      if (err.response.status == 499) {
        this.handleJwt();
        this.auth();
      } else {
        setTimeout(
          () =>
            this.$buefy.toast.open({
              message: err.response.data,
              type: "is-danger"
            }),
          500
        );
      }
    },
    detail(title) {
      this.$router.push(`/detail/${title}`);
    },
    moment(date) {
      return moment(date).format("LLL");
    },
    publish(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, publish it!"
      }).then(result => {
        if (result.value) {
          axios({
            method: "patch",
            url: `${host}/article/${id}/update`,
            data: {
              publish: true
            },
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(() => {
              const loadingComponent = this.$buefy.loading.open({
                container: this.isFullPage ? null : this.$refs.element.$el
              });
              setTimeout(() => loadingComponent.close(), 1 * 2000);
              setTimeout(
                () =>
                  this.$buefy.toast.open({
                    message: "Publish Article Success..",
                    type: "is-success"
                  }),
                2000
              );
              setTimeout(() => this.$router.push(`/user-post`), 1 * 1900);
            })
            .catch(({ response }) => {
              const loadingComponent = this.$buefy.loading.open({
                container: this.isFullPage ? null : this.$refs.element.$el
              });
              setTimeout(() => loadingComponent.close(), 1 * 2000);
              this.$buefy.toast.open({
                message: "Sorry your request is not complete..",
                type: "is-danger"
              });
            });
        }
      });
    },
    deletePost(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          return axios({
            method: "delete",
            url: `${host}/article/${id}/delete`,
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(() => {
              const loadingComponent = this.$buefy.loading.open({
                container: this.isFullPage ? null : this.$refs.element.$el
              });
              setTimeout(() => loadingComponent.close(), 1 * 1000);
              setTimeout(
                () =>
                  this.$buefy.toast.open({
                    message: "Deleted Post Success..",
                    type: "is-success"
                  }),
                1000
              );
              this.$router.push(`/user-post`);
            })
            .catch(err => {
              this.next(err);
            });
        }
      });
    },
    updatePost(id) {
      this.$router.push(`/article/${id}/edit`);
    }
  }
};
</script>
<style scoped>
.card {
  margin: 20px;
}
.post {
  height: 25px;
  border: 2px solid #e9ebec !important;
  margin: 20px;
}
.subtitle {
  margin: auto 15px;
  padding: 0 10px;
}
.btn {
  background-color: rgb(218, 42, 112);
  height: 30px;
  margin: auto 20px;
  color: white;
  border: 1px solid rgb(92, 92, 92);
  padding: 0 15px;
  border-radius: 3px;
}
.btn:hover {
  background-color: rgb(163, 32, 84);
}
.date {
  margin-top: 10px;
}
.owner {
  font-size: 12px;
  margin: 10px 0;
}
.tags {
  margin: 15px 5px;
}
</style>
