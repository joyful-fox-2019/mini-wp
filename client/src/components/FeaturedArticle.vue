<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <div class="tile is-child">
        <figure class="image is-3by2 has-margin-b">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </figure>
        <p class="title t-standard">{{ articles[0].title }}</p>
        <div class="t-lighten">
          <small><i>{{ topics(0) }}</i></small>
        </div>
        {{ articles[0].description }}
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
        <p class="title t-standard">{{ articles[1].title }}</p>
        <div class="t-lighten">
          <small><i>{{ topics(1) }}</i></small>
        </div>
        <p>{{ articles[1].subtitle }}</p>
        <figure class="image is-3by1 has-margin-t">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </figure>
        <div class="row t-lighten">
          <small>
            {{ publishedDate(1) }} - {{ fullName(1) }}
          </small>
        </div>
      </div>
      <div class="tile is-child">
        <p class="title t-standard">{{ articles[2].title }}</p>
        <div class="t-lighten">
          <small><i>{{ topics(1) }}</i></small>
        </div>
        <p>{{ articles[2].subtitle }}</p>
        <figure class="image is-3by1 has-margin-t">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </figure>
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
      let result = ''
      this.articles[i].tags.forEach(tag => {
        result += tag + ' '
      })
      return result.toUpperCase()
    }
  }
}
</script>

<style>

</style>