<template>
  <div class="image-container">
    <img :src="firstArticle.picture" alt="Snow" style="width:100%;" class="image" id="bigImage">
    <div class="bottom-left">
      <div>LATEST</div>
      <h4 class="m-0">
        {{ firstArticle.title }}
      </h4>
      <small class="m-0 text-muted"><a href="#" class="text-muted">{{ firstArticle.user_id.name }}</a></small>      
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  props:['firstArticle'],
  created () {
    console.log(this.firstArticle.user_id.name, "<<<<<")
  }
}
</script>

<style>

.image:hover{
  width: 110%;
}

</style>