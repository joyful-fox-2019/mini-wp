<template>
  <section>
    <AppSidebar @switch-section="switchSection"></AppSidebar>
    <AppMain :section="section" @view-article="viewArticle"></AppMain>
  </section>
</template>

<script>
import AppSidebar from "./AppSidebar";
import AppMain from "./AppMain";

export default {
  components: {
    AppSidebar,
    AppMain
  },
  data() {
    return {
      registered: true,
      section: "all"
    };
  },
  methods: {
    switchSection(val) {
      this.section = val;
    },
    viewArticle(article) {
      this.$emit("view-article", article);
    }
  }
};
</script>

<style>
</style>