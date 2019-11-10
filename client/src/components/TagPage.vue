<template>
  <div style=" background-color: rgb(226, 226, 226);">
    <div v-if="isEmpty" class="col-md-12 p-3" style="height: 85vh; overflow: scroll;" >
        <div class="pt-3 d-flex justify-content-center border-bottom border-dark" style="background-color: rgb(226, 226, 226);">
          <h1 class="font-weight-bold">{{tagName}}<h1>
        </div>
        <div class="border-bottom pb-2 d-flex justify-content-center">
            <h1 class="mt-3">NO BLOG FOUNDS</h1>
        </div>
    </div>
      <div v-else style="height:85vh; overflow: scroll; ">
          <div class="pt-3 d-flex justify-content-center border-bottom border-dark" style="background-color: rgb(226, 226, 226);">
              <h1 class="font-weight-bold">{{tagName}}<h1>
          </div>
          <TagArticle
          style="cursor: pointer;"
          class="border-bottom border-dark" 
          v-for="article in tagBlog" :key="article._id"
          :selectedData="article"
          @selectedArticleData="selectedArticleData"
          @switchContent="switchContent"
          >
          </TagArticle>
      </div>
  </div>
</template>

<script>
import TagArticle from '../components/TagArticle'
export default {
    props : ['tagBlog', 'tagName'],
    components :{
        TagArticle
    },
    methods : {
        switchContent(content){
            this.$emit('switchContent', content)
        },
        selectedArticleData(payload){
            this.$emit('selectedArticleData', payload)
        }
    },
    computed : {
        isEmpty(){
            if(this.tagBlog.length === 0){
                return true
            }else{
                return false
            }
        }
    }
}
</script>

<style>

</style>