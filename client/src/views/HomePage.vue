<template>
  <section id="main-page" class="flex">
    <Sidebar @myArticles="myArticles" @newArticle="newArticle" @myDrafts="myDrafts"></Sidebar>
    <div class="page flex-column w-full">
      <Navbar ref="navbar" @logout="logout" @search="search"></Navbar>
      <router-view ref="articleList" :keyword="keyword" @searchTag="search"></router-view>
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
      this.keyword = payload.keyword
    },
    myArticles () {
      if(this.$route.path !== '/articles') {
        this.$router.push('/articles')
        this.$refs.navbar.emptyInput()
      } else {
        this.$refs.navbar.emptyInput()
        this.$refs.articleList.getArticles()
      }
    },
    newArticle () {
      if(this.$route.path !== '/new') {
        this.$router.push('/new')
      }
    },
    myDrafts () {
      if(this.$route.path !== '/drafts') {
        this.$router.push('/drafts')
      }
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