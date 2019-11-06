const app = new Vue ({
  el: "#app",
  data : {
    message : 'Hello Vue!',
    articles : [],
    searchTitle : '',
    baseUrl : `http://localhost:3000`
  },

  methods : {
    changeMessage : function() {
      this.message = "Welcome to Womanizer Mini-WP"
    },
    selectedArticle() {
      axios({
        method: 'get',
        url:`${this.baseUrl}/articles?title=${this.searchTitle}`
      })
      .then(({ data }) => {
        this.articles = data        
      })
      .catch(err => {
        console.log(err)
      })
    },
    fetchArticle() {
      axios({
        method: 'get',
        url:`${this.baseUrl}/articles?title=${this.searchTitle}`
      })
      .then(({ data }) => {
        this.articles = data
      })
    }
  },
  created() {
    this.fetchArticle() 
  },
  computed: {
    filteredArticles: function () {
      console.log(this.articles.filter(el => {
        el.title.includes(this.searchTitle)
      }), "<<")
      //regex match
      return this.articles
    }
  }

})