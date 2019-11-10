<template>
  <!-- READERS-->
  <div class="articles">

    <div class="readers row">
      <div class="col">
        <div class="card">
          <div v-if="article.imageUrl" class="card-image">
            <img :src="article.imageUrl" alt="header-image" />
            <span class="card-title"></span>
          </div>
          <div class="article-title">
            <a><h4 v-if="article.title">{{article.title}}</h4></a>
            <div class="button-container">
              <button
                @click="$emit('update-article', article._id)"
                class="btn waves-effect waves-light">
                <img src="https://cdn.pixabay.com/photo/2017/06/06/00/33/edit-icon-2375785_960_720.png" alt="edit-icon">  
              </button>

              <button
                @click="$emit('delete-article', article._id)"
                class="btn waves-effect waves-light">
                <img src="http://cdn.onlinewebfonts.com/svg/img_117750.png" alt="delete-icon">  
              </button>
            </div>
          </div>
          <div class="card-content" v-html="article.content"></div>
          <div v-if="article.author" class="card-action valign-wrapper">
            <img 
              v-if="article.author && article.author.picture"  
              class="gravatar" 
              :src="article.author.picture" 
              alt="gravatar" 
              />
            <img 
              v-else="" 
              class="gravatar" 
              src="../assets/undraw_jason_mask_t07o.svg" 
              alt="user-picture"
              />
            <div class="blog-link">
              <a>{{article.author.name}}</a>
              <!-- <a :href="article.blog.link">{{article.blog.name}}</a> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "article-item",
  props: ['article']
};
</script>

<style scoped>
  .article-title {
    display: flex;
    justify-content: space-between;
  }

  .button-container {
    padding: 15px;
  }

  .btn {
    background-color: white;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    padding: 0;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  button > img {
    height: 40px;
    width: 40px;
  } 
</style>