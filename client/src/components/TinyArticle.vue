<template>
  <div class="tiny-article">
    <img :src="article.picture" class="image-tiny-article" @click.prevent="toPage(article._id)" style="cursor:pointer">
    <div>
      <a href="" class="mt-2 link-tag" @click.prevent="toPage(article._id)"><strong>{{ article.title }}</strong></a>
    </div>
    <small class="text-muted" v-html="desc"></small>
  </div>
</template>

<script>
export default {
  props:['article'],
  methods:{
    toPage(id){
      this.$router.push(`/detail/${id}`)
    }
  },
  computed:{
    desc(){
      return this.article.description.slice(0,300) + '...'
    }
  }
}
</script>

<style>
.image-tiny-article{
  width: 100%;
  max-height: 150px;
  object-fit: cover;
}

.tiny-article{
  width: 320px
}
  
.link-tag{
  color: #000
}

.link-tag:hover { 
  color:#FF4421;
  text-decoration: none;
}
</style>