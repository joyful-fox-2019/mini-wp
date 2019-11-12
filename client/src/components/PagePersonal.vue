<template>
  <div>
    <br>
    <div class="container" id="image-container" >
      <div class="columns" style="flex-wrap:wrap;" id="detail-image">

        <div class="column is-one-third" v-for="(article, i) in articles" :key="i">
          <div class="card-image">
            <figure class="image is-4by3">
              <a @click="isCardModalActive = true; index = i" href="#">
                <img
                  :src="article.featured_image[0]"
                  alt="Placeholder image"
                />
              </a>
            </figure>
            <div class="contents">
              <h2 style="font-weight:bold; font-size:22px">{{article.title}}</h2>
              <b-taglist>
                <b-tag v-for="(tag, i) in article.tags" :key="i" type="is-info">{{tag}}</b-tag>
              </b-taglist>
              <b-button type="is-danger" @click="remove(article._id)">Delete</b-button>
              <b-button type="is-success" @click="update(article)">Update</b-button>
              <br>
            </div>
          </div>
        </div>

      </div>
    </div>

    <b-modal :active.sync="isCardModalActive" :width="1000" scroll="keep">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
              <img
                :src="articles[index].featured_image[0]"
                alt="Image"
              />
          </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left"></div>
                <div class="media-content" style="display:flex; justify-content:center;flex-direction:column;">
                  <div class="content-text">
                    <h3 style="font-size:36px">{{ articles[index].title }}</h3>
                    <br><hr><br>
                    <h3 style="font-style:italic">content :</h3>
                    <br>
                    <h3 v-html="articles[index].content"></h3>
                    <br><hr><br>
                    <i class="fas fa-user-tie"></i><a style="margin-right:25px">  Owner : {{ articles[index].author.username }} </a><a style="margin-right:25px"> </a><i class="far fa-envelope"></i>  {{ articles[index].author.email }}
                    <template>
                      <br><hr><br>
                      <h3 style="font-style:italic">tags :</h3>
                      <br>
                      <b-taglist>
                        <b-tag v-for="(tag, i) in articles[index].tags" :key="i" type="is-info">{{tag}}</b-tag>
                      </b-taglist>
                    </template>
                    <br><hr><br>
                  </div>

                  <div v-if="articles[index].featured_image.length > 1">
                    <br><hr><br>
                    <h3 style="font-style:italic">galery :</h3>
                    <br>
                    <div v-for="(foto, i) in articles[index].featured_image" :key="i">
                      <div class="card-image">
                        <figure class="image is-4by3" >
                          <img
                            :src="foto"
                            alt="Image"
                          />
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </b-modal>

  </div>
</template>

<script>
import axios from '../../apis/server'

export default {
  name: "pagePersonal",
  data () {
    return {
      articles: [],
      index: 0,
      loadingComponent: '',
      isCardModalActive : false
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
    fetchPersonal(){
      this.openLoading()
      axios({
        method: 'get',
        url: '/article/personal',
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
    },
    remove(id){
      this.openLoading()
      axios({
        method: 'delete',
        url: `/article/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.closeLoading()
          this.$buefy.toast.open({
            message: 'Delete Success!',
            type: 'is-success'
          })
          this.fetchPersonal()
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
    },
    update(data){
      this.$emit('update', data)
      this.$emit('changePage', 'update')
    }
  },
  mounted(){
    this.fetchPersonal()
  }
}
</script>

<style>

</style>