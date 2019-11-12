<template>
    <div>
        <b-navbar class="nav-bar">
            <template slot="brand" >
                <a @click="changeMainPage" class="slot" href="#" >
                    <i class="fab fa-wordpress" style="margin-right:10px;"></i>
                    Mini WP
                </a>
            </template>
            <template slot="start">
            </template>
            <template slot="end">
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <a @click.prevent="logout" class="button is-light">
                            <i class="fas fa-sign-out-alt" style="margin-right:10px;"></i>
                            <strong>Sign Out</strong>
                        </a>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: "NavBar",
    data: function(){
        return {

        };
    },
    props: {
        mainpage: String
    },
    methods: {
        changeMainPage(mainpage){
            this.$emit("change-main-page", "home");
        },
        logout(){
            this.$emit("logout");
        }
    }
}
</script>

<style scoped>
    .nav-bar {
        background-color: #21759b;
        color: white;
        width: 100%;
        padding: 0px;
    }
    .slot {
        display: flex;
        align-items: center;
        color: white;
        padding : 0px 20px;
        font-size: 20px;
    }
    .slot:hover {
        background-color: #1a5e7c;
    }
</style>