<template>
  <div id="main">
    <Navbar></Navbar>
    <Articles></Articles>
    <Register></Register>
    <Login></Login>
    <AddArticle></AddArticle>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Articles from './components/Articles'
import AddArticle from './components/AddArticle'
import Register from './components/Register'
import Login from './components/Login'

export default {
  components: {
    Navbar,
    Articles,
    AddArticle,
    Register,
    Login
  },
  data() {
    return {
      message: 'Hello world',
    };
  },
};
</script>

<style scoped>
#main {
  font-family: 'Signika', sans-serif;
}
</style>