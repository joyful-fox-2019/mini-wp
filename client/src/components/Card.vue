<template>
  <div class="card">
      <div class="card-content">
        <div class="columns" >
          <div class="column is-four-fifths" id="card-content">
                <div v-if="creator">
                  <div>
                    <a class="action" @click="editArticle">edit</a> ||
                    <a class="action" @click="deleteArticle">delete</a>
                  </div>
                </div>
                <div v-if="bookmark">
                  <div>
                    <a class="action" @click="removeBookmark">Remove from bookmark</a>
                  </div>
                </div>
            <div id="head"  style="cursor:pointer" @click="goToArticle">
              <p class="card-header-title">
                {{article.title}}
              </p>
              <div class="content">
                <div v-html="truncatePreview"></div>
                <!-- <br> -->
              </div>
            </div>
            <div id="footer">
              <p id="author">{{article.userId.username}}</p>
              <p id="moment">{{article.createdAt}} - 2 mins read</p>
              <div v-for="(tag,i) in article.tags" :key="i" style="display: inline">
                <span class="tagCard">{{ tag }}</span>
              </div>
              <b-tooltip label="Bookmark this article to read later"
                  style="float : right"
                  type="is-dark"
                  :animated=true
                  position="is-bottom">
                  <div @click="addBookmark">
                    <b-icon v-if="!creator"
                    style="cursor: pointer"
                        icon="bookmark">
                    </b-icon>
                  </div>
              </b-tooltip>
              <!-- <b-button type="is-info">Info</b-button> -->
            </div>
            
          </div>
          <div class="column" style="cursor:pointer" @click="goToArticle">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="article.image">
              </figure>
            </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import truncate from 'truncate-html'
import axios from '../../config/axios'

export default {
  name: 'card',
  props : ['article','creator','bookmark'],
  methods : {
    goToArticle(){
      console.log('trigerred' + ' ' + this.article.slug)
      this.$router.push({path : `/${this.article.slug}`})
    },
    editArticle(){
      console.log(this.article._id)
      this.$router.push({path : `/edit/${this.article._id}`})
      console.log('masuk edit')
    },
    deleteArticle(){
      console.log(this.article._id)
      let articleId = this.article._id
      axios({
        method : 'delete',
        url : `/articles/remove/${articleId}`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          console.log(data);
          this.$emit('fetchDraft')
        })
        .catch((err)=>{
          console.log(err)
        })
      console.log('masuk delete')
    },
    addBookmark(){
      let articleId = this.article._id
      axios({
        url : `/articles/addbookmark/${articleId}`,
        method : 'patch',
        headers : {
          token : localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          console.log(data)
        })
        .catch((err)=>{
          console.log(err.response.data)
        })
    },
    removeBookmark(){
      console.log('masuk')
      let articleId = this.article._id
      axios({
        url : `/articles/removebookmark/${articleId}`,
        method : 'patch',
        headers : {
          token : localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          console.log(data)
          this.$emit('fetchBookmark')
        })
        .catch((err)=>{
          console.log(err.response.data)
        })
    }
  },
  computed : {
    truncatePreview(){
      truncate.setup({ stripTags: true, length: 130 })
      return truncate(this.article.content)
    }
  }

}
</script>

<style scoped>
.card{
  width: 100%;
  height: 11rem;
}
.card-header-title{
  padding: 5px !important
}
.card-content{
  padding: 5px 2vh !important;
  height: 100% !important;
}
.columns{
  height: 110% !important
}
#card-content{
  display: flex;
  flex-direction: column;
  justify-content:  space-between
}
.tagCard{
  font-size: 8px;
  background-color: rgba(94, 94, 94, 0.384);
  padding: 5px;
  border-radius: 3px;
  margin-right: 3px
}
#author{
  font-size: 12px;
  cursor: pointer;
}
#moment{
  font-size: 10px
}
#footer{
  margin-top: 10px
}
.action{
  background-color: gray;
  font-size: 12px;
  padding: 2px;
  border-radius: 3px;
  color: white;
}
</style>