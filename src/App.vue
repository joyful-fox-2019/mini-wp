<template>
  <div id="main">
    <Navbar></Navbar>
    <Articles v-if="$router.history.current.path === '/'"></Articles>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Articles from './components/Articles'

export default {
  name: 'App',
  components: {
    Navbar,
    Articles
  },
  data() {
    return {
      showedPage: 'articles'
    };
  }
};
</script>

<style>
#main {
  font-family: 'Signika', sans-serif;
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