<template>
  <div class="columns">
    <div  class="column is-three-quarters">
      <div class="rows">
        <div class="row t-lighten">
          <small><i>{{ topics }}</i></small>
        </div>
        <router-link :to="`/article/${slug}`">
        <div class="row">
          <strong class="title t-standard">{{ article.title }}</strong>
        </div>
        <div class="row t-lighten">
          <small>
            {{ article.subtitle }}
          </small>
        </div>
        </router-link>
        <br>
        <div class="row">
          <small class="t-standard">
            {{ fullName }}
          </small>
        </div>
        <div class="row t-lighten">
          <small>
            {{ publishedDate }}
          </small>
        </div>
      </div>
    </div>
    <div class="column">
      <router-link :to="`/article/${slug}`">
        <figure class="image is-square">
          <img :src="article.image">
        </figure>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    article: Object
  },
  computed: {
    publishedDate () {
      const date = new Date(this.article.createdAt);  // 2009-11-10
      const month = date.toLocaleString('default', { month: 'long' });
      return `${month.substring(0, 3)}, ${date.getDate()}`
    },
    fullName () {
      return `${this.article.user.firstName} ${this.article.user.lastName}`
    },
    topics () {
      return this.article.tags.join(', ').toUpperCase()
    },
    slug () {
      const slug = this.article.title.replace(/\s+/g, '-').toLowerCase()
      return `${slug}-${this.article._id}`
    }
  }
}
</script>

<style>

</style>