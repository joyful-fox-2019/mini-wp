<template>
  <b-navbar
  :fixed-top=fixed
  >
    <template slot="brand">
      <b-navbar-item v-on:click="backHome()">
        <!-- <slot></slot> -->
        <b-icon
            icon="home"
            >
        </b-icon>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item id="search">
        <b-field   id="searchBar">
          <b-input placeholder="Search articles..." type="search" size="is-small" :expanded="expanded" icon="magnify" v-model="search"></b-input>
          <p class="control">
            <b-button class="button" size="is-small" >Search</b-button>
          </p>
        </b-field>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item v-if="!userLogin">
          <p class="control">
            <b-button class="button is-active" size="is-small" @click="loginActive">Sign In</b-button>
          </p>
          <p class="control">
            <b-button class="button is-active" size="is-small" @click="registerActive" >Sign Up</b-button>
          </p>
      </b-navbar-item>
      <b-navbar-item v-if="userLogin">
          <p class="control">
            <b-button class="button is-active" size="is-small" @click="createArticle">Create new article</b-button>
          </p>
      </b-navbar-item>
      <b-modal :active.sync="loginRegisterActive"
                has-modal-card
                trap-focus
                aria-role="dialog"
               
                aria-modal>
          <modal-form  @gotuser="isLoggedIn" :tab="tab"></modal-form>
      </b-modal>
    </template>
  </b-navbar>
</template>

<script>
import ModalForm from '../components/ModalLoginForm'

export default {
  components : {
    ModalForm
  },
  props: ['userLogin','errGithub'],
  name: "navbar",
  data(){
    return {
      expanded : true,
      fixed : true,
      loginRegisterActive: false,
      msgGithub : '',
      tab:'',
      tokenFind : false,
      search: ''
    }
  },
  methods : {
    isLoggedIn(){
      // this.tokenFind = true
      this.$emit('loggedIn')
    },
    loginActive(){
      this.loginRegisterActive = true
      this.tab = 'login'
    },
    registerActive(){
      this.loginRegisterActive = true
      this.tab = 'register'
    },
    createArticle(){
      console.log('change routes')
      if (this.$router.currentRoute.path !== '/addarticle'){
          this.$router.push({path: '/addarticle'})
      }
    },
    backHome(){
      console.log('masuk');
      if (this.$router.currentRoute.name !== 'home'){
          this.$router.push({path: '/'})
      }
    },
    findToken(){
      if(localStorage.getItem('token')){
        this.tokenFind = true
      } else {
        this.tokenFind = false
      }
    }
  },
  watch : {
    errGithub : function(errMessage){
      this.loginRegisterActive = true
      this.msgGithub = errMessage
      console.log(errMessage,'ini errMassge dari navbar')
    },
    search(){
      this.$emit('search',this.search)
    }
  },
  created(){
    this.findToken()
  }
};
</script>

<style>
#nav {
  border: 1px solid black;
}
.navbar-start,
#searchBar,
#search{
  width: 100%;
}
</style>