<template>
  <header>
    <div class="container">
      <nav class="navbar navbar-expand-md">
        <a class="navbar-brand" href="#">Mini-Wordpress</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav3" aria-controls="navbarNav3" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav3">
          <ul class="navbar-nav ml-auto">
            <!-- <li class="nav-item">
              <a class="nav-link" href="https://www.froala.com">Home</a>
            </li> -->
          </ul>
          <a v-if="isLogin !== '' " class="btn btn-outline-primary ml-md-3" href="" v-on:click.prevent="signout">Sign Out</a>
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
export default {
  props: ['isLogin'],
  data(){
    return{}
  },
  methods:{
    signout(){
    console.log('masuk function')
    this.$emit('sign-out');
    }
  }
    
}
</script>
<style scoped>
.navbar-brand{
  font-size: 20px;
  color: blue;
}
</style>