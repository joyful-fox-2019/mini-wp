<template>
  <div>
      <b-navbar class="is-black">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }" class="navbar-main">
                <img src="../../assets/logo.png" alt="">
                <p>Mini Wordpress</p>
            </b-navbar-item>
        </template>
        <template slot="start" class="nav-right">
            <b-navbar-item href="#">
                Reader
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <!-- before login -->
                    <a class="button is-warning">
                        <strong>Get Started</strong>
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style>

</style>