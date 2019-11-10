<template>
  <div class="image-container">
    <img :src="article.picture" alt="Snow" style="width:100%;" class="imageSecondary">
    <div class="bottom-left">
      <h4 class="m-0">
        {{ article.title }}
      </h4>
      <small class="m-0 text-muted"><a href="#" class="text-muted">{{ article.user_id.name }}</a></small>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props:['article']
}
</script>

<style>

</style>