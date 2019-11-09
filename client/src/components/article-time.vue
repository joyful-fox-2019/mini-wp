<template>
  <div class="articleInfo">
    <span>{{ article.userId.email }}</span>
    <span>Created at {{ dateFormat(article.createdAt) }}</span>
    <span v-if="article.createdAt !== article.updatedAt">Edit at {{ dateFormat(article.updatedAt) }}</span>
  </div>
</template>

<script>
export default {
  name: "article-item",
  data() {
    return {};
  },
  props: ["article"],
  methods: {
    dateFormat(date) {
      let event = new Date(date);
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };

      return event.toLocaleDateString("en-US", options);
    }
  }
};
</script>

<style>
.articleInfo {
  color: rgba(0, 0, 0, 0.281);
  font-size: 10px;
  margin-bottom: 3px;
}

.articleInfo span {
  display: block;
  margin:5px;
}

.articleInfo span:first-child {
  color: rgba(4, 20, 165, 0.493);
}
</style>