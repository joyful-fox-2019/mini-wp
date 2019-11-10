<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent t-standard">
      <div class="tile is-child">
        <router-link :to="`/article/${slug(0)}`">
          <figure class="image is-2by1 has-margin-b">
            <img :src="articles[0].image">
          </figure>
          <p class="title t-standard">{{ articles[0].title }}</p>
          <div class="t-lighten">
            <small><i>{{ topics(0) }}</i></small>
          </div>
        </router-link>
        {{ articles[0].subtitle }}
        <div class="row t-lighten">
          <small>
            {{ fullName(0) }}
          </small>
        </div>
        <div class="row">
          <small>
            {{ publishedDate(0) }}
          </small>
        </div>
      </div>
    </div>
    <div class="tile is-4 is-vertical is-parent">
      <div class="tile is-child">
        <router-link :to="`/article/${slug(1)}`">
          <p class="title t-standard">{{ articles[1].title }}</p>
        </router-link>
        <div class="t-lighten">
          <small><i>{{ topics(1) }}</i></small>
        </div>
        <router-link :to="`/article/${slug(1)}`">
          <p class="t-standard">{{ articles[1].subtitle }}</p>
          <figure class="image is-3by1 has-margin-t">
            <img :src="articles[1].image">
          </figure>
        </router-link>
        <div class="row t-lighten">
          <small>
            {{ publishedDate(1) }} - {{ fullName(1) }}
          </small>
        </div>
      </div>
      <div class="tile is-child">
        <router-link :to="`/article/${slug(2)}`">
          <p class="title t-standard">{{ articles[2].title }}</p>
        </router-link>
        <div class="t-lighten">
          <small><i>{{ topics(1) }}</i></small>
        </div>
        <router-link :to="`/article/${slug(2)}`">
          <p class="t-standard">{{ articles[2].subtitle }}</p>
          <figure class="image is-3by1 has-margin-t">
            <img :src="articles[2].image">
          </figure>
        </router-link>
        <div class="row t-lighten">
          <small>
            {{ publishedDate(2) }} - {{ fullName(2) }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturedArticle',
  props: {
    articles: Array
  },
  methods: {
    publishedDate (i) {
      const date = new Date(this.articles[i].createdAt);  // 2009-11-10
      const month = date.toLocaleString('default', { month: 'long' });
      return `${month.substring(0, 3)}, ${date.getDate()}`
    },
    fullName (i) {
      return `${this.articles[i].user.firstName} ${this.articles[i].user.lastName}`
    },
    topics (i) {
      return this.articles[i].tags[0].split(',').join(', ').toUpperCase()
    },
    slug (i) {
      const slug = this.articles[i].title.replace(/\s+/g, '-').toLowerCase()
      return `${slug}-${this.articles[i]._id}`
    }
  }
}
</script>

<style>

</style>