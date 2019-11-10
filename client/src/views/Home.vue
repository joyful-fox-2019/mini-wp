<template>
  <div class="mt-2">
    <div class="container-fluid mt-3">
      <!-- row -->
      <div class="row">
        <div class="col-sm-7 p-2">
          <BigImage :firstArticle="firstArticle"></BigImage>
        </div>
        <div class="col-sm p-2">
          <div class="d-flex flex-column justify-content-between" id="secondaryContainer">
            <SecondImage v-for="article in secondThirdArticle" :key="article._id" :article="article"></SecondImage>
          </div>
        </div>
      </div>
    </div>

    <!-- Latest news -->
    <div class="m-5">
      <h4 class="tag">
        <a href="#" class="link">Latest News > </a>
      </h4>
      <div class="d-flex flex-wrap justify-content-between" style="width:100%">
        <TinyArticle v-for="article in otherArticles" :key="article._id" :article="article"></TinyArticle>       
      </div>
    </div>

    <div class="m-5 d-flex flex-wrap justify-content-between">
      <TagArticle v-for="(tag, index) in articleTags" :key="index" :tag="tag"></TagArticle>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import axiosNpm from '../config/axios'
import BigImage from '../components/BigImage.vue'
import SecondImage from '../components/SecondImage.vue'
import TinyArticle from '../components/TinyArticle.vue'
import TagArticle from '../components/TagArticle.vue'
import Swal from 'sweetalert2'

export default {
  data(){
    return{
      firstArticle: {
        user_id: {
          name: ''
        }
      },
      secondThirdArticle: [],
      otherArticles: '',
      articleTags: []
    }
  },
  methods:{
    fetchArticles(){
      Swal.fire({
        title: 'Fetching data',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading()}
      })
      axiosNpm({
        url: '/articles',
        method: 'get'
      })
        .then(({data})=>{
          Swal.close()
          this.firstArticle = data[0]
          this.secondThirdArticle.push(data[1], data[2])
          this.otherArticles = data.slice(3, 7)
        })
        .catch(err=>{
          Swal.fire(
            'Oops, something happend',
            'cant fetch data from server',
            'error'
          )
          console.log(err)
        })
    },
    fetchTechnology(){
      return axiosNpm({
        url: '/articles/tag/technology',
        method: 'get'
      })
    },
    fetchMilitary(){
      return axiosNpm({
        url: '/articles/tag/military',
        method: 'get'
      })
    },
    fetchDocument(){
      return axiosNpm({
        url: '/articles/tag/document',
        method: 'get'
      })
    },
    fetchPolitics(){
      return axiosNpm({
        url: '/articles/tag/politics',
        method: 'get'
      })
    },
    fetchBusiness(){
      return axiosNpm({
        url: '/articles/tag/business',
        method: 'get'
      })
    },
    fetchhealth(){
      return axiosNpm({
        url: '/articles/tag/health',
        method: 'get'
      })
    }
  },
  created(){
    this.fetchArticles()
    axios.all([
      this.fetchTechnology(),
      this.fetchMilitary(),
      this.fetchDocument(),
      this.fetchPolitics(),
      this.fetchBusiness(),
      this.fetchhealth()
    ])
      .then(axios.spread((technology, military, document, politics, business, health)=>{
        this.articleTags.push(
          {
            tag: 'business',
            data: business.data
          },
          {
            tag: 'document',
            data: document.data
          },
          {
            tag: 'politics',
            data: politics.data
          },
          {
            tag: 'military',
            data: military.data
          },
          {
            tag: 'health',
            data: health.data
          },
          {
            tag: 'technology',
            data: technology.data
          },)
      }));
  },
  components:{
    BigImage,
    SecondImage,
    TinyArticle,
    TagArticle
  },
  props:['tags']
}
</script>

<style>

</style>