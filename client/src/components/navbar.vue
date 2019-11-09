<template>
  <div class="navbar d-flex align-items-center justify-content-between">       
        <div>
            <div  v-if="page === 'home'" class="search d-flex align-items-center">
            <i class="fas fa-search"></i>
            <form @submit.prevent="search" action="">
                <input v-model="searchKeyword" type="text" placeholder="Search">
                <input class="search-btn" type="submit" value="search">
            </form>
        </div>
        </div>
        <i @click="logout" class="fas fa-sign-out-alt" style="font-size: 25px; cursor: pointer;"></i>
    </div>
</template>

<script>
import axios from '../config/axios'

export default {
    name: 'navbar',
    props: ['page'],
    data(){
        return{
            searchKeyword: "",
        }
    },
    methods: {
        search(){
            let field = "keyword";
            let searchTerm = this.searchKeyword;
            if (this.searchKeyword[0] === "#") {
                searchTerm = this.searchKeyword.substring(1);
                field = "tag";
            }
            axios({
                method: "get",
                url: `/articles/search?${field}=${searchTerm}`,
                headers: {
                token: localStorage.getItem("token")
                }
            })
            .then(({ data }) => {
                let searchResult = data;
                this.$emit("searchResult", searchResult);
            })
            .catch(({ response }) => {
                this.$noty.error(response.data.message)
            });
        },
        logout(){
            localStorage.clear()
            this.$emit('changePage', 'login')
        }
    },
     watch: {
        searchKeyword: function(){
            this.search()
        },
        page: function(){
            this.searchKeyword = ""
        }
    }
}
</script>

<style>

</style>