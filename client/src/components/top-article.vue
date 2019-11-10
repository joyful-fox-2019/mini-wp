<template>
    <div class="public-body">
        <h1 class="display-1 text-center">Top Article</h1>
       <div class="top d-flex">
          <div @click="changePage(topArticle[0]._id)" class="top-1">
            <div class="w-100 h-100 d-flex justify-content-center align-items-center border">
              <img :src="topArticle[0].file" alt="">
            </div>
             <div class="top-content d-flex flex-column justify-content-between">
               <h1 class="text-center">{{ topArticle[0].title }}</h1>
               <p v-html="topArticle[0].content"></p>
            </div>
          </div>

          <div @click="changePage(topArticle[1]._id)" class="top-2">
              <img :src="topArticle[1].file" alt="">
              <div class="top-content d-flex flex-column justify-content-between">
                <h1 class="text-center">{{ topArticle[1].title }}</h1>
                <p v-html="topArticle[1].content"></p>
              </div>
          </div>
          <div class="w-25">
            <div @click="changePage(topArticle[2]._id)" class="top-3">
                <img :src="topArticle[2].file" alt="">
                <div class="top-content d-flex flex-column justify-content-between">
                  <h1 class="text-center">{{ topArticle[2].title }}</h1>
                  <p v-html="topArticle[2].content"></p>
                </div>
            </div>
            <div @click="changePage(topArticle[3]._id)" class="top-4">
                  <img :src="topArticle[3].file" alt="">
                  <div class="top-content d-flex flex-column justify-content-between">
                    <h1 class="text-center">{{ topArticle[3].title }}</h1>
                    <p v-html="topArticle[3].content"></p>
                  </div>
            </div>
          </div>
       </div>
    </div>
</template>

<script>
export default {
  props: ['topArticle'],
  methods: {
    changePage(id){
      this.$emit('changePage', 'read')
      this.articleId(id)
    },
    articleId(id){
      this.$emit('articleId', id)
    },
  }
}
</script>

<style>

.public-body{
  width: 100%;
  padding: 30px
}

.top-1 {
  position: relative;
  width: 50%;
  height: 300px;
  margin:  1px;
}

.top-content{
  top: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.376);
  width: 100%;
  height: 100%;
  font-family: 'Quicksand', sans-serif;
  color: white;
  padding: 10px;
  cursor: pointer;
  transition: 300ms;
}

.top-content p{
  overflow: hidden;
  font-size: 20px;
}

.top img{
  max-width: 100%;
  max-height: 100%;
}

.top-2{
  position: relative;
  width: 25%;
  height: 300px;
  margin: 1px;
}


.top-3, .top-4{
  position: relative;
  width: 100%;
  height: 150px;
  margin: 1px;
  transition: 200ms;
}

.top-content:hover{
  background-color: rgba(0, 0, 0, 0.849);
}

</style>