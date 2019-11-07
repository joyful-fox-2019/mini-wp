<template>
  <div>
      <b-navbar class="is-black">
        <template slot="brand">
            <b-navbar-item class="navbar-main">
                <img src="../../assets/logo.png" alt="">
                <a href="" style="color:white;" @click.prevent="toHome()">Mini Wordpress</a>
            </b-navbar-item>
        </template>
        <template slot="start" class="nav-right">
            <b-navbar-item href="#" @click.prevent="toRead()">
                Reader
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <!-- before login -->
                    <b-button @click.prevent="toWrite()" type="is-light" outlined>
                        <i class="far fa-file"></i>
                        Write
                    </b-button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
    name: 'Navbar',
    methods : {
        toRead() {
            this.$emit('changePage',false,true,false,false)
        },
        toHome() {
            this.$emit('changePage',true,false,false,false)
        },
        toWrite() {
            this.$emit('changePage',false,false,false,true)
        }
    }
}
</script>

<style>

</style>