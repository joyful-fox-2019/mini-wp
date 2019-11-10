<template>
    <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#" @click="changePage('home')">
            <img class="logo" src="https://s.w.org/style/images/about/WordPress-logotype-wmark-white.png" alt="wordpress logo"> 
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto" v-if="isLogin">
                <b-button @click="changePage('article')" size="sm" class="my-2 my-sm-0" type="button">
                    Write
                </b-button>
    
                <b-nav-item-dropdown right>
                    <template v-slot:button-content>
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item @click="signOut">
                        <GoogleLogin :params="params" :logoutButton=true>Logout</GoogleLogin>
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
            this.$emit('change-page', 'login');
        }
    }
}
</script>

<style>
.logo { 
    width: 35px; 
    height: 35px; 
    display: block; 
    text-indent: -9999px;
}  
</style>