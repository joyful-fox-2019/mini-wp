new Vue({
  el: '#app',
  data: {
    articleList: true,
    addForm: false,
    editForm: false,
    title: '',
    content: '',
    articles: [],
    article: {},
    filteredArticles: [],
    articleSearch: ''
  },
  methods: {
    getArticles() {
      axios({
        method: 'get',
        url: 'http://localhost:3000/article'
      })
        .then(response => {
          response.data.forEach(article => article.createdAt = new Date(article.createdAt).toDateString())
          this.articles = response.data
          this.filteredArticles = this.articles
        })
        .catch(err => {
          console.log(err)
        })
    },
    showEditor() {
      this.articleList = false
      this.editForm = false
      this.addForm = true
    },
    addArticle() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/article',
        data: {
          title: this.title,
          content: this.content
        }
      })
        .then(response => {
          response.data.createdAt = new Date(response.data.createdAt).toDateString()
          this.articles.push(response.data)
          this.addForm = false
          this.editForm = false
          this.getArticles()
          this.articleList = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteArticle(key) {
      axios({
        method: 'delete',
        url: `http://localhost:3000/article/${key}`
      })
        .then(response => {
          this.getArticles()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getArticle(key) {
      axios({
        method: 'get',
        url: `http://localhost:3000/article/${key}`
      })
        .then(response => {
          this.article = response.data
          this.articleList = false
          this.addForm = false
          this.editForm = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateArticle(key) {
      axios({
        method: 'put',
        url: `http://localhost:3000/article/${key}`,
        data: {
          content: event.target['1'].value
        }
      })
        .then(response => {
          console.log(response)
          this.editForm = false
          this.addForm = false
          this.getArticles()
          this.articleList = true
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch :{
    articleSearch(query) {
      if(!query) {
        this.getArticles()
      } else {
        this.filteredArticles = this.articles.filter(
          article => article.title.toLowerCase().includes(query.toLowerCase())
        )
      }
    }
  },
  created() {
    this.getArticles()
  }
})


