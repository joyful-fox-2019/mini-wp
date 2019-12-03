<template>
  <div style="margin-top:30px;">
    <div class="card is-horizontal">
      <div class="card-image">

        <figure class="image is-3by2">
          <img :src="dataarticle.img" alt="this used to be photo">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{dataarticle.title}}</p>
            <p class="subtitle is-6">{{dataarticle.owner.name}}</p>
            <time datetime="2018-5-8">{{formatDate}}</time>
          </div>
        </div>

        <div class="content">
          <truncate clamp="Show More" :length="100" less="Show Less" type="html"
          :text="dataarticle.content"></truncate>
          <br>
          <div class="field is-grouped is-grouped-multiline">
            <div class="control">
            tags:
              <b-tag v-for="(tag, index) in tags" :key="index" rounded class="tag is-dark" style="margin-right:5px;">{{tag}}</b-tag>
            </div>
          
          </div>
        </div>

        <div class="media-right">
        <b-button type="is-info" icon-right="pencil" @click="handleupdate">update</b-button>
        <b-button type="is-danger" icon-right="delete" @click="handledelete(dataarticle._id)">delete</b-button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import truncate from 'vue-truncate-collapsed';
import Swal from 'sweetalert2';
import moment from "moment";
import axios from "../config/axios"
export default {
  name:'Cardarticle',
  data(){
    return{
      tags: this.dataarticle.tag
    }
  },
  props:['dataarticle'],
  components: {
    truncate
  },
  computed:{
    formatDate: function() {
      return moment(this.dataarticle.createdAt).fromNow()
    }
  },
  methods: {
    handledelete(id){
      axios({
        method:'delete',
        url:`/article/${id}`
      })
        .then(({ data }) => {
          Swal.fire({
            type: 'success',
            title: `success delete`
          })
          this.$emit('deletearticle')
        })
        .catch(({ response }) => {
          this.next(response.data)
        })
    },
    handleupdate(){
      this.$emit('dataupdate', this.dataarticle)
    }
  }
}
</script>

<style scoped>
  .card .media:not(:last-child) {
  margin-bottom: 0.75rem;
}
.card.card--reverse-order {
  flex-direction: row-reverse;
}
.card.is-horizontal {
  display: flex;
  flex-basis: 50ex;
  flex-grow: 0;
  flex-shrink: 1;
}
.card.is-horizontal .card-image {
  flex: 4;
  flex-shrink: 1;
}
.card.is-horizontal .card-image .image {
  display: block;
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.card.is-horizontal .card-image .image img {
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.card.is-horizontal .card-content {
  flex: 3;
}
</style>