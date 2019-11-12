import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import wysiwyg from "vue-wysiwyg"
import "../node_modules/vue-wysiwyg/dist/vueWysiwyg.css"
import GSignInButton from 'vue-google-signin-button'

Vue.use(Buefy)
Vue.use(wysiwyg, {});
Vue.use(VueRouter)
Vue.use(GSignInButton)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: () => import('./views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/write-article',
    name: 'write-article',
    component: () => import('./views/AddArticle.vue')
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('./views/DetailArticle.vue'),
    children: [
      {
        path: ':slug',
        name: 'detail-article',
        component: () => import('./components/DetailArticleContent.vue')
      },
      {
        path: ':slug/update',
        name: 'update-article',
        component: () => import('./components/UpdateArticleForm.vue')
      }
    ]
  },
  {
    path: '/my-articles',
    name: 'my-articles',
    component: () => import('./views/MyArticles.vue')
  },
  {
    path: '/topics/:topic',
    name: 'topics',
    component: () => import('./views/TopicArticles.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')