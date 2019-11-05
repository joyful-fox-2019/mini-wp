const article = axios.create({
    baseURL: 'http://localhost:3000/articles'    
});

const app = new Vue({
    el: '#app',
    data : {
        // bekerja seperti attributes
        articles : [],
        article : {},
        search : '',
        },
    methods : {
        // bekerja seperti intance method
        getArticles(){
            article
                .get()
                .then (({data}) => {
                    this.articles = data
                })
        },
        updateArticle(id) {
            article.
                get(`/${id}`)
                .then(article => {
                    this.article = article
                    console.log(article)
                })
            
        },
        deleteArticle(id) {
            console.log(id)
        }        
    },
    created() {
        // ini hooks
        this.getArticles()
    },
    computed : {
        // computed bekerja seperti getter
        fiteredArticle() {
            return this.articles.filter((article) => {
                return article.title.includes(this.search)
            }) 
        }
    }
})
