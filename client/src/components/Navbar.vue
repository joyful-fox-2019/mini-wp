<template>
  <b-navbar class="is-primary">
    <template slot="brand">
      <b-navbar-item>
        <img
          src="../../img/logo.png"
          alt="GGWP"
          style="width: 100%;"
        >
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item @click="changePage('personal')">
        <h1>
          {{ name }}
        </h1>
      </b-navbar-item>
      <b-navbar-item @click="changePage('reader')">
        <h1>
          Reader
        </h1>
      </b-navbar-item>
      <!-- <b-navbar-dropdown label="Info">
        <b-navbar-item href="#">
          About
        </b-navbar-item>
        <b-navbar-item href="#">
          Contact
        </b-navbar-item>
      </b-navbar-dropdown> -->
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-light" @click="changePage('create')">
            <i class="far fa-edit"></i>Write
          </a>
          <a class="button is-primary" @click="logout()">
            <strong>Logout</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 1500
})

export default {
  nama: 'Navbar',
  data(){
    return {
      name: ''
    }
  },
  methods: {
    logout(){
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut()
        .then(() => {
          // console.log('Google Signed Out.');
          localStorage.clear()
          this.$emit('isLoginStatus', false)
          Toast.fire({
            icon: 'success',
            title: 'Logout successfully'
          })
        })
        .catch(() => {
					Swal.fire({
            icon: 'error',
            title: 'Sorry,',
            text: 'Logout failed'
          })
        })
    },
    changePage(page){
      this.$emit('changePage', page)
    }
  },
  created(){
    if(localStorage.getItem('name')){
      this.name = localStorage.getItem('name')
    }
  }
}
</script>

<style scoped>

</style>