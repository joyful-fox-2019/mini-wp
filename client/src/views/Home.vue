<template>
  <div>
    <b-container style="margin-top: 3vh;">
      <b-row class="no-gutters">
        <Bigimage
          v-for="(data,index) in items.slice(0, 2)" 
          :key="index"
          :imglink="data.imgUrl"
          :title="data.title"
          :author="data.UserId.name"
          :date="moment(data.createdAt).format('dddd, MMMM Do YYYY')"
          v-on:click.native="toArticle(data.slug)"
        ></Bigimage>
      </b-row>
      <b-row class="mt-4">
        <b-col cols="12" md="8" >
          <div class="border-bottom border-info mt-2 mb-4">
            <div class=" card-body pb-1 pl-0">
              <span class="m-0 bg-info p-2 text-white" style="font-size:18px">Article this day</span>
            </div>
          </div>
          <div>
            
          </div>
          <Articleitem
            v-for="(data,index) in articleData"
            :key="index"
            :imglink="data.imgUrl"
            :author="data.UserId.name"
            :description="data.description"
            :date="moment(data.createdAt).format('dddd, MMMM Do YYYY')"
            :title="data.title"
            :id="data._id"
            v-on:click.native="toArticle(data.slug)"
          ></Articleitem>
        </b-col>
        <b-col class="d-none d-sm-block" md="4">
          <Taglist
            class="mt-5 pl-3"
            :tags="tagData"
          ></Taglist>
        </b-col>
      </b-row>
      <b-row>
      <b-col md="6" class="my-1 mb-4">
        <b-pagination
          @change="onPageChanged"
          :total-rows="totalRows"
          :per-page="perPage"
          v-model="currentPage"
          class="my-0"
          variant="info"
        />
      </b-col>
    </b-row>
    </b-container>
    <b-container fluid class="p-0 mt-1 mt-md-4">
      <Footeritem
      ></Footeritem>
    </b-container>
  </div>
</template>

<script>
import Footeritem from '../components/Footeritem'
import Bigimage from '../components/Bigimage'
import Articleitem from '../components/Articleitem'
import Taglist from '../components/Taglist'
import axios from '../config/getdata'

export default {
  components:{
    Footeritem,
    Bigimage,
    Articleitem,
    Taglist
  },
  data(){
    return{
      articleData: [],
      tagData: [],
      currentPage: 1,
      perPage: 8,
      totalRows: 1,
      items: []
    }
  },
  mounted() {
    this.paginate(this.perPage, 0);
  },
  methods:{
    paginate(page_size, page_number) {
      let itemsToParse = this.items;
      this.articleData = itemsToParse.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
    },
    onPageChanged(page) {
      console.log(this.articleData)
      this.paginate(this.perPage, page - 1);
    },
    toArticle(slug){
      console.log("masuk")
      this.$router.push({path:`/article/${slug}`})
    },
    fetchDataArticle(){
      axios({
        url: '/articles',
        method: 'get'
      })
      .then(({ data }) => {
        console.log(data)
        this.items = data
        this.articleData = data
        this.totalRows = data.length
        this.paginate(this.perPage, 0);
      })
      .catch(err => {
        console.log(err.response.data)
        this.next(err.response.data)
      })
    },
    fetchTags(){
      axios({
        url: '/articles/tagCounter',
        method: 'get'
      })
      .then(({ data }) => {
        console.log(data)
        this.tagData = data
      })
      .catch(err => {
        console.log(err.response.data)
        this.next(err.response.data)
      })
    }
  },
  created(){
    this.fetchDataArticle()
    this.fetchTags()
  }
}
</script>

<style>
  .card-title{
    margin:0 !important;
  }
</style>