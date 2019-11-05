import Vue from 'vue';
import App from './App.vue';

new Vue(App).$mount("#app")
// const app = new Vue({
//     el: "#app",
//     data: {
//         articles: [],
//         page: ''
//     },
//     methods: {
//         showArticles() {
//             axios({
//                 method: "GET",
//                 url: "http://localhost:3000/articles"
//             })
//                 .then(({ data }) => {
//                     this.articles = data
//                 })
//                 .catch(err => console.log(err))
//         },
//         changePage(p) {
//             this.page = p
//         }
//     },
//     created() {
//         this.showArticles()
//     }
// })