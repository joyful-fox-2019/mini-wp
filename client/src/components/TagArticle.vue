<template>
  <div class="mb-3" style="width:430px">
    <h4 class="tag mb-2">
      <a href="" class="link" @click.prevent="toPage()">{{ title }} > </a>
    </h4>

    <div id="tag-article" style="width:100%">
      <div class="image-container">
        <img :src="latestArticle[0].picture" alt="Snow" style="width:100%;" class="imageTag">
        <div class="bottom-left caption-bottom" style="cursor: pointer" @click.prevent="toDetail(latestArticle[0]._id)">
          {{ latestArticle[0].title }}
        </div>
      </div>
    </div>

    <div id="little-tag" class="mt-1 d-flex align-items-center justify-content-between">
      <div class="p-2 d-flex flex-column" style="width:calc(100% - 110px)">
        <small class="caption-tag">LATEST</small>
        <a href="" class="caption-tag" @click.prevent="toDetail(secondArticle[0]._id)">{{ secondArticle[0].title }}</a>
      </div>
      <div style="height:110px; width:110px; overflow:hidden; text-align:center">
        <img :src="secondArticle[0].picture" alt="" style="object-fit:cover;width:100%; height:100%; cursor: pointer" class="m-0" @click.prevent="toDetail(secondArticle[0]._id)">
      </div>
    </div>

    <div class="mt-2" v-for="article in restArticle" :key="article._id">
      <div class="d-flex align-items-start link-articles">
        <div><li class="mr-1 dot" style="width: 10px"></li></div>
        <a href="" class="text-muted" @click.prevent="toDetail(article._id)">{{ article.title }}</a>
      </div>
      <hr class="mt-2 mb-2 text-muted">
    </div>

  </div>
</template>

<script>

export default {
  data(){
    return{
      latestArticle:[],
      secondArticle: [],
      restArticle: []
    }
  },
  methods:{
    toDetail(id){
      this.$router.push(`detail/${id}`)
    },
    toPage(){
      this.$router.push(`/list/${this.tag.tag}`)
    }
  },
  computed:{
    title(){
      return this.tag.tag.charAt(0).toUpperCase() + this.tag.tag.slice(1);
    }
  },
  created(){
    this.latestArticle = this.tag.data.slice(0, 1)
    this.secondArticle = this.tag.data.slice(1, 2)
    this.restArticle = this.tag.data.slice(2, 8)
  },
  props:['tag']
}
</script>

<style>
.caption-bottom{
  color: white
}

#tag-article{
  width: 420px;
}

.caption-tag{
  color: #FF4421
}

.caption-tag:hover{
  color: #FF4421
}

#little-tag{
background-color: #FFECE8
}

.link-articles{
  font-size: 90%
}

.dot{
  color: #FF4421  
}

.imageTag{
  object-fit: cover;
  width: 100%;
  height: 200px;
  -webkit-mask-image:-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
      mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));
}
</style>