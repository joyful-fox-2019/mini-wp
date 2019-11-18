<template>
  <div>
    <ArticleEditor :article-id="articleId" @change-page="changePage" class="container"></ArticleEditor>
  </div>
       
     
</template>

<script>
import ArticleEditor from '../components/ArticleEditor'

export default {
    props: ['articleId'],
    data() {
        return {
        }
    },
    components: {
      ArticleEditor
    },
    methods: {
      changePage(value) {
        this.$emit('update-article', null);
        this.$emit('change-page', value)
      }
    }
}
</script>

<style>

</style>