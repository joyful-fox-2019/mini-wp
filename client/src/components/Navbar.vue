<template>
  
    <b-navbar toggleable="lg" type="dark" variant="info" class="sticky-top">
      <b-navbar-brand class="ml-4"> <b>Mini Word Press</b> </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto mr-2">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search Article"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            <b-button size="sm" class="my-2 my-sm-0 ml-2" variant="danger">Logout</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  
</template>

<script>
export default {

}
</script>

<style>

</style>