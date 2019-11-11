<template>
  <div class="home">
    <slideshow-component id="slideshow" :statusLogin="statusLogin"></slideshow-component>
    <content-component :statusLogin="statusLogin" :createArticle="createArticle"></content-component>
  </div>
</template>

<script>
import Slideshow from "../components/landingComponent/SlideShow.vue";
import Content from "../components/landingComponent/Content.vue";

export default {
  name: "Homepage",
  props: ["statusLogin", "createArticle"],
  components: {
    "slideshow-component": Slideshow,
    "content-component": Content
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>>