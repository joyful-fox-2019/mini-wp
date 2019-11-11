<template>
  <div class="list-end">
    <p class="listEnd"></p>
    <i class="icon fab fa-wordpress-simple fa-lg"></i>
    <p class="listEnd"></p>
  </div>
</template>
<script>
export default {
  name: "ListEnd"
};
</script>
<style scoped>
.list-end {
  margin: 30px 30px 0 30px;
}
.listEnd {
  width: 47%;
  border-bottom: 1px solid #c4c6c7;
  display: inline-block;
}
.icon {
  color: rgb(126, 125, 125);
  text-align: center;
  width: 5%;
  position: relative;
  bottom: -7px;
  font-size: 2vw;
}
</style>