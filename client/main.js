const app = new Vue({
    el: "#app",
    data: {
        searchKeyword: '',
        articles: [], //article 5 biji yang dihalaman 1// semua artikel yang ada di db
        isFound: false
    },
    methods: {
        getArticles() {
            // axios ambnil data dr json
            axios({
                method: "get",
                url: "http://localhost:3000/articles"
            })
                .then(({ data }) => {
                    this.articles = data
                })
                .catch(err => {
                    console.log(err);
                })
        },
        searchArticleByTitle() {
            console.log(this.searchKeyword);
            axios({
                method: "get",
                url: `http://localhost:3000/articles/?title=${this.searchKeyword}`
            })
                .then(({ data }) => {
                    isFound = true
                    this.articles = data;
                    console.log(this.articles);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    created () {
        this.getArticles()
    }
})