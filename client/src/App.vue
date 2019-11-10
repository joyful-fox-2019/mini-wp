<template>
  <div id="main">
    <!-- <AddArticle></AddArticle> -->
    <Navbar :isLogin="isLogin" @logout="logout" @setDark="setDark"></Navbar>
    <Articles @alert="alert" v-if="$router.history.current.path === '/'"></Articles>
    <router-view @alert="alert" @login="login" :is-dark="isDark"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Articles from './views/Articles'
import AddArticle from './views/AddArticle'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Articles,
    AddArticle,
    Footer
  },
  data() {
    return {
      isLogin: false,
      isDark: false
    };
  },
  methods: {
    alert (err) {
      console.log('masuk')
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
    },
    setDark(status) {
      this.isDark = status
    }
  },
  created() {
    if(localStorage.getItem('access_token')) {
      this.isLogin = true
    }
  },
  watch: {
    isDark() {
      if(this.isDark) {
        document.documentElement.style.setProperty('--background-color', '#121212');
        document.documentElement.style.setProperty('--surface-color', '#1E1E1E');
        document.documentElement.style.setProperty('--primary-color', '#C390FF');
        document.documentElement.style.setProperty('--primary-color-gradient', 'linear-gradient(90deg, rgba(168,94,255,1) 0%, rgba(195,144,255,1) 35%, rgba(213,176,255,1) 100%)');
        document.documentElement.style.setProperty('--text-color', '#E1E1E1');
        document.documentElement.style.setProperty('--text-color-lighten', '#A5A5A5');
        document.documentElement.style.setProperty('--text-color-primary', '#C390FF');
        document.documentElement.style.setProperty('--text-color-on-primary', '#000000');
      } else {
        document.documentElement.style.setProperty('--background-color', '#FFFFFF');
        document.documentElement.style.setProperty('--surface-color', '#F5F5F5');
        document.documentElement.style.setProperty('--primary-color', '#FFDD56');
        document.documentElement.style.setProperty('--primary-color-gradient', 'linear-gradient(90deg, rgba(255,204,4,1) 0%, rgba(255,221,86,1) 35%, rgba(255,231,134,1) 100%)');
        document.documentElement.style.setProperty('--text-color', '#363636');
        document.documentElement.style.setProperty('--text-color-lighten', '#B5B5B5');
        document.documentElement.style.setProperty('--text-color-primary', '#D4B848');
        document.documentElement.style.setProperty('--text-color-on-primary', '#363636');
      }
    }
  }
};
</script>

<style>
:root {
  --background-color: #FFFFFF;
  --surface-color: #F5F5F5;
  --primary-color: #FFDD56;
  --primary-color-gradient: linear-gradient(90deg, rgba(255,204,4,1) 0%, rgba(255,221,86,1) 35%, rgba(255,231,134,1) 100%);
  --text-color: #363636;
  --text-color-lighten: #B5B5B5;
  --text-color-primary: #D4B848;
  --text-color-on-primary: #363636;
}
html, body {
  background: var(--background-color) !important;
  color: var(--text-color) !important;
}
.t-standard {
  color: var(--text-color) !important;
}
.t-lighten {
  color: var(--text-color-lighten) !important;
}
.t-primary {
  color: var(--text-color-primary) !important;
}
.bg-standard {
  background: var(--background-color) !important;
}
.bg-surface {
  background: var(--surface-color) !important;
  color: var(--text-color) !important;
}
.bg-primary {
  background: var(--primary-color) !important;
  color: var(--text-color-on-primary) !important;
}
.bg-primary-gradient {
  background: var(--primary-color) !important;
  background: var(--primary-color-gradient) !important;
  color: var(--text-color-on-primary) !important;
}
.font-article {
  font-family: 'Jomolhari', serif;
}
.font-fancy {
  font-family: 'Yeseva One', cursive;
}
.font-content {
  font-family: 'Signika', sans-serif;
}
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
button {
  border: none !important;
}
a {
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
  margin-top: 10px !important;
}
.has-margin-t-2 {
  margin-top: 20px !important;
}
.has-margin-b {
  margin-bottom: 10px;
}
img {
  object-fit: cover;
}
.align-right-container {
  width: 100%;
  text-align: right;
}
</style>