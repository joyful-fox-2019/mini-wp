<template>
  <div class="home">
    <slideshow-component id="slideshow" :statusLogin="statusLogin"></slideshow-component>
    <div v-if="statusLogin" class="container-fluid">
      <div class="row">
        <menucontent-component v-if="!createNow"></menucontent-component>
        <article-component :createNow="createNow"></article-component>
      </div>
    </div>
  </div>
</template>

<script>
import Slideshow from "../components/landingComponent/SlideShow.vue";
import MenuContent from "../components/landingComponent/MenuContent.vue";
import Article from "../components/landingComponent/Article.vue";

export default {
  name: "Homepage",
  props: ["statusLogin", "createNow"],
  components: {
    "slideshow-component": Slideshow,
    "menucontent-component": MenuContent,
    "article-component": Article
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>>