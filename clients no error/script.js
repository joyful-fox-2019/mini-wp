var quill = new Quill('#editor', {
    theme: 'snow'
});

let app = new Vue({
    el: "#app",
    data: {
        articles: "",
        content: "",
        created_at: "",
        quillEditor: false,
        mainPageWp: true,
        articles: [],
        articleCount: 0,
        articleDraft: 0,
        search: false,
        searchValue: '',
        createTitle: '',
        createContent: '',
        createImage: '',
        articleimage: '',
        idArticle: 0,
        created_at: '',
        signUp: {
            valueLoginEmail: "",
            valueLoginPassword: ""
        },
        loginPage: false,
        mainPages: true,
        isLogin: false
    },
    methods: {
        profileOptions(name) {
            Swal.fire({
                    title: 'Are you sure?',
                    text: "Quit?! 😕",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, quit!'
                }).then((result) => {
                    if (result.value) {
                        Swal.fire({
                            title: 'Quit!',
                            text: `dadah ${name} sampai ketemu lagi!`,
                            icon: 'success',
                            timer: 1300,
                            showConfirmButton: false,
                        })
                        this.loginPage = true,
                            this.mainPages = false
                        this.mainPageWp = false,
                            this.articlesRender()
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        updateArticle(id) {
            axios({
                    url: `http://localhost:3000/article/${id}`,
                    method: 'put',
                    data: {
                        title: this.createTitle,
                        content: this.createContent,
                        image: this.createImage
                    },
                    beforeSend: () => {
                        swal.fire({
                            title: 'Sending To Side Page..',
                            html: `<img src="http://cdn.lowgif.com/full/4843afc788973937-fox-gif-big-by-wafflewafart-on-deviantart.gif" style="height:150px">`,
                            onBeforeOpen: () => {
                                swal.fire({
                                    title: `Open Detail Repository id:${id}`,
                                    html: `<img src="http://cdn.lowgif.com/full/4843afc788973937-fox-gif-big-by-wafflewafart-on-deviantart.gif" style="height:150px">`,
                                    onBeforeOpen: () => {
                                        swal.showLoading()
                                    }
                                })
                            }
                        })
                    }
                })
                .then(response => {
                    this.articlesRender()
                    this.mainPageWp = true
                    this.quillEditor = false
                    Swal.fire({
                        title: 'Success!',
                        text: 'Update Success',
                        icon: 'success',
                        timer: 1300,
                        showConfirmButton: false,
                    })
                    this.idArticle = 0
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Oppss!',
                        text: err.message,
                        imageUrl: 'https://thumbs.gfycat.com/AlienatedFrequentChrysomelid-size_restricted.gif',
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                        timer: 3800,
                        showConfirmButton: false,
                    })
                })
        },
        editArticle(article) {
            this.createTitle = article.title
            this.createContent = article.content
            this.createImage = article.image
            this.idArticle = article._id
            this.mainPageWp = false
            this.quillEditor = true
        },
        deleteArticle(id) {
            console.log(id);
            axios({
                    url: `http://localhost:3000/article/${id}`,
                    method: 'delete',
                    beforeSend: () => {
                        swal.fire({
                            title: 'Sending To Side Page..',
                            html: `<img src="http://cdn.lowgif.com/full/4843afc788973937-fox-gif-big-by-wafflewafart-on-deviantart.gif" style="height:150px">`,
                            onBeforeOpen: () => {
                                swal.fire({
                                    title: `Open Detail Repository id:${id}`,
                                    html: `<img src="http://cdn.lowgif.com/full/4843afc788973937-fox-gif-big-by-wafflewafart-on-deviantart.gif" style="height:150px">`,
                                    onBeforeOpen: () => {
                                        swal.showLoading()
                                    }
                                })
                            }
                        })
                    }
                })
                .then(response => {
                    this.articlesRender()
                    this.mainPageWp = true
                    this.quillEditor = false
                    Swal.fire({
                        title: 'Success!',
                        text: 'Delete Success',
                        icon: 'success',
                        timer: 1300,
                        showConfirmButton: false,
                    })
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Oppss!',
                        text: err.message,
                        imageUrl: 'https://thumbs.gfycat.com/AlienatedFrequentChrysomelid-size_restricted.gif',
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                        timer: 3800,
                        showConfirmButton: false,
                    })
                })
        },
        createArticle() {
            axios({
                    url: `http://localhost:3000/article`,
                    method: 'post',
                    data: {
                        title: this.createTitle,
                        content: this.createContent,
                        image: this.createImage
                    },
                    beforeSend: () => {
                        swal.fire({
                            title: 'Sending To Side Page..',
                            html: `<img src="http://cdn.lowgif.com/full/4843afc788973937-fox-gif-big-by-wafflewafart-on-deviantart.gif" style="height:150px">`,
                            onBeforeOpen: () => {
                                swal.fire({
                                    title: `Open Detail Repository id:${id}`,
                                    html: `<img src="http://cdn.lowgif.com/full/4843afc788973937-fox-gif-big-by-wafflewafart-on-deviantart.gif" style="height:150px">`,
                                    onBeforeOpen: () => {
                                        swal.showLoading()
                                    }
                                })
                            }
                        })
                    }
                })
                .then(response => {
                    this.articlesRender()
                    this.mainPageWp = true
                    this.quillEditor = false
                    Swal.fire({
                        title: 'Success!',
                        text: 'Create Success',
                        icon: 'success',
                        timer: 1300,
                        showConfirmButton: false,
                    })
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Oppss!',
                        text: 'title is required!',
                        imageUrl: 'https://thumbs.gfycat.com/AlienatedFrequentChrysomelid-size_restricted.gif',
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                        timer: 3800,
                        showConfirmButton: false,
                    })
                })
        },
        buttonWrite() {
            this.idArticle = 0
            if (this.quillEditor === false) {
                this.quillEditor = true
                this.mainPageWp = false
            } else {
                this.createTitle = ''
                this.createContent = ''
                this.createImage = ''
                this.quillEditor = false
                this.mainPageWp = true
            }
        },
        articlesRender() {
            axios({
                    url: 'http://localhost:3000/article',
                    method: 'get',
                    beforeSend: () => {
                        swal.fire({
                            title: 'Sending To Side Page..',
                            html: `<img src="http://cdn.lowgif.com/full/4843afc788973937-fox-gif-big-by-wafflewafart-on-deviantart.gif" style="height:150px">`,
                            onBeforeOpen: () => {
                                swal.fire({
                                    title: `Open Detail Repository id:${id}`,
                                    html: `<img src="http://cdn.lowgif.com/full/4843afc788973937-fox-gif-big-by-wafflewafart-on-deviantart.gif" style="height:150px">`,
                                    onBeforeOpen: () => {
                                        swal.showLoading()
                                    }
                                })
                            }
                        })
                    }
                })
                .then(response => {
                    this.createTitle = ''
                    this.createContent = ''
                    this.createImage = ''
                    this.articles = response.data
                    this.articleCount = this.articles.length
                    this.articleimage = response.data.image
                    this.articles.forEach((article, index) => {
                        let time = this.getTime(article.created_at)
                        this.articles[index].created_at = time
                    })
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Oppss!',
                        text: err.message,
                        imageUrl: 'https://thumbs.gfycat.com/AlienatedFrequentChrysomelid-size_restricted.gif',
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                        timer: 3800,
                        showConfirmButton: false,
                    })
                })
        },
        published() {
            this.articlesRender()
        },
        mySites() {
            this.quillEditor = false
            this.mainPageWp = true
        },
        searchIt() {
            this.search ? this.search = false : this.search = true
        },
        getTime(previous) {
            this.created_at = ""
            let currentDate = new Date().toISOString().substr(0, 10)
            let currentTime = new Date().toTimeString().substring(0, 8)
            let currentSecond = Math.floor(new Date().getMilliseconds() % 60)
            currentDate = currentDate.split('-')
            currentTime = currentTime.split(':')
            let current = new Date(currentDate[0], currentDate[1], currentDate[2], currentTime[0], currentTime[1], currentTime[2], currentSecond)
            let date = new Date(previous).toISOString().substr(0, 10)
            let time = new Date(previous).toTimeString().substring(0, 8)
            let second = Math.floor(new Date(previous).getMilliseconds() % 60)
            date = date.split('-')
            time = time.split(':')
            previous = new Date(date[0], date[1], date[2], time[0], time[1], time[2], second)

            let msPerMinute = 60 * 1000;
            let msPerHour = msPerMinute * 60;
            let msPerDay = msPerHour * 24;
            let msPerMonth = msPerDay * 30;
            let msPerYear = msPerDay * 365;
            let elapsed = current - previous;
            if (elapsed < msPerMinute) {
                return this.created_at = Math.round(elapsed / 1000) + ' seconds ago';
            } else if (elapsed < msPerHour) {
                return this.created_at = Math.round(elapsed / msPerMinute) + ' minutes ' + Math.round(elapsed / 1000) % 60 + ' seconds ago';
            } else if (elapsed < msPerDay) {
                return this.created_at = Math.round(elapsed / msPerHour) + ' hours ' + Math.round(elapsed / msPerMinute) % 60 + ' minutes ago ' + Math.round(elapsed / 1000) % 60 + ' seconds ago';
            } else if (elapsed < msPerMonth) {
                return this.created_at = Math.round(elapsed / msPerDay) + ' days ' + Math.round(elapsed / msPerHour) % 24 + ' hours ago ' + Math.round(elapsed / msPerMinute) % 60 + ' minutes ago ' + Math.round(elapsed / 1000) % 60 + ' seconds ago';;
            } else if (elapsed < msPerYear) {
                return this.created_at = Math.round(elapsed / msPerMonth) + ' months ago';
            } else {
                return this.created_at = Math.round(elapsed / msPerYear) + ' years ago';
            }
        },
        selectLogin() {
            
        }
    },
    created() {
        this.articlesRender()
    },
    computed: {
        filterArticle() {
            if (this.searchValue) {
                return this.articles.filter(article => {
                    return article['title'].toLowerCase().includes(this.searchValue.toLowerCase())
                })
            } else {
                return this.articles
            }
        }
    }
})