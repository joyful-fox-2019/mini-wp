<template>
  <section>
    <AppSidebar @switch-section="switchSection"></AppSidebar>
    <AppMain :section="section"></AppMain>
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
  props: ["page"],
  data() {
    return {
      registered: true,
      section: "all"
    };
  },
  methods: {
    switchSection(val) {
      this.section = val;
    }
  }
};
</script>

<style>
</style>