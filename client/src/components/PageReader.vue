<template>
  <div>
    <div class="container" id="image-container" >
      <div class="container" id="detail-image" v-for="(article, i) in articles" :key="i">

        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <!-- <a @click="isCardModalActive = true; index = i" href="#"> -->
                <img
                  :src="article.featured_image[0]"
                  alt="Placeholder image"
                />
              <!-- </a> -->
            </figure>
            <div class="contents">

              <h2 style="font-weight:bold; font-size:22px">{{article.title}}</h2>
              <hr style="margin-top:10px; margin-bottom:10px">
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../apis/server'

export default {
  name: "pageReader",
  data () {
    return {
      articles: [],
      loadingComponent: ''
    }
  },
  methods: {
    openLoading(){
      this.loadingComponent = this.$buefy.loading.open({
        container: true ? null : this.$refs.element.$el
      })
    },
    closeLoading(){
      this.loadingComponent.close()
    },
    fetchReader(){
      this.openLoading()      
      axios({
        method: 'get',
        url: '/article',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.articles = data
          this.closeLoading()
        })
        .catch(err => {
          this.closeLoading()
          this.$buefy.toast.open({
            duration: 5000,
            message: err.response.data.errors.join(', '),
            position: 'is-top',
            type: 'is-danger'
          })
        })
    }
  },
  mounted(){
    this.fetchReader()
  }
}
</script>

<style>
/* #image-container {
  display: flex;
  flex-wrap: wrap;
} */
</style>