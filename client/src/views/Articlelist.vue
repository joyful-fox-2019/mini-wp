<template>
  <div>
    <h2 class="mt-2 mb-4">
      <b></b> Post List ( Article List )
    </h2>
    <div>
      
      <!-- Data Header -->
      <b-row no-gutters>
        <b-col>
          <b-card class="mb-2 border-info" style="font-size:17px;">
            <b-row class="text-dark align-items-center">
              <b-col class="border-right text-center" cols="1">
                <b>No.</b>
              </b-col>
              <b-col class="border-right text-center" cols="5">
                <b>Article Title</b>
              </b-col>
              <b-col class="border-right text-center" cols="3">
                <b>Date Published</b>
              </b-col>
              <b-col class="text-center" cols="3">
                <b>Tag</b>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <!-- Article List -->
      <Articlelistbar
        v-for="(data,index) in articleData"
        :key='index'
        :title="data.title"
        :date="moment(data.createdAt).format('dddd, MMMM Do YYYY')"
        :tags="data.tags"
        :articleId="data._id"
        :no="index+1"
      ></Articlelistbar>

    </div>
  </div>
</template>

<script>
import Articlelistbar from '../components/Articlelistbar'
import axios from '../config/getdata'

export default {
  name: 'Articlelist',
  data() {
    return {
      articleData: []
    };
  },
  components:{
    Articlelistbar
  },
  methods: {
    gotoDetail(_id) {
      this.$router.push({ path: `/admin/edit-article/${_id}`});
    },
    fetchData(){
      axios({
        method: 'get',
        url: '/articles/userArticle',
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.articleData = data
      })
      .catch(err => {
        console.log(err)
        console.log(err.response)
        this.next(err.response.data)
      })
    }
  },
  created(){
    this.fetchData()
  }
}
</script>

<style>
</style>