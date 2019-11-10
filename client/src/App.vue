<template>
    <div class="sandbox">
        <LoginPage v-if="isLogin === false || page === 'login'" 
            :is-login="isLogin" 
            :page="page" 
            @set-login="setLogin" 
            @set-page="setPage">
        </LoginPage>
        <MainPage v-else-if="page === 'main'" 
            @logout="logout">
        </MainPage>
    </div>
</template>

<script>
import LoginPage from "./views/LoginPage.vue";
import MainPage from "./views/MainPage.vue";
import Swal from "sweetalert2";

export default {
    name: "App",
    data: function(){
        return {
            isLogin: false,
            page: "login"
        };
    },
    methods: {
        setLogin(value){
            this.isLogin = value;
        },
        setPage(page){
            this.page = page;
        },
        logout() {
            var auth2 = gapi.auth2.getAuthInstance();
            if (auth2){
                auth2.signOut().then(function () {
                    console.log("User signed out.");
                });
            }
            localStorage.removeItem("token");
            this.isLogin = false;
            this.page = "login";
            this.success("Successfully sign out.");
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                showConfirmButton: false,
                timer: 1500
            });
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
    created() {
        if (localStorage.getItem("token")) {
            this.isLogin = true;
            this.page = "main";
        } else {
            this.isLogin = false;
            this.page = "login";
        }
    },
    components: {
        LoginPage,
        MainPage
    }
}
</script>

<style scoped>
    .sandbox {
        margin: 0;
        padding: 0;
        width: 100%;
    }
</style>