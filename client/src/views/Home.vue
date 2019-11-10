<template>
  <div>
     <b-message type="is-danger" size="is-small" has-icon :auto-close="isActive" :duration="err.duration" :active.sync="isActive">
        {{ err.message }}
      </b-message>
      <Navbar :userLogin="userLogin" @loggedIn="isLogin" @search="searchQuery">
    <h3>{{ myName }}</h3>
  </Navbar>
  <div id="mainContent">
    <Sidebar id="test" :userLogin="userLogin" @logout="userLogout" @tag="articleByTag"></Sidebar>
    <Content :tag="tags" @removeTagSearch="removeTag" :query="query"></Content>
  </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue' 
import Sidebar from '../components/Sidebar.vue'
import Content from '../components/Content.vue'

export default {
components:{
    Navbar,
    Sidebar,
    Content
  },
  data(){
    return {
      myName : 'Dynamic username',
      userLogin : false,
      err : {
        message: '',
        duration: 5000
      },
      isActive : false,
      tags : [],
      query : ''
    }
  },
  methods : {
    isLogin(){
      
      let token = localStorage.getItem('token')
      if(token){
        this.userLogin = true
      } else {
        this.userLogin = false
      }
    },
    userLogout(){
      localStorage.clear()
      this.userLogin = false
    },
    redirectGithub(){
      if(window.location.search){
        const query = window.location.search.substring(1)
        const position = query.search("msg")
        if (position === -1){
          const token = query.split('token=')[1].split('&')[0]
          localStorage.setItem('token',token)
          window.location = 'https://myminiwp.nadhiljanitra.xyz'
          this.$buefy.toast.open({
                    message: 'Welcome!',
                    type: 'is-success'
                })
        } else {
          const msg = query.split('msg=')[1].split('%27')[1].split('%20').join(' ')
          window.location = 'https://myminiwp.nadhiljanitra.xyz'
          localStorage.setItem('msg',msg)
        }
      }
    },
    articleByTag(tag){
        let flag = true
        for (let i = 0; i< this.tags.length ; i++){
          if(this.tags[i] === tag){
            flag = false
          }
        }
        if(flag){
          this.tags.push(tag)
        }
    },
    showErr(){
      let message = localStorage.getItem('msg')
      if(message){
        this.err.message = message
        this.isActive = true
        setTimeout(()=>{
          localStorage.removeItem('msg')
        },5200)
      }
    },
    removeTag(tag){
      let index = this.tags.indexOf(tag)
      this.tags.splice(index,1)
    },
    searchQuery(search){
      this.query = search
    }
  },
  created(){
    this.isLogin()
    this.redirectGithub()
    this.showErr()
  }
}
</script>

<style>
#mainContent{
  display: flex;
  flex-direction: row
}
</style>