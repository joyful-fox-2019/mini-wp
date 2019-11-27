<template>
    <b-container class="main-area">
        <b-row class="p-3 mb-4">
            <b-col cols="2">
                Published
            </b-col>
            <b-col cols="2">
                Drafts
            </b-col>
            <b-col cols="8">
                <b-form-input v-model="filterTitle" size="sm" class="mr-sm-2 search-bar" placeholder="Search"></b-form-input>
            </b-col>
        </b-row>
        <b-row v-for="article in filteredArticles" :key="article._id" class="p-3 mb-4" >
            <b-col vertical-align="center" cols="8">
                <p class="m-0">{{ article.title }}</p>
                <p class="m-0" style="font-size: 12px;">{{ article.createdAt }}</p>
            </b-col>
            <b-col class="float-right">
                <img :src=article.featuredImage class="featured-image">
            </b-col>
            <b-col class="float-right">
                <b-dropdown id="dropdown-dropleft drop-btn" dropleft text="..." class="m-2">
                    <b-dropdown-item @click="updateArticle(article._id)">Update</b-dropdown-item>
                    <b-dropdown-item @click.prevent="deleteArticle(article._id)">Delete</b-dropdown-item>
                </b-dropdown>
            </b-col>
             
        </b-row>
    </b-container>
</template>

<script>
import axios from '../../config/axios'

export default {
    data() {
        return {
            articles: [],
            filterTitle: ''
        };
    },
    methods: {
        getData() {
            axios({
                method: 'get',
                url: `/articles`,
                headers: {
                    authorization: localStorage.getItem('jwt_token')
                }
            })
            .then( ({data}) => {
                this.articles = data;
            })
            .catch( error => {
                console.log(error);
            })
        },
        deleteArticle(id) {
             axios({
                method: 'delete',
                url: `articles/${id}`,
                headers: {
                    authorization: localStorage.getItem('jwt_token')
                }
            })
            .then(_ => {
                this.getData()
            })
            .catch( error => {
                console.log(error)
            })
        },
        updateArticle(value) {
            this.$emit('update-article', value);
        }
    },
    created() {
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
}
</script>

<style scoped>
    .row {
        border: 1px solid #dee2e6;
        background-color: white;
    }

    .search-bar {
        width: 50%;
        float: right;
    }

    .main-area {
        background-color: #f3f3f3;
        padding: 50px 150px;
    }

    .featured-image {
        height: 50px;
        width: 70px;
    }
</style>