<template>
  <div id="main">
    <Navbar></Navbar>
    <!-- <Articles></Articles> -->
    <Register></Register>
    <AddArticle></AddArticle>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Articles from './components/Articles'
import AddArticle from './components/AddArticle'

export default {
  components: {
    Navbar,
    Articles,
    AddArticle
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