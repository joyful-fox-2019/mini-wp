<template>
  <section id="main-page" class="flex">
    <Sidebar @myArticles="myArticles" @newArticle="newArticle" @myDrafts="myDrafts"></Sidebar>
    <div class="page flex-column w-full">
      <Navbar @logout="logout" @search="search"></Navbar>
      <router-view :keyword="keyword" @searchTag="search"></router-view>
    </div>
  </section>
</template>

<script>
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
export default {
  name: 'HomePage',
  data() {
    return {
      keyword: ''
    }
  },
  components: {
    Sidebar, Navbar
  },
  methods: {
    search (payload) {
      console.log(payload.keyword);
      this.keyword = payload.keyword
    },
    myArticles () {
      this.$router.push('/articles')
    },
    newArticle () {
      this.$router.push('/new')
    },
    myDrafts () {
      this.$router.push('/drafts')
    },
    editArticle (id) {
      this.$router.push(`/articles/${id}`)
    },
    logout () {
      this.$emit('logout')
    }
  },
  watch: {
    keyword () {
      this.myArticles()
    }
  },
}
</script>

<style>

</style>