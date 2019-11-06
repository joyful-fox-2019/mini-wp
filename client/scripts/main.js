new Vue({
    el: '#app',
    data: {
      articles: [],
      filterTitle: '',
      quillForm : null,
      articleTitleEditor: '',
      articleContentEditor: '',
      showMainPage: true,
      showBlogPage: false,
      publishButton: true,
      articleId: null
    },
    methods: {
        getData() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/articles'
            })
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
            axios({
                method: 'post',
                url: 'http://localhost:3000/articles',
                data: {
                    title: this.articleTitleEditor,
                    content: this.articleContentEditor
                    // content: this.quillForm.getText()
                }
            })
            .then( () => {
                this.toggleMainPage();
            })
            .catch( error => {
                console.log(error);
            })
        },
        deleteArticle(article) {
            axios({
                method: 'delete',
                url: `http://localhost:3000/articles/${article._id}`
            })
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
            axios({
                method: 'PUT',
                url: `http://localhost:3000/articles/${this.articleId}`,
                data: {
                    title: this.articleTitleEditor,
                    content: this.articleContentEditor
                }
            })
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
        }
    },
    mounted() {
        this.getData();
        // this.quill();
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