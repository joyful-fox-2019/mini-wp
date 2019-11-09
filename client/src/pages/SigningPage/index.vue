<template>
  <section>
    <AppSignin
      v-if="registered"
      @switch-page="registered = !registered"
      @signed-in="$emit('signed-in')"
    ></AppSignin>
    <AppSignup v-else @switch-page="registered = !registered" @signed-in="$emit('signed-in')"></AppSignup>
  </section>
</template>

<script>
import AppSignin from "./AppSignin";
import AppSignup from "./AppSignup";

export default {
  components: {
    AppSignin,
    AppSignup
  },
  data() {
    return {
      registered: true
    };
  }
};
</script>

<style>
</style>