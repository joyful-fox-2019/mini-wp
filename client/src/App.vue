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
                    <div :class="{'column is-one-fifth left-menu' : (theme.isWhite), 'column is-one-fifth left-menu-dark' : (theme.isDark)}">
                        <SideMenu @changePage="changePage" @changeLogin="changeLogin" :user="user" @changeTheme="changeTheme"><SideMenu/>
                    </div>
                    <div :class="{'column right-menu': (theme.isWhite), 'column right-menu-dark': (theme.isDark)}">
                        <div class="container">
                            <Home v-if="isHome"></Home>
                            <ReadPublic v-if="isPublic" @changePage="changePage" @addPublicData="addPublicData"></ReadPublic>
                            <PublicDetail v-if="isPublicDetail" @changePage="changePage" :publicDetailData="publicDetailData"></PublicDetail>
                            <WriteArticle v-if="isWrite"  @changePage="changePage"></WriteArticle>
                            <myArticle v-if="isMyArticle" @addMyData="addMyData" @changePage="changePage"></myArticle>
                            <myArticleDetail v-if="isPrivateDetail" @changePage="changePage" :myDetailData="myDetailData"></myArticleDetail>
                            <UpdateArticle v-if="isUpdate"  @changePage="changePage" :myDetailData="myDetailData"></UpdateArticle>
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
import myArticle from './components/myArticle'
import myArticleDetail from './components/myArticleDetail'
import UpdateArticle from './components/UpdateArticle'

export default {
    name: 'App',
    components : {
        Navbar,SideMenu,Home,Login,ReadPublic,PublicDetail,WriteArticle,myArticle,myArticleDetail,UpdateArticle
    },
    data() {
        return {
            isLogin : false,
            isHome : true,
            isPublic : false,
            isPublicDetail : false,
            isWrite : false,
            isMyArticle : false,
            isPrivateDetail : false,
            isUpdate : false,
            user : {
                name : '',
                email : ''
            },
            publicDetailData : '',
            myDetailData: '',
            theme : {
                isDark: false,
                isWhite: true
            }
        } 
    },
    methods : {
        changeTheme(dark,white) {
            this.theme.isDark = dark
            this.theme.isWhite = white
        },
        addMyData(data){
            this.myDetailData = data
        },
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
        changePage(homePage,publicPage,publicDetail,write,myarticle,privateDetail,update) {
            this.isHome = homePage
            this.isPublic = publicPage
            this.isPublicDetail = publicDetail
            this.isWrite = write
            this.isMyArticle = myarticle
            this.isPrivateDetail = privateDetail
            this.isUpdate = update
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
.ql-snow {
  background-color: white !important;
}
* {
    margin: 0;
    padding: 0;
}

.navbar-main{
    border-right: 1px solid white;
    border-bottom: 1px solid white;
}
.navbar-menu {
    border-bottom: 1px solid white;
}

.sidemenu {
    display: flex;
    padding: 20px;
    /* justify-content: center; */
    align-items: center;
    /* background-color: #fff; */
}
.left-menu-dark {
    border-right: 1px solid #b2bec3 !important;
    background-color: #000;
}

.left-menu {
    border-right: 1px solid #b2bec3 !important;
    background-color: #fff;
}

.right-menu {
    background-color: #dcdde1;
    /* margin: 25px !important; */
}
.right-menu-dark {
    background-color: #0a0a0a;
    padding: 25px 0 !important;
}

.right-menu .container {
    margin: 25px !important;
}

.right-menu-dark .container {
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

/* -clock- */
#clock {
	 font-family: 'Share Tech Mono', monospace;
	 
	 text-align: center;
	 /* position: absolute;
	 left: 50%;
	 top: 50%; */
	 /* transform: translate(-50%, -50%); */
	 color: #000;
     font-weight: bold;
	 text-shadow: 0 0 5px white, 0 0 20px rgba(10, 175, 230, 0);
}
 #clock .time {
	 letter-spacing: 0.05em;
	 font-size: 80px;
	 padding: 5px 0;
}
 #clock .date {
	 letter-spacing: 0.1em;
	 font-size: 24px;
}
 #clock .text {
	 letter-spacing: 0.1em;
	 font-size: 12px;
	 padding: 20px 0 0;
}
</style>