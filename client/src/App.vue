<template>
    <div>
        <!-- BEFORE LOGIN -->
        <div class="loginPage" v-if="!isLogin">
            <Login @changeLogin="changeLogin" @userData="userData"><Login/>
        </div>
        <!-- END BEFORE LOGIN -->
        <div v-if="isLogin">
            <Navbar @changePage="changePage"></Navbar>
            <div>
                <div class="columns is-gapless" style="background-color: #fff;">
                    <div class="column is-one-fifth left-menu">
                        <SideMenu @changePage="changePage" @changeLogin="changeLogin" :user="user"><SideMenu/>
                    </div>
                    <div class="column right-menu">
                        <div class="container">
                            <!-- <div class="posting-content">
                                kotak buat konten
                            </div> -->
                            <Home v-if="isHome"></Home>
                            <ReadPublic v-if="isPublic" @changePage="changePage" @addPublicData="addPublicData"></ReadPublic>
                            <PublicDetail v-if="isPublicDetail" @changePage="changePage" :publicDetailData="publicDetailData"></PublicDetail>
                            <WriteArticle v-if="isWrite"  @changePage="changePage"></WriteArticle>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './components/Navbar'
import SideMenu from './components/SideMenu'
import Home from './components/Home'
import Login from './components/Login'
import ReadPublic from './components/ReadPublic'
import PublicDetail from './components/PublicDetail'
import WriteArticle from './components/WriteArticle'

export default {
    name: 'App',
    components : {
        Navbar,SideMenu,Home,Login,ReadPublic,PublicDetail,WriteArticle
    },
    data() {
        return {
            isLogin : false,
            isHome : true,
            isPublic : false,
            isPublicDetail : false,
            isWrite : false,
            user : {
                name : '',
                email : ''
            },
            publicDetailData : ''
        } 
    },
    methods : {
        addPublicData(data){
            this.publicDetailData = data
        },
        changeLogin(status) {
            this.isLogin = status
        },
        userData(name,email) {
            this.user.name = name
            this.user.email = email
        },
        changePage(homePage,publicPage,publicDetail,write) {
            this.isHome = homePage
            this.isPublic = publicPage
            this.isPublicDetail = publicDetail
            this.isWrite = write
        }
    },
    created () {
        if(localStorage.getItem('token')) {
            this.isLogin = true
        } else {
            this.isLogin = false
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

.navbar-main{
    border-right: 1px solid white;
}
/* .navbar-menu {
    background-color: #2d3436;
} */

.sidemenu {
    display: flex;
    padding: 20px;
    /* justify-content: center; */
    align-items: center;
    background-color: #fff;
}
.left-menu {
    border-right: 1px solid #b2bec3 !important;
}

.right-menu {
    background-color: #f6f7f7;
    /* margin: 25px !important; */
}

.right-menu .container {
    margin: 25px !important;
}

.sidemenu-content {
    display: flex;
    flex-direction: column;
}

.sidemenu-content p {
    font-size: 12px;
}

.menu-logo {
    background-color: #c3c4c7;
    color: white;
    padding: 5px 8px;
    font-size: 18px;
    margin-right: 10px;
}

.columns {
    height: 100vh !important;
}

</style>