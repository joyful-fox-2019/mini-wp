<template>
  <div class="container">
    <div class="container">
      <AddArticleForm @alert="alert"></AddArticleForm>
    </div>
  </div>
</template>

<script>
import AddArticleForm from '../components/AddArticleForm'

export default {
  name: 'AddArticle',
  components: {
    AddArticleForm
  },
  methods: {
    alert (err) {
      this.$emit('alert', err)
    } 
  }
}
</script>

<style>

</style>