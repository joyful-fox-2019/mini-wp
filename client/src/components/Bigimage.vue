<template>
  <b-col cols="12" md="6">
    <div class="big-image p-0 m-1">
      <img class="imageBig" :src="imglink" width="100%">
      <div class="centered">
        <h3 class="m-0 text-shadow-d">{{ title }}</h3>
        <small class="m-0 text-shadow-d">{{ author }}, {{ date }}</small>
      </div>
    </div>
  </b-col>
</template>

<script>
export default {
  name:'Bigimage',
  props:{
    imglink: String,
    title: String,
    author: String,
    date: String
  }
}
</script>

<style scoped>
.text-shadow-d{
  text-shadow: 1px 1px #14141456;
}
.big-image{
  background-color: #a6f7f7 !important;
  position: relative;
  text-align: center;
  color: white;
}
.imageBig:hover {
  transform: scale(1.02); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.imageBig{
  object-fit: cover;
  height: 300px;
  opacity: 0.4;
  transition: transform .2s; /* Animation */
  overflow: hidden
}
</style>