const article = axios.create({
    baseURL: 'http://localhost:3000/articles',
    headers : {
        token : localStorage.getItem('token')
    }    
});


const user =  axios.create({
    baseURL : 'http://localhost:3000'
})

const app = new Vue({
    el: '#app',
    data : {
        // bekerja seperti attributes
        articles : [],
        article : {},
        search : '',
        loginStatus : false,
        register : true,
        loginForm : false,
        email : '',
        password : '',
        title_edit : '',
        content_edit : ''
        },
    methods : {
        // bekerja seperti intance method
        getArticles(){            
            article
                .get('',{
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then (({data}) => {
                    this.articles = data
                })
                .catch(err => {
                    // console.log(err)
                })
        },
        updateArticle(id) {
            article.
                get(`/${id}`)
                .then(article => {
                    this.article = article
                    console.log(article)
                })
                .catch(err => {
                    console.log(err)
                })
            
        },
        // deleteArticle(id) {
        //     article
        //         .delete(`/${id}`)
        //         .( {} )
        // },
        isLogin() {
            let token = localStorage.getItem('token')
            if (token) {
                this.loginStatus = true
                this.getArticles()
            } 
        },
        toLogin() {
            this.register = false
            this.loginForm = true
        },
        login(){
            user.
                post('/login', 
                    {
                        email : this.email,
                        password : this.password
                    })
                .then( ({data}) => {      
                    this.getArticles()       
                    localStorage.setItem('token', data.token)
                    Swal.fire(
                        'Loggin Success!',
                        'You are now loggin in our web!',
                        'success'
                    )
                    this.loginStatus = true                    
                })
                .catch(err => {
                    console.log(err)
                })                
        },
        showUpdate(articleId) {
            article.
                get(`/${articleId}`, {
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then( ({data}) => {
                    this.title_edit = data.title
                    this.content_edit = data.content
                })
                .catch(err => {
                    console.log(err)
                })
        }        
    },
    created() {
        this.isLogin()
    },
    computed : {
        // computed bekerja seperti getter
        fiteredArticle() {
            return this.articles.filter((article) => {
                return article.title.includes(this.search)
            }) 
        }
    },
    mounted() {
        $('#app').show()
        $('#loading').empty()
    }
})
