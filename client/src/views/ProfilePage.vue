<template>
  <div id="profile-page" class="inside-main-container">
    <div class="row">
      <h5 class="center">My Profile</h5>
      <div class="col s12">
        <img 
          v-if="user.picture" 
          class="gravatar-big" 
          :src="user.picture" 
          alt="user-picture"/>
        <img 
          v-else="" 
          class="gravatar-big" 
          src="../assets/undraw_jason_mask_t07o.svg" 
          alt="user-picture"/>
      </div>
      <div class="center col s12">
        <button
          class="sign-out-button row btn waves-effect waves-light"
          @click="$parent.$emit('sign-out')">
          Sign out
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import NavbarWithToken from '../components/NavbarWithToken'
import axios from 'axios'

export default {
  name: 'profile-page',
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser: function() {
      const access_token = localStorage.getItem("access_token")
      axios({
        method: 'get',
        url: process.env.HOST_SERVER + '/users/user',
        headers: {
          access_token
        }
      })
        .then(({data}) => {
            this.user = data
            console.log(this.user)
          })
        .catch(err => {
          M.toast({ html: err.message })
        })
    }
  },
  components: {
    NavbarWithToken
  },
}
</script>

<style scoped>
  .col {
    margin: 50px 0;
  }
</style>