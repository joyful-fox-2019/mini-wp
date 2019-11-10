<template>
    <b-navbar toggleable="lg" type="dark" variant="info" class="sticky-top">
      <router-link to="/"><b-navbar-brand class="ml-md-4"> <b>Mini Word Press</b></b-navbar-brand></router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto mr-2">
          <b-nav-form @submit.prevent="searchArticleByTag()" class="mt-4 mt-md-0">
            <b-form-input v-model='tag' size="sm" class="mr-sm-2 mb-1" placeholder="Search Article"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            <router-link :to="userid"><b-button size="sm" class="my-2 my-sm-0 ml-2" variant="dark">Admin Panel</b-button></router-link>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
import axios from '../config/getdata'

export default {
  name: 'Navbar',
  data(){
    return{
      userid:`/admin/list-article/${localStorage.getItem('userid')}`,
      tag: ''
    }
  },
  methods:{
    searchArticleByTag(){
      this.$router.push({ path:`/searcbytag/${this.tag}` })
    }
  }
}
</script>

<style>

</style>