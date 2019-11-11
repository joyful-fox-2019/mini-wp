<template>
  <section style="margin: auto 7%">
    <form action @submit.prevent="handleSearch">
      <b-field position="is-right" grouped>
        <b-input v-model="q" placeholder="Search.tag"></b-input>
        <p class="control">
          <button @click="handleSearch" class="button is-light" style="color: white">Search</button>
        </p>
      </b-field>
    </form>
  </section>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      q: "",
      isFullPage: true
    };
  },
  methods: {
    handleSearch() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      setTimeout(() => loadingComponent.close(), 1 * 1500);
      setTimeout(() => {
        this.$emit("qSearch", this.q);
      }, 1000);
      setTimeout(() => (this.q = ""), 1 * 1200);
    }
  }
};
</script>
<style scoped>
  .button {
    color: #006088 !important;
    background:white !important;
  }
</style>