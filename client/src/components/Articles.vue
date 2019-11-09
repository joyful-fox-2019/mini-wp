<template>
  <div>
      <div class="pb-2 my-2">
        <h2 class="font-weight-bold">{{articleParent.title}}</h2>
        <p>Created at {{date}}</p>
        <p>Tags : <a href="#">{{articleParent.tag}}</a></p>
        
        <div class="imgContainer my-2  d-flex justify-content-center">
          <img :src="articleParent.featured_image" class="w-75" style="object-fit: contain;" height="400">
        </div>
        <div class="p-2 text-justify" v-html="articleParent.content">
        </div>
      </div>
      <hr>
</template>

<script>
export default {
    props : ['articleParent'],
    data(){
        return{

        }
    },
    computed : {
        date(){
              Date.prototype.toISODate = function() {
                return this.getFullYear() + '-' +
                       ('0'+ (this.getMonth()+1)).slice(-2) + '-' +
                       ('0'+ this.getDate()).slice(-2);
              }
              return new Date(this.articleParent.createdAt).toISODate();
        }
    }
}
</script>

<style>

</style>