<template>
  <div class="flex-column" style=" height: 90vh; overflow: auto;">
    <div class="main-content flex flex-wrap justify-center">
      <div class="w-full flex justify-center" style="height: 50px">
        <button class="hover:bg-green-400 text-gray-200 rounded p-2 my-2" :class="!sort && !mine? 'bg-green-500' : 'bg-green-300'" @click="newestArticles">Newest</button>      
        <button class="hover:bg-green-400 text-gray-200 rounded p-2 my-2" :class="sort && !mine? 'bg-green-500' : 'bg-green-300'" @click="topArticles">Top</button>
        <button class="hover:bg-green-400 text-gray-200 rounded p-2 my-2" :class="mine? 'bg-green-500' : 'bg-green-300'" @click="myArticles">Mine</button>      
      </div>
      <div v-show="articles.length === 0">No data found</div>
      <div v-for="article in articles" :key="article._id" class="article-card flex-column w-4/5 md:w-1/3 m-8 rounded shadow-2xl" style="max-height: 80vh;">
        <div class="flex border border-gray-500 pic-frame" style="height: 50%;">
          <img :src="article.image ? article.image : defaultPic " alt="image" style="object-fit: contain; margin: 0 auto; height: 100%;">
        </div>
        <div class="card-body flex flex-wrap p-2" style="height:50%;">
          <h2 @click="showArticle( article.slug )" class="hover:text-blue-800 cursor-pointer w-full font-bold">{{article.title}}</h2>
          <small>{{ article.owner.name ? article.owner.name : null }}</small>
          <small class="w-full">{{ dateString(article.createdAt)}}</small>
            <small class="w-full">viewed: {{article.reads}}</small>
          <hr>
          <div class="flex p-1 flex-wrap items-end" style="height:50%;">
            <div class="my-2 w-full" v-html="summary(article.content)" style="height:50%; overflow:auto;"></div>
            <div class="w-full"><span style="text-decoration: underline; cursor: pointer;" @click="showArticle(article.slug)">See more</span></div>
            <div class="display flex w-full"><div v-for="(tag, index) in article.tags" :key="index" class=" rounded p-1 m-1 bg-blue-200 text-gray-800 hover:bg-blue-300 cursor-pointer" @click="setTag(tag)">{{tag}}</div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <button class="p-2 m-1" :class="page > 0 ? 'bg-blue-300 hover:bg-blue-400 cursor-pointer' : 'cursor-not-allowed bg-gray-200'" @click="page > 0 ? page -- : null">Prev</button>
      <button class="p-2 m-1 bg-white text-gray-900">{{page + 1}}</button>
      <button class="p-2 m-1" :class="articles.length >= 5 ? 'bg-blue-300 hover:bg-blue-400 cursor-pointer': 'cursor-not-allowed bg-gray-200'" @click="articles.length >=5 ? page++ : null">Next</button>
    </div>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
  name: 'articleList',
  data() {
    return {
      defaultPic: 'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png',
      articles : [],
      sort: null,
      mine: false,
      page: 0
    }
  },
  props: ['keyword'],
  methods: {
    topArticles () {
      this.mine = false
      this.sort = '&sort=popular'
    },
    newestArticles () {
      this.mine = false
      this.sort = null
      if(this.keyword){
        this.getArticles(this.keyword)
      } else {
        this.getArticles()
      }
    },
    setTag(tag) {
      this.keyword = tag
    },
    myArticles () {
      this.mine = true
      this.getArticles()
    },
    getArticles (query) {
      let keyword = ''
      let url = `/articles?page=${this.page}&status=published`
      if(query) {
        url += `&keyword=${query}` 
      }

      if(this.sort) url += `${this.sort}`
      if(this.mine) url += '&whose=mine'
      url += ``
      axios({
        method: 'GET',
        url: `${url}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
          this.articles = data
      })
      .catch(({ response }) => {
        // error alert
        this.$noty.error(response.data.message)

      })
    },
    showArticle (slug) {
      this.$router.push(`articles/${slug}`)
    },
    summary (content) {
      if(content.length > 200) {
        return content.slice(0,200) + '...'
      } else {
        return content
      }
    },
    dateString (date) {
      return new Date(date).toDateString()
    }
  },
  created () {
    if(!this.keyword) {
      this.getArticles()
    } else {
      // console.log(this.keyword, 'article list');
      this.getArticles(this.keyword)
    }
  },
  watch: {
    keyword () {
      this.getArticles(this.keyword)
    },
    sort () {
      if(this.keyword){
        this.getArticles(this.keyword)
      } else {
        this.getArticles()
      }
    },
    page () {
      if( this.keyword) {
        this.getArticles(this.keyword)
      } else {
        this.getArticles()
      }
    }
  },
}
</script>

<style>
.pic-frame {
background-color: #ffffff;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(0,683,318)'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%23e8ffed'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='300' height='250' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
background-size: cover;
}
h2 {
  font-size: 15px;
}
</style>