import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ListArticle from './views/ListArticle.vue'
import Register from './views/Register.vue'
import Detail from './views/Detail.vue'
import AdminHomePage from './views/AdminHomePage.vue'

const routes = [
  { 
    path: '/', 
    component: Home
  },
  {
    path: '/detail/:id',
    component: Detail
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/list/:tag',
    component: ListArticle
  },
  {
    path: '/admin',
    component: AdminHomePage
  }
]

export default routes