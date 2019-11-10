<template>
  <div class="navbar d-flex align-items-center justify-content-between">       
        <div  v-if="page === 'home'" class="search d-flex align-items-center">
            <i class="fas fa-search"></i>
            <form @submit.prevent="search" action="">
                <input v-model="searchKeyword" type="text" placeholder="Search">
                <input class="search-btn" type="submit" value="search">
            </form>
        </div>
        <div class="nav-profile d-flex align-items-center" >
            <img class="nav-profile-pic" :src="userPic" alt="">
            <span style="font-family: 'Poppins', sans-serif; color: grey;" class="ml-2">{{ userEmail }}</span>
        </div>
        <div>
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
            userEmail: "",
            userPic: ""
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
        },
        fetchProfile(){
        axios({
            method: 'get',
            url: '/users',
            headers: {
            token : localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            this.userEmail = data.email
            this.userPic = data.profilePic
        })
        .catch(({ response }) => {
            this.$noty.error(response.data.message)
        })
        },
    },
     watch: {
        searchKeyword: function(){
            this.search()
        },
        page: function(){
            this.searchKeyword = ""
        }
    },
    created(){
        if(localStorage.getItem('token')){
            this.fetchProfile()
        }
    }
}
</script>

<style>

.nav-profile{
    width: 300px;
    height: 50px;
}

.nav-profile-pic{
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-left: 5px;
    object-fit: cover;
    /* box-shadow: 5px 5px 28px -4px rgba(240, 118, 240, 0.568); */
}

</style>