<template>
  <div>
    <div class="columns my-post">
      <div class="column is-four-fifths">
        <a @click="detail(article._id,article.title)" class="title is-5">{{article.title}}</a>
        <br />
        <p
          class="tag is-white"
          style="color: darkgrey; margin-left: -8px;"
        >{{ moment(article.createdAt) }}</p>
      </div>
      <div class="column right">
        <img v-bind:src="article.url" alt="Placeholder image" class="img" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "MyPost",
  props: ["article"],
  methods: {
    detail(id, title) {
      this.$router.push(`/detail/${id}/${title.split(' ').join('-')}`);
    },
    moment(date) {
      return moment(date).format("LLL");
    }
  }
};
</script>
<style scoped>
.my-post {
  margin: -2px 20px;
  border: 2px solid #e9ebec !important;
  background-color: #fff;
}
.column {
  padding: 10px 20px;
  height: 80px;
}
a:hover {
  color: #006088;
}
.right {
  margin: auto 40px;
}
.img {
  max-height: 50px;
}
</style>