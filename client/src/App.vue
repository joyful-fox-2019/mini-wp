<template>
  <div id="main">
    <!-- <AddArticle></AddArticle> -->
    <Navbar :isLogin="isLogin" @logout="logout"></Navbar>
    <Articles v-if="$router.history.current.path === '/'"></Articles>
    <router-view @alert="alert" @login="login"></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Articles from './components/Articles'
import AddArticle from './components/AddArticle'

export default {
  name: 'App',
  components: {
    Navbar,
    Articles,
    AddArticle
  },
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    alert (err) {
      if(err.response) {
        let strMessages = ''
        err.response.data.messages.forEach(message => {
          strMessages += message + '<br>'
        })
        this.$buefy.toast.open({
          duration: 2500,
          message: strMessages,
          position: 'is-bottom',
          type: 'is-danger'
        })
      } else {
        this.$buefy.toast.open({
          duration: 2500,
          message: `Couldn't connect to the server`,
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    },
    login() {
      this.isLogin = true
    },
    logout() {
      localStorage.removeItem('_id')
      localStorage.removeItem('email')
      localStorage.removeItem('access_token')
      this.isLogin = false
      this.$router.push('/')
    }
  },
  created() {
    if(localStorage.getItem('access_token')) {
      this.isLogin = true
    }
  }
};
</script>

<style>
#main {
  font-family: 'Signika', sans-serif;
}
.container {
  width: 70% !important;
}
@media only screen and (max-width: 600px) {
  .container {
    width: 90% !important;
  }
}
.text-dark-yellow {
  color: rgb(255,190,0);
}
.yellow-gradient {
  background: rgb(255,190,0);
  background: linear-gradient(90deg, rgba(255,190,0,1) 0%, rgba(255,216,0,1) 35%, rgba(255,250,0,1) 100%);
}
button {
  border: none !important;
}
.float-right {
  float: right;
}
.centered-item {
  text-align: center;
}
.clickable {
  cursor: pointer;
}
.has-margin-t {
  margin-top: 10px;
}
.has-margin-b {
  margin-bottom: 10px;
}
</style>