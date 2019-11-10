<template>
  <div class="container">
    <div class="container article-container">
      <DetailArticleContent v-if="article" :article="article"></DetailArticleContent>
    </div>
  </div>
</template>

<script>
import axios from '../../helpers/axios'
import DetailArticleContent from '../components/DetailArticleContent'

export default {
  name: 'DetailArticle',
  components: {
    DetailArticleContent
  },
  data () {
    return {
      article: null
    }
  },
  methods: {
    getArticle () {
      const arrSlug = this.$route.params.slug.split('-')
      const id = arrSlug[arrSlug.length - 1]
      axios.get(`/articles/${id}`)
        .then(({ data }) => {
          console.log(data)
          this.article = data
        })
        .catch(err => {
          this.$emit('alert', err)
        })
    }
  },
  created () {
    this.getArticle()
  }
}
</script>

<style scoped>
.article-container {
  margin-top: 30px;
}
</style>