<template>
        <!-- navbar top-->
      <nav class="navbar navbar-expand-lg navbar-light bg-warning fixed-top">
          <div class="container">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <button v-on:click.prevent="showhome()" type="button" class="btn bg-warning" ><i class="fa fa-wordpress" style="font-size: 24px;"></i> Dev Press</button>
                </li>
                <li class="nav-item">
                    <button type="button" class="btn bg-warning" ><i class="fa fa-newspaper-o" style="font-size: 24px;"></i> Reader</button>
                </li>
              </ul>
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                      <button v-on:click.prevent="showaddpage()" type="button" class="btn btn-light" ><i class="fa fa-edit" style="font-size: 24px;"></i> Write</button>
                  </li>
                  <li class="nav-item">
                          <a class="nav-link" href="#"><i class="fa fa-user-circle-o" style="font-size: 24px;"></i></a>
                  </li>
                  <li class="nav-item">
                          <a class="nav-link" href="#"><i class="fa fa-bell" style="font-size: 24px;"></i></a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#" v-on:click.prevent="logout()"><i class="fa fa-sign-out" style="font-size: 24px;"></i></a>
                  </li>
                </ul>
              </div>
        </nav> 

</template>

<script>
export default {
    name : 'navbar',
    data() {
        return {
        }
    },
    methods : {
        logout() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(() => {
                this.$emit('waslogout')

            })
            localStorage.clear()
            console.log('masuk logout')
        },
        showaddpage() {
            this.$emit('showaddpage')
        },
        showhome() {
            this.$emit('showhome')
        }
    }
}
</script>

<style>

</style>