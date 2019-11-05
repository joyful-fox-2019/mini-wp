new Vue({
    el: '#app',
    data: {
      articles: [],
      filterTitle: ''
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
                retun `${ss} seconds ago.`
            }
        }
    },
    mounted() {
        this.getData();
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
    $('.add-blog-page').hide()

    quillTextEditor();

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

function quillTextEditor() {
    var toolbarOptions = [
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
      
      var quill = new Quill('#editor', {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
      });
}

function addBlogPost() {
    $('.mainpage').hide()
    $('.add-blog-page').show()
}

function showMainpage() {
    $('.add-blog-page').hide()
    $('.mainpage').show()
}