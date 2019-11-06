import Vue from 'vue'
import Router from 'vue-router'
import ArticleList from './views/ArticleList.vue'
import EditArticle from './views/EditArticle.vue'
import ShowArticle from './views/ShowArticle.vue'
import NewArticle from './views/NewArticle.vue'
import Drafts from './views/Drafts.vue'

Vue.use(Router)

export default new Router ({
  mode: 'history',
  base: '/', 
  routes: [
        {
          path: '/articles',
          name: 'ArticleList',
          component: ArticleList
        },
        {
          path: '/articles/:id',
          name: 'showArticle',
          component: ShowArticle
        },
        {
          path: '/edit/:id',
          name: 'editArticle',
          component: EditArticle
        },
        {
          path: '/new',
          name: 'newArticle',
          component: NewArticle
        },
        {
          path: '/drafts',
          name: 'drafts',
          component: Drafts
        }
      ]
})