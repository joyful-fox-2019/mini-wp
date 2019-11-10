import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../view/Home.vue'
import Article from '../view/Article.vue'
import UserPost from '../view/UserPost.vue'
import WritePost from '../view/WritePost.vue'
import EditArticle from '../view/EditArticle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/detail/:id/:title',
    name: 'article',
    component: Article
  },
  {
    path: '/user-post',
    name: 'user-post',
    component: UserPost
  },
  {
    path: '/write-post',
    name: 'write-post',
    component: WritePost
  },
  {
    path: '/article/:id/edit',
    name: 'edit-article',
    component: EditArticle
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router