<template>
    <nav class="public-nav d-flex justify-content-between align-items-center">
        <div>
            <h3 @click="changePage('public')">NotWordPress</h3>
        </div>

        <div class="search d-flex align-items-center">
            <!-- <i class="fas fa-search"></i>
            <form @submit.prevent="search" action="">
                <input type="text" placeholder="Search">
                <input class="search-btn" type="submit" value="search">
            </form> -->
        </div>
        <div v-if="!islogin">
            <button @click="changePage('login')" class="btn btn-primary">Login</button>
            <button @click="changePage('register')" class="register-btn text-primary">Register</button>
        </div>
        <div v-else>
            <button @click="changePage('home')" class="btn btn-primary">My Account</button>
        </div>
  </nav>
</template>

<script>
export default {
    name: 'public-navbar',
    props: ['islogin'],
    methods: {
        changePage(page){
            this.$emit('changePage', page)
        },
        search(){
            this.$emit('changePage', 'public')
        }
    }
}
</script>
    
<style>

/* nav bar */

.public-nav{
  width: 100%;
  height: 60px;
  border-bottom: 1px solid gray;
  padding: 0 30px;
}

.register-btn{
  border: none;
  outline: none;
  background: none;
  font-weight: 600;
}

.public-nav h3 {
    font-family: 'Righteous', cursive;
    text-align: center;
    color: rgb(61, 61, 61);
    cursor: pointer;
}

</style>