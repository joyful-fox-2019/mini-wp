const baseUrl = `http://localhost:3000/wp`
const app = new Vue ({
    el: "#app",
    data: {
        id: '',
        isHome: true,
        isWrite: false,
        isEdit: false,
        search: '',
        articles: [],
        idArticle: '',
        title: '',
        content: '',
        editTitle: '',
        editContent: '',
        oldTitle: '',
        oldContent: ''
    },
    methods: {
        addPage() {
            this.isHome = false
            this.isWrite = true
            this.isEdit = false
        },
        home() {
            this.isHome = true
            this.isWrite = false
            this.isEdit = false
        },
        edit(id) {
            axios({
                method: 'get',
                url: `${baseUrl}/articles/${id}`,
            })
                .then((result) => {
                    this.oldTitle = result.data.title
                    this.oldContent = result.data.content
                }).catch((err) => {
                    console.log(err)
                });
            this.isHome = false
            this.isEdit = true
            this.isWrite = false
            this.id = id
            console.log('masuk edit', this.id)
        },
        fecthArticles() {  
            console.log('masuk')
            axios({
                method: 'get',
                url: `${baseUrl}/articles`,
            })
                .then((result) => {
                    console.log(result.data[0]._id)
                    let filteredResult = []
                    for (let i=0; i<result.data.length; i++) {
                        if (result.data[i].title.includes(this.search)) {
                            filteredResult.push(result.data[i])
                        }
                    }
                    this.articles = filteredResult
                }).catch((err) => {
                    console.log(err)
                });
        },
        addArticle() {
            axios({
                method: 'post',
                url: `${baseUrl}/articles`,
                data: {
                    title : this.title,
                    content : this.content,
                    createdAt : new Date
                }
            })
                .then((result) => {
                    console.log(result)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        hapus(id) {
            axios({
                method: 'delete',
                url: `${baseUrl}/articles/${id}`,
            })
                .then((result) => {
                    console.log(result)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        editArticle() {
            console.log('masuk edit', this.id)
            axios({
                method: 'put',
                url: `${baseUrl}/articles/${this.id}`,
                data: {
                    title: this.editTitle,
                    content: this.editContent
                }
            })
                .then((result) => {
                    console.log('masuk then edit')
                    console.log(result.message)
                }).catch((err) => {
                    
                });
        }
    },
    created() {
        this.fecthArticles()
    },
    watch : {
        search() {
            this.fecthArticles()
        }
    }

})


