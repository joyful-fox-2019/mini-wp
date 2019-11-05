// const quill = new Quill ('#editor', {
//     theme: 'snow'
// });

const app = new Vue ({
    el: '#app',
    data: {
        email: "",
        password: "",
        isLogin: false,
        isError: false,
        emailRegis: "",
        passwordRegis: "",
        isErrorRegis: false,
        page: "show",
        articles: [],
        search: "",
        titleAdd: "",
        contentAdd: "",
        isErrorAdd: false,
        idEdit: "",
        titleEdit: "",
        contentEdit: "",
        isErrorEdit: false,
    },
    methods: {
        login() {
            axios({
                method: "POST",
                url: "http://localhost:3000/users/signin",
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then((response) => {
                localStorage.setItem("jwt_token", response.data.jwt_token);
                this.getArticles();
                this.isLogin = true;
                this.page = "show";
                this.email = "";
                this.password = "";
                this.isError = false;
                swal({
                    title: "Success!",
                    icon: "success",
                    buttons: false,
                    timer: 1500
                });
            })
            .catch((err) => {
                this.isError = true;
                this.error = err.response.data.messages;
            });
        },
        logout() {
            localStorage.removeItem("jwt_token");
            this.isLogin = false;
            swal({
                title: "Success!",
                icon: "success",
                buttons: false,
                timer: 1500
            });
        },
        showRegister() {
            this.page = "register";
            this.emailRegis = "";
            this.passwordRegis = "";
            this.isErrorRegis = false;
        },
        showLogin() {
            this.page = "login";
            this.email = "";
            this.password = "";
            this.isError = false;
        },
        register() {
            axios({
                method: "POST",
                url: "http://localhost:3000/users/signup",
                data: {
                    email: this.emailRegis,
                    password: this.passwordRegis
                }
            })
            .then((response) => {
                localStorage.setItem("jwt_token", response.data.jwt_token);
                this.getArticles();
                this.isLogin = true;
                this.page = "show";
                this.emailRegis = "";
                this.passwordRegis = "";
                this.isErrorRegis = false;
                swal({
                    title: "Success!",
                    icon: "success",
                    buttons: false,
                    timer: 1500
                });
            })
            .catch((err) => {
                this.isErrorRegis = true;
                this.error = err.response.data.messages.join(" ");
            });
        },
        getArticles() {
            axios({
                method: "GET",
                url: "http://localhost:3000/articles",
                headers: {
                    jwt_token: localStorage.getItem("jwt_token")
                }
            })
            .then((response) => {
                this.articles = response.data;
            })
            .catch((err) => {
                this.error = err
            });
        },
        showAdd() {
            this.page = "add";
            this.titleAdd = "";
            this.titleContent = "";
            this.isErrorAdd = false;
        },
        showEdit(article) {
            this.page = "edit";
            this.idEdit = article._id;
            this.titleEdit = article.title;
            this.contentEdit = article.content;
            this.isErrorEdit = false;
        },
        add() {
            axios({
                method: "POST",
                url: "http://localhost:3000/articles/",
                headers: {
                    jwt_token: localStorage.getItem("jwt_token")
                },
                data: {
                    title: this.titleAdd,
                    content: this.contentAdd
                }
            })
            .then((response) => {
                this.page = "show";
                this.getArticles();
                swal({
                    title: "Success!",
                    icon: "success",
                    buttons: false,
                    timer: 1500
                });
            })
            .catch((err) => {
                this.isErrorAdd = true;
                this.errorAdd = err.response.data.messages.join(" ");
            });
        },
        edit() {
            axios({
                method: "PUT",
                url: `http://localhost:3000/articles/${this.idEdit}`,
                headers: {
                    jwt_token: localStorage.getItem("jwt_token")
                },
                data: {
                    title: this.titleEdit,
                    content: this.contentEdit
                }
            })
            .then((response) => {
                this.page = "show";
                this.getArticles();
                this.idEdit = "";
                this.titleEdit = "";
                this.contentEdit = "";
                swal({
                    title: "Success!",
                    icon: "success",
                    buttons: false,
                    timer: 1500
                });
            })
            .catch((err) => {
                this.isErrorEdit = true;
                this.errorEdit = err.response.data.messages.join(" ");
            });
        },
        remove(id) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this article!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    axios({
                        method: "DELETE",
                        url: `http://localhost:3000/articles/${id}`,
                        headers: {
                            jwt_token: localStorage.getItem("jwt_token")
                        }
                    })
                    .then((response) => {
                        if (response.data.n === 1) {
                            this.getArticles();
                            swal({
                                title: "Success!",
                                icon: "success",
                                buttons: false,
                                timer: 1500
                            });
                        } else {
                            swal({
                                title: "Error!",
                                icon: "error",
                                buttons: false,
                                timer: 1500
                            });
                        }
                    })
                    .catch((err) => {
                        this.isErrorEdit = true;
                        this.errorEdit = err.response.data.messages.join(" ");
                    });
                } 
            });
        }
    },
    created() {
        if (localStorage.getItem("jwt_token")) {
            this.isLogin = true;
            this.getArticles();
        }
    },
    computed: {
        filteredList() {
          return this.articles.filter(article => {
            return article.title.toLowerCase().includes(this.search.toLowerCase());
          });
        },
        date() {
            for (let i = 0; i < this.articles.length; i++) {
                Date.prototype.toISODate = function() {
                    return  ("0"+(this.getDate())).slice(-2)+ "-" + 
                            ("0"+(this.getMonth()+1)).slice(-2) + "-" +
                            this.getFullYear();
                }
                return new Date(this.articles[i].createdAt).toISODate();
            }
        }
    }
});