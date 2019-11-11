<template>
  <div class="tabs subtitle">
    <ul>
      <li>
        <a>ARTICLES</a>
      </li>
    </ul>

    <div class="tabs-end">
      <!-- <div class="panel-block"> -->
      <p class="control has-icons-right">
        <input
          style="color: black; font-size: 12px;"
          class="input"
          type="text"
          placeholder="Search"
          v-model="target"
          v-on:keyup.enter="showArticles"
        />
        <span class="icon is-right" style="color: black">
          <i class="fas fa-search" aria-hidden="true"></i>
        </span>
      </p>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "tabs",
  data() {
    return {
      target: ""
    };
  },
  methods: {
    showArticles() {
      this.$emit("search", this.target);
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  border: solid 2px #2b2b28;
}
@import url("https://fonts.googleapis.com/css?family=DM+Serif+Display|Roboto&display=swap");

.title {
  font-size: 40px;
  font-weight: bolder;
  font-family: "DM Serif Display", serif;
  color: #2b2b28;
}
.subtitle {
  font-size: 12px;
  font-weight: bolder;
  font-family: "Roboto", sans-serif;
  color: #8f4426;
}
</style>
