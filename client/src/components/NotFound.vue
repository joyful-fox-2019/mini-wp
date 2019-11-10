<template>
  <div class="not-found">
    <img
      src="../img/404.svg"
      class="image is-square is-centered container"
    />
    <h5 class="title is-4" style="text-align: center">Ooops Sorry,</h5>
    <h5 class="title is-4" style="text-align: center">Article not found..!!</h5>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>
<style scoped>
.image {
  margin-top: -90%;
  margin-bottom: 40px;
  width: 300px;
}
.not-found {
  margin-bottom: 80px;
}
</style>