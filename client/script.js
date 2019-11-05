const app = new Vue({
    el: '#app',
    data:{
        username: "",
        password: "",
        search: "",
        isLogin: false,
        articles: []
    },
    methods:{
        getArticle(){
            axios({
                methods: 'get',
                url: 'http://localhost:3000/articles'
            })
            .then(response=>{
                this.articles = response.data;
                this.url = response.data[0].url
                console.log(response.data)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        searchArticle(){

        },
        login(){
            axios({
                url: 'http://localhost:3000/users',
                method: 'POST',
                data:{
                    username: this.username,
                    password: this.password
                }
            })
            .then(response=>{
                console.log('Berhasil Login')
                this.getArticle()
                this.isLogin = true
                this.username = ''
                this.password = ''
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    computed: {
        filteredList() {
            return this.articles.filter(post => {
                return post.title.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    }
})