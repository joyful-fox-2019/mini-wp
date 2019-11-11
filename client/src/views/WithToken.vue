<template>

  <div id="with-token">

    <NavbarWithToken 
      @toggle-add-post-form="toggleAddPostForm"
      @show-home="showHome"
      @show-profile="showProfile">
    </NavbarWithToken>

    <div v-if="homePageIsActive" id="home" class="main-container">
      <AddPostForm
        @get-articles="getArticles"
        @article-submitted="toggleAddPostForm"
        v-if="addPostFormIsActive">
      </AddPostForm>

      <UpdatePostForm
        :update-article="updateArticle" 
        @get-articles="getArticles"
        @article-updated="toggleUpdatePostForm"
        v-if="updatePostFormIsActive">
      </UpdatePostForm>

      <SearchBar @update:search="updateSearch">
      </SearchBar>

      <div
        class="inside-main-container"
        v-for="article in filteredList" 
        :key="article._id">
        <ArticleItem
          @delete-article="deleteArticle"
          @update-article="findArticle" 
          :article="article">
        </ArticleItem>
      </div>
    </div>

    <div v-if="profilePageIsActive" id="profile-page" class="main-container">
      <ProfilePage></ProfilePage>
    </div>

  </div>

</template>

<script>
import axios from 'axios'
import NavbarWithToken from '../components/NavbarWithToken'
import AddPostForm from '../components/AddPostForm'
import UpdatePostForm from '../components/UpdatePostForm'
import SearchBar from '../components/SearchBar'
import ArticleItem from '../components/ArticleItem'
import ProfilePage from '../views/ProfilePage'

export default {
  name: "with-token",
  data() {
    return {
      homePageIsActive: true,
      profilePageIsActive: false,

      addPostFormIsActive: false,
      updatePostFormIsActive: false,

      articles: [],
      search: '',
      updateArticle: {}
    }
  },
  mounted() {
    this.getArticles()
  },
  methods: {
    deleteArticle: function(articleId) {
      const access_token = localStorage.getItem("access_token")
      axios({
        method: 'delete',
        url: process.env.HOST_SERVER + '/articles/' + articleId,
        headers: { access_token }
      })
        .then(({ data }) => {
          M.toast({html: data.message})
          this.getArticles()
        })
        .catch(err => {
          M.toast({ html: err.response.data.messages[0] })
        })
    },
    findArticle: function(articleId) {
      // console.log('ini articleId', articleId);
      const access_token = localStorage.getItem("access_token")
      axios({
        method: 'get',
        url: process.env.HOST_SERVER + '/articles/' + articleId,
        headers: { access_token } 
      })
        .then(({ data }) => {
          this.updateArticle = data.article
          // console.log('bisa update article', this.updateArticle)
          this.toggleUpdatePostForm()
        })
        .catch(err => {
          M.toast({ html: err.response.data.messages[0] })
        })
    },
    showHome: function() {
      this.homePageIsActive = true
      this.profilePageIsActive = false
    },
    showProfile: function() {
      this.homePageIsActive = false
      this.profilePageIsActive = true
    },
    toggleAddPostForm: function() {
      if (!this.homePageIsActive) {
        this.homePageIsActive = true
      }
      this.addPostFormIsActive = !this.addPostFormIsActive
      this.updatePostFormIsActive = false
      this.profilePageIsActive = false
    },
    toggleUpdatePostForm: function() {
      if (!this.homePageIsActive) {
        this.homePageIsActive = true
      }
      this.addPostFormIsActive = false
      this.updatePostFormIsActive = !this.updatePostFormIsActive
      this.profilePageIsActive = false
    },
    updateSearch: function (searchInput) {
      this.search = searchInput
    },
    getArticles: function () {
      const access_token = localStorage.getItem("access_token")
      axios({
        method: 'get',
        url: process.env.HOST_SERVER + '/articles',
        headers: { access_token }
      })
        .then(({ data }) => {
          let sortByLatest = []
          for (let i = data.length - 1; i >= 0; i--) {
            sortByLatest.push(data[i])
          }
          this.articles = sortByLatest
          // console.log("ini articles", this.articles);
        })
        .catch(err => {
          M.toast({ html: err.response.data.messages[0] })
        })
    },
  },
  computed: {
    filteredList() {
      return this.articles.filter(article => {
        return article.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  components: {
    NavbarWithToken, AddPostForm, SearchBar, ArticleItem, ProfilePage, UpdatePostForm
  }
};
</script>

<style>
</style>