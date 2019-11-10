<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light" class="shadow-sm">
      <b-navbar-brand href="#" @click.prevent="toHome()">Sharcle</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>tags</em>
            </template>
            <b-dropdown-item href="#" @click.prevent="toTag('business')">Business</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="toTag('document')">Document</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="toTag('military')">Military</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="toTag('politics')">Politics</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="toTag('health')">Health</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="toTag('technology')">Technology</b-dropdown-item>

          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form> -->

          <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown> -->

          <b-navbar-nav v-if="!isLogin">
            <b-nav-item @click.prevent="login">Login</b-nav-item>
          </b-navbar-nav>
          <b-nav-item-dropdown v-else right>
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item @click.prevent="toAdmin()">Profile</b-dropdown-item>
            <b-dropdown-item @click.prevent="toAdmin('add')">Add Article</b-dropdown-item>
            <b-dropdown-item @click.prevent="logout()">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  methods:{
    toHome(){
      this.$router.push('/')
    },
    toAdmin(page){
      this.$router.push(`/admin?page=${page}`)
    },
    logout() {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      })
      this.$emit('changeLogin', false)
      localStorage.removeItem('token')
      this.$router.push('/') 
    },
    login(){
      this.$router.push('/login')
    },
    toTag(page){
      this.$router.push(`/list/${page}`)
    }
  },
  created(){
    if(localStorage.getItem('token')){
      this.$emit('changeLogin', true)
    }
  },
  props: ['isLogin']
}
</script>

<style>

</style>