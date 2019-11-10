<template>
  <b-list-group>
    <b-list-group-item @click="gotoArticleList(userid)" class="text-primary">List Article</b-list-group-item>
    <router-link to="/admin/create-article"><b-list-group-item>Create Article</b-list-group-item></router-link>
    <b-list-group-item disabled>Edit Profile</b-list-group-item>
    <b-list-group-item disabled>Tag List</b-list-group-item>
    <b-list-group-item disabled>Settings</b-list-group-item>
    <GoogleLogin class="btn-primary btn btn-danger mt-3" :params="params" @click.native="logout()" :logoutButton="true">Logout</GoogleLogin>
  </b-list-group>
</template>

<script>
import GoogleLogin from 'vue-google-login'

export default {
  name: 'Menu',
  components:{
    GoogleLogin
  },
  methods:{
    logout(){
      console.log("masuk")
      localStorage.clear()
      this.$router.push({ path:'/login' })
      this.successToast("Logout successfully!")
    },
    gotoArticleList(_id) {
      this.$router.push({ path: `/admin/list-article/${_id}`});
    }
  },
  data(){
    return{
      params: {
        client_id: "151458736537-l3u555emh5kpm6ddo8bteqakclqhgbhe.apps.googleusercontent.com"
      },
      userid: localStorage.getItem('userid')
    }
  }
}
</script>

<style>

</style>