<template>
  <div>
   <!-- one storyline -->
                  <div class="columns story-list"> 
                      <div class="column is-10">
                        <p style="font-size: 22px;">  
                            <br>
                          <B><i> {{article.title}} </i></B>
                        </p>
                        <p>
                          {{article.content}}
                          </p>
                          <br>
                                  <!-- group tags -->
                        <div  class="field is-grouped is-grouped-multiline">
                            <div v-for="tag in article.tags" :key="tag._id" class="control">
                              <div class="tags has-addons">
                                <span class="tag">on</span>
                                <span class="tag is-primary" style="background-color: rgba(9, 87, 90, 0.514);">{{tag}}</span>
                              </div>
                            </div>
                          </div>
                          <!-- end goup tags -->
                      </div>
                    <div class="column is-2">
                        <figure class="image is-square"> 
                            <img class="is-rounded" :src="article.imgSrc">
                          </figure>
                    </div>
                  </div>
                  <!-- end one story line  -->
  </div>
</template>

<script>
export default {
  props : {
    article: Object
  }
}
</script>

<style>

</style>