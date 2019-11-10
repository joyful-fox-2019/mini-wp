<template>
  <div>
    <div class="title t-standard font-article" style="font-size: 30px !important;">
      {{ article.title }}
    </div>
    <div class="subtitle t-lighten has-margin-t">
      {{ article.subtitle }}
    </div>
    <div class="has-margin-t t-standard">
      <div class="columns is-vcentered">
        <div class="column is-narrow">
          <button class="button is-rounded bg-primary-gradient font-content">
            <b>
              {{ userInitial }}
            </b>
          </button>
        </div>
        <div class="column">
          {{ fullName }}
        </div>
        <div class="column is-narrow">
          <button v-if="String(article.user._id) === String(userId)" @click="toUpdate" class="button bg-primary-gradient font-content">
            <span class="icon">
              <i class="fas fa-pen"></i>
            </span>
          </button>
        </div>
        <div class="column is-narrow">
          <button v-if="String(article.user._id) === String(userId)" @click="deleteArticle" class="button bg-surface font-content">
            <span class="icon">
              <i class="fas fa-trash"></i>
            </span>
          </button>
        </div>
      </div>  
    </div>
    <div class="has-margin-t-2">
      <figure class="image is-4by3">
        <img :src="article.image">
      </figure>
    </div>
    <div v-html="description" class="has-margin-t font-article t-darkest">
    </div>
  </div>
</template>

<script>
import axios from '../../helpers/axios'

export default {
  name: 'DetailArticleContent',
  props: {
    article: Object,
    isDark: Boolean
  },
  data () {
    return {
      userId: localStorage.getItem('_id')
    }
  },
  methods: {
    toUpdate () {
      this.$router.push(`${this.$route.fullPath}/update`)
    },
    deleteArticle () {
      this.$buefy.dialog.confirm({
        title: 'Deleting article',
        message: 'Are you sure you want to <b>delete</b> this article? This action cannot be undone.',
        confirmText: 'Delete Article',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          axios.delete(`/articles/${this.article._id}`, {
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
            .then(({ data }) => {
              console.log(data)
              this.$buefy.toast.open('Article deleted!')
              this.$router.push('/')
            })
            .catch(err => {
              this.$emit('alert', err)
            })
        }
      })
    }
  },
  computed: {
    userInitial () {
      return this.article.user.firstName.substring(0, 1).toUpperCase()
    },
    fullName () {
      return `${this.article.user.firstName} ${this.article.user.lastName}`
    },
    description () {
      if(this.isDark) {
        return this.article.description.split('color: rgb(0, 0, 0)').join('color: rgb(255, 255, 255)')
      } else {
        return this.article.description
      }
    }
  }
}
</script>

<style>

</style>