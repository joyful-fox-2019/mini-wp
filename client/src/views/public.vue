<template>
 <div>
    <publicNavbar  :islogin="islogin"  @changePage="$emit('changePage', $event)" ></publicNavbar>
    <topArticle @changePage="$emit('changePage', $event)" @articleId="$emit('articleId', $event)" v-if="topArticle.length" :topArticle="topArticle"></topArticle>
    <publicArticleCard @changePage="$emit('changePage', $event)" @articleId="$emit('articleId', $event)" ></publicArticleCard>
     

 </div>
</template>

<script>
import axios from '../config/axios'
import publicNavbar from '../components/public-navbar'
import topArticle from '../components/top-article'
import publicArticleCard from '../components/public-article-card'
import Swal from 'sweetalert2'

export default {
  name: 'public',
  components: {
    publicNavbar,
    topArticle,
    publicArticleCard
  },
  data(){
    return {
      topArticle: [],
    }
  },
  props: ['islogin'],
  methods: {
    fetchTopArticle(){
      Swal.showLoading()
      axios({
        method: 'get',
        url: '/articles/top'
      })
      .then(({data})=>{
        this.topArticle = data
      })
      .catch(({ response }) => {
          this.$noty.error(response.data.message)
      })
      .finally(()=>{
          Swal.close()
      })
    }
  },
  created(){
    this.fetchTopArticle()
  }

}
</script>

<style>


</style>