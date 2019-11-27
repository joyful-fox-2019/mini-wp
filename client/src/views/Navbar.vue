<template>
    <div>
    <b-navbar toggleable="lg" type="dark">
        <b-navbar-brand href="#" @click="changePage('home')">
            <img class="logo" src="https://s.w.org/style/images/about/WordPress-logotype-wmark-white.png" alt="wordpress logo"> 
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto" v-if="isLogin">
                <b-button @click="createArticle('article')" size="sm" class="my-2 my-sm-0 d-flex write-button mx-2" type="button">
                    <i class="material-icons pr-2">filter_none</i>
                    <span style="font-size: 1rem;">Write</span>
                </b-button>
    
                <b-nav-item-dropdown right>
                    <template v-slot:button-content>
                        <i class="material-icons mx-3">mood</i>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item @click="signOut">
                        <GoogleLogin :params="params" :logoutButton=true class="logout-btn">Logout</GoogleLogin>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
    props: ['isLogin'],
    data() {
        return {
            params: {
                client_id: "415938799508-oh4a2roef8rj6slbbvtlj8j40ebnothl.apps.googleusercontent.com"
            }
        }
    },
    components: {
        GoogleLogin
    },
    methods: {
        changePage: function(value){
            this.$emit('change-page', value);
        },
        signOut() {
            localStorage.removeItem('jwt_token');
            this.$emit('change-login', 'false');
            this.$emit('change-page', 'sign');
        },
        createArticle (page) {
            this.$emit('create-article', page);
        }
    }
}
</script>

<style scoped>
.logo { 
    width: 35px; 
    height: 35px; 
    display: block; 
    text-indent: -9999px;
} 

nav {
    background-color: #3f4d71;
}

.logout-btn {
    border: none;
    padding: 0;
    margin: 0;
    background-color: #fff;
}

.write-button {
    background-color: white;
    color: black;
    border: none;
}

.write-button:hover{
    background-color: #fd7792;
}
</style>