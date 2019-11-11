<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="columns is-vcentered">
        <div class="column is-5">
          <figure class="image is-4by3">
            <img src="../../image/ideas.gif" alt="Description" />
          </figure>
        </div>
        <div class="column is-6 is-offset-1">
          <h1 class="title is-1">
            a directory of
            <br />wonderful things
          </h1>
          <h2 class="subtitle is-5">
            connecting people -
            <br />share your ideas with one take,
            <br />one room at a time.
          </h2>
          <br />
          <p class="has-text-centered">
            <b-button style="background-color: #2b2b28;" type="is-dark">subscribe</b-button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome"
};
</script>


<style scoped>
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
img {
  border-left: solid 3px #ffdd56;
}
@media only screen and (max-width: 600px) {
  .container {
    width: 90% !important;
  }
}
</style>