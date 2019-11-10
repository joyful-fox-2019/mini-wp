<template>
  <div>
    <div class="title t-standard font-article">
      {{ article.title }}
    </div>
    <div class="subtitle t-lighten has-margin-t">
      {{ article.subtitle }}
    </div>
    <div class="has-margin-t">
      <div class="columns is-vcentered">
        <div class="column is-narrow">
          <button class="button is-rounded bg-primary-gradient font-content">
            <b>
              {{ userInitial }}
            </b>
          </button>
        </div>
        <div class="column">
          {{ fullName }}
        </div>
        <div class="column is-narrow">
          <button @click="toUpdate" class="button bg-primary-gradient font-content">
            <span class="icon">
              <i class="fas fa-pen"></i>
            </span>
          </button>
        </div>
        <div class="column is-narrow">
          <button class="button bg-surface font-content">
            <span class="icon">
              <i class="fas fa-trash"></i>
            </span>
          </button>
        </div>
      </div>  
    </div>
    <div class="has-margin-t-2">
      <figure class="image is-4by3">
        <img :src="article.image">
      </figure>
    </div>
    <div class="has-margin-t">
      {{ article.description }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailArticleContent',
  props: {
    article: Object
  },
  methods: {
    toUpdate () {
      this.$router.push(`${this.$route.fullPath}/update`)
    }
  },
  computed: {
    userInitial () {
      return this.article.user.firstName.substring(0, 1).toUpperCase()
    },
    fullName () {
      return `${this.article.user.firstName} ${this.article.user.lastName}`
    }
  }
}
</script>

<style>

</style>