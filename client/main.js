let app = new Vue({
  el: '#app',
  data: {
    posts: [],
    keyword: ''
  },
  methods:{
    getPost: function(){
      axios({
        method: 'get',
        url: 'http://localhost:3000/posts'
      })
      .then(response => {
        this.posts = response.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    filteredList(){
      return this.posts.filter((post)=>{
        return post.title.toLowerCase().includes(this.keyword.toLowerCase())
      })
    }
  },
  created () {
    this.getPost()
  }
})
