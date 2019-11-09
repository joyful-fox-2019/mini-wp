<template>
  <b-container>
    <b-row>
      <b-col>
        <ArticleEditor></ArticleEditor>
      </b-col>
      <b-col cols="3">
        <ArticleSidebar></ArticleSidebar>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ArticleEditor from '../components/ArticleEditor'
import ArticleSidebar from '../components/ArticleSidebar'

export default {
    data() {
        return {}
    },
    components: {
      ArticleEditor,
      ArticleSidebar
    }
}
</script>

<style>

</style>