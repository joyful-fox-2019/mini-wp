const instance = axios.create({
    // baseURL: 'http://miniwpserver.angelavanessa.com'
    baseURL: 'http://localhost:3000'
});

new Vue({
    el: '#app',
    data: {
      articles: [],
      filterTitle: '',
      quillForm : null,
      articleTitleEditor: '',
      articleContentEditor: '',
      showMainPage: false,
      showBlogPage: true,
      publishButton: true,
      articleId: null,
      isLoggedIn: null,
      registerName: '',
      registerEmail: '',
      registerPassword: '',
      loginEmail: '',
      loginPassword: ''
    },
    methods: {
        getData() {
            instance
                .get('articles')
                .then( ({data}) => {
                    this.articles = data;
                })
                .catch( error => {
                    console.log(error);
                })
        },
        getArticleCreatedAt(article) {
            let today = Date.now();
            let createdAt =  Date.parse(article.created_at);
            let msec = today - createdAt;

            var hh = Math.floor(msec / 1000 / 60 / 60); // get hour
            msec -= hh * 1000 * 60 * 60;
            var mm = Math.floor(msec / 1000 / 60); // get minutes
            msec -= mm * 1000 * 60;
            var ss = Math.floor(msec / 1000); // get seconds
            msec -= ss * 1000;

            if (hh > 0) {
                return `${hh} hours ago.`
            } else if (mm > 0) {
                return `${mm} minutes ago.`
            } else {
                return `${ss} seconds ago.`
            }
        },
        quill() {
            let toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
                ['clean'],                                        // remove formatting button
                ['image'],                                          
            ];
            
            let quillForm = new Quill('#editor', {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow'
            });
            this.quillForm = quillForm;
        },
        createArticle() {
            let data = {
                title: this.articleTitleEditor,
                content: this.articleContentEditor
                // content: this.quillForm.getText()
            }

            instance
                .post('articles', data)
                .then( ({data}) => {
                    this.articles.unshift(data);
                    this.toggleMainPage();
                })
                .catch( error => {
                    console.log(error);
                })
        },
        deleteArticle(article) {
            instance
                .delete(`articles/${article._id}`)
                .then( () => {
                    alert('deleted')
                    // this.toggleMainPage();
                })
                .catch( error => {
                    console.log(error)
                })
        },
        renderUpdateArticle(article) {
            this.articleTitleEditor = article.title;
            this.articleContentEditor = article.content;
            this.articleId = article._id;
            this.publishButton = false;
            this.toggleBlogPage();
        },
        updateArticle(){
            let data = {
                title: this.articleTitleEditor,
                content: this.articleContentEditor
            }
            instance
                .put(`articles/${this.articleId}`)
                .then( () => {
                    alert('uda')
                    this.toggleMainPage();
                })
                .catch( error => {
                    console.log(error);
                })
        },
        toggleBlogPage(){
            this.showMainPage = false;
            this.showBlogPage = true;
        },
        toggleMainPage(){
            this.showMainPage = true;
            this.showBlogPage = false;
            this.articleTitleEditor = '';
            this.articleContentEditor = '';
            this.articleId = null;
            this.publishButton = true;
        },
        checkSession() {
            let token = localStorage.getItem('jwt_token');
            this.isLoggedIn = token ? true : false;
        },
        registerUser() {
            let data = {
                name: this.registerName,
                email: this.registerEmail,
                password: this.registerPassword
            }

            instance
                .post('register', data)
                .then( () => {
                    this.registerName = '';
                    this.registerEmail = '';
                    this.registerPassword = '';
                    alert('registered');
                })
                .catch( err => {
                    console.log(err)
                })
        },
        loginUser() {
            let data = {
                email: this.loginEmail,
                password: this.loginPassword
            }
            console.log(data)
            
            instance
                .post('login', data)
                .then( ({data}) => {
                    localStorage.setItem('jwt_token', data)
                    this.loginEmail = '';
                    this.loginPassword = '';
                    this.isLoggedIn = true;
                })
                .catch(err => {
                    console.log(err)
                })
        },
        logOut() {
            localStorage.removeItem('jwt_token');
            this.isLoggedIn = false;
        }
    },
    created() {
        this.getData();
        this.checkSession();
    },
    computed: {
        filteredArticles: function() {
            let filtered = this.articles.filter(item => {
                if(item.title.includes(this.filterTitle)){
                  return item;
                }
            })
            return filtered;
        }
    }
  })

$( document ).ready(function() {
    let dropdown = document.getElementsByClassName("dropdown-btn");

    for (let i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }
});