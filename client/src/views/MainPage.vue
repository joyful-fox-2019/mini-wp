<template>
    <div>
        <NavBar :mainpage="mainpage" @change-main-page="changeMainPage" @logout="logout"></NavBar>
        <div style="display:flex;">
            <div class="column is-3">
                <SideBar :mainpage="mainpage" @change-main-page="changeMainPage"></SideBar>
            </div>
            <div class="column">
                <NewsFeed v-if="mainpage === 'home'" 
                    :mainpage="mainpage" 
                    :modified="modified" 
                    @change-main-page="changeMainPage"
                    @modify-page="modifyPage">
                </NewsFeed>
                <UserFeed v-if="mainpage === 'user'" 
                    :mainpage="mainpage" 
                    :modified="modified" 
                    @change-main-page="changeMainPage"
                    @modify-page="modifyPage">
                </UserFeed>
                <AddArticle v-if="mainpage === 'add'" 
                    :mainpage="mainpage" 
                    @change-main-page="changeMainPage">
                </AddArticle>
                <EditArticle v-if="mainpage === 'edit'" 
                    :mainpage="mainpage" 
                    :modified="modified" 
                    @change-main-page="changeMainPage">
                </EditArticle>
                <SearchTag v-if="mainpage === 'tag'" 
                    :mainpage="mainpage" 
                    :modified="modified" 
                    @change-main-page="changeMainPage"
                    @modify-page="modifyPage">
                </SearchTag>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../config/axios.js";
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";
import NewsFeed from "../components/NewsFeed.vue";
import UserFeed from "../components/UserFeed.vue";
import AddArticle from "../components/AddArticle.vue";
import EditArticle from "../components/EditArticle.vue";
import SearchTag from "../components/SearchTag.vue";

export default {
    name: "MainPage",
    data: function(){
        return {
            mainpage: "home",
            modified: ""
        };
    },
    methods: {
        getArticle(page) {
            axios({
                method: "GET",
                url: `/articles/${this.modified}`,
                headers: {
                    "jwt_token": localStorage.getItem("token")
                }
            })
            .then((response) => {
                this.mainpage = page;
            })
            .catch((err) => {
                this.danger(err.response.data.message);
            });
        },
        changeMainPage(mainpage){
            this.mainpage = mainpage;
        },
        modifyPage(page, param){
            this.modified = param;
            this.getArticle(page);
        },
        logout(){
            this.$emit("logout");
        },
        success(message) {
            this.$buefy.toast.open({
                duration: 1500,
                message: message,
                position: "is-top-right",
                type: "is-success"
            })
        },
        danger(message) {
            this.$buefy.toast.open({
                duration: 1500,
                message: message,
                position: "is-top",
                type: "is-danger"
            })
        }
    },
    components: {
        NavBar,
        SideBar,
        NewsFeed,
        UserFeed,
        AddArticle,
        EditArticle,
        SearchTag
    }
}
</script>

<style>

</style>