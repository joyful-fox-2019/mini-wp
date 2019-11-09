<template>
  <div class="container">
    <FeaturedArticle v-if="articles.length >= 3" :articles="articles.slice(0, 3)"></FeaturedArticle>
    <div class="container">
      <Article v-for="article in articles.slice(3)" :key="article._id" class="columns" :article="article"></Article>
    </div>
  </div>
</template>

<script>
import axios from '../../helpers/axios'
import Article from '../components/Article'
import FeaturedArticle from '../components/FeaturedArticle'

export default {
  name: 'Articles',
  components: {
    Article,
    FeaturedArticle
  },
  data () {
    return {
      articles: []
    }
  },
  methods: {
    getArticles () {
      console.log('get articles')
      const loadingComponent = this.$buefy.loading.open()
      axios.get('/articles', {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          loadingComponent.close()
          this.articles = data
        })
        .catch(err => {
          loadingComponent.close()
          this.$emit('alert', err)
        })
    }
  },
  created () {
    this.getArticles()
  }
}
</script>

<style scoped>
.container {
  width: 70% !important;
  margin-top: 20px;
}
.title {
  font-size: 23px;
}
img {
  border-left: solid 3px var(--primary-color);
}
@media only screen and (max-width: 600px) {
  .container {
    width: 90% !important;
  }
}
</style>