<template>
  <Form @aftercreateart="backmysite"></Form>
</template>

<script>
import Form from "../components/articleForm";

export default {
  components: {
    Form
  },
  methods: {
    backmysite() {
      this.$emit("aftercreateart", "mysite");
    }
  }
};
</script>

<style>
</style>