alertify.defaults.notifier.position = 'top-center'
alertify.defaults.notifier.closeButton = true
new Vue({
    el: '#app',
    data: {
        menuBar: false,
        editorText: false,
        editorButton: false,
        isHome: true,
        articles: [],
        searching: '',
        title: '',
        content: '',
        titleUpdate: '',
        contentUpdate: '',
        idUpdate: ''
    },
    methods: {
        getArticles() {
            axios({
                    url: 'http://localhost:3000/article',
                    method: 'GET'
                })
                .then(({
                    data
                }) => {
                    this.articles = data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        createArticle() {
            let title = this.title
            let content = this.content
            axios({
                    url: 'http://localhost:3000/article',
                    method: 'POST',
                    data: {
                        title,
                        content
                    }
                })
                .then(({
                    data
                }) => {
                    console.log(data)
                    this.articles.push(data)
                    this.editorButton = false
                    this.editorText = false
                    this.isHome = true
                    this.getArticles()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        updateArticle(id) {
            let findedArticle = this.articles.filter((article) => {
                return article._id === id
            })
            this.idUpdate = findedArticle[0]._id
            this.titleUpdate = findedArticle[0].title
            this.contentUpdate = findedArticle[0].content
        },
        updateFinish(id) {
            let title = this.titleUpdate
            let content = this.contentUpdate
            axios({
                    url: `http://localhost:3000/article/${id}`,
                    method: 'PUT',
                    data: {
                        title,
                        content
                    }
                })
                .then(({
                    data
                }) => {
                    // console.log(data)
                    $('#exampleModal').modal('hide')
                    this.isHome = true
                    this.getArticles()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteArticle(id) {
            axios({
                    url: `http://localhost:3000/article/${id}`,
                    method: 'DELETE'
                })
                .then(({
                    data
                }) => {
                    alertify.notify('Deleting success', 'success', 2, function () {
                        console.log('dismissed');
                    });
                    this.getArticles()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        textEditor() {
            this.editorButton = true
            this.editorText = true
            this.isHome = false
        },
        backHome() {
            this.editorButton = false
            this.editorText = false
            this.isHome = true
        }
    },
    computed: {
        filterArticles() {
            if (this.searching) {
                return this.articles.filter((article) => {
                    return article.title.toLowerCase().includes(this.searching.toLowerCase())
                })
            } else {
                return this.articles
            }
        }
    },
    created() {
        this.getArticles()
    }
})

const quill = new Quill('#editor', {
    theme: 'snow'
});