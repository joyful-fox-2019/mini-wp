<template>
  <div>
    <p class="title">Your Contents</p>
    <b-field 
      position="is-centered"
      label="Title"
      :label-position="labelPosition"
      >
        <b-input v-model="inputsearch" icon="magnify" placeholder="Search Title" expanded></b-input>
        <p class="control">
          <button class="button is-info" @click.prevent="searchtitle">Search</button>
        </p>
    </b-field>
      <Cardarticle v-for="(article, index) in articles" :key="index" :dataarticle="article" @deletearticle="del" @dataupdate="updatedata"></Cardarticle>
  </div>
</template>

<script>

import Cardarticle from "../components/cardarticle";
import axios from "../config/axios";
import Swal from "sweetalert2";

export default {
  name: 'Article',
  data(){
    return {
      labelPosition: 'on-border',
      articles: [],
      inputsearch: ''
    }
  },
  components: {
    Cardarticle
  }, 
  methods: {
    fetchData(){
      Swal.showLoading()
      axios({
        method:'GET',
        url:`/article/user`
      })
        .then(({ data }) => {
          Swal.close()
          
          this.articles= data
        })
        .catch(({response}) => {
          this.next(response.data)
        })
    },
    searchtitle(){
      axios({
        method:'GET',
        url:`article/search?q=${this.inputsearch}`
      })
        .then(({data}) =>{
          this.articles = data
        })
        .catch(({response}) => {
          this.next(response.data)
        })
    },
    del(){
      this.fetchData()
    },
    updatedata(dataarticle){
      this.$emit('bawadataupdate', dataarticle)
    }
  },
  created(){
    this.fetchData()
  },
  mounted(){
    this.fetchData()
  },
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
</style>>


