import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/CreateArticle.vue'
import Article from './views/Article.vue'
import MyProfile from './views/MyProfile.vue'
import EditArticle from './views/EditArticle.vue'
import Draft from './views/Draft.vue'
import Bookmark from './views/Bookmark.vue'

Vue.use(Router)

export default new Router({
  mode : 'history',
  base : process.env.BASE_URL,
  routes : [
    {
      path : '/',
      name : 'home',
      component : Home
    },
    {
      path : '/addarticle',
      name : 'createArticle',
      component : Register
    },  
    {
      path : '/myProfile',
      name : 'myProfile',
      component : MyProfile
    },
    {
      path : '/draft',
      name : 'draft',
      component : Draft
    },
    {
      path : '/bookmark',
      name : 'bookmark',
      component : Bookmark
    },
    {
      path : '/edit/:articleId',
      name : 'editArticle',
      component : EditArticle,
      props : true
    },
    {
      path : '/:slug',
      name : 'article',
      component : Article
    }
  ]


})