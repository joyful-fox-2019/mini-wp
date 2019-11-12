<template>
  <div class="container">
    <div class="container">
      <AddArticleForm @alert="alert" :is-dark="isDark"></AddArticleForm>
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
  props: {
    isDark: Boolean
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