<template>
    <div class="container-fluid h-100">
        <div class="h-40 d-flex flex-column">
            <div class="card" style="width: 14rem; margin: 10px 0px;">
                <img v-bind:src="this.imageUrl" class="card-img-top" alt="Picture Profile">
                <div class="card-body">
                    <h5 class="card-title">Welcome, {{ this.username }} </h5>
                    <p class="card-text">{{ this.email }}</p>
                    <a href="#" class="btn btn-primary">Edit Profile</a>
                </div>
            </div>
        </div>
        <div class="h-50 d-flex mt-4">
            <nav class="nav flex-column">
                <a class="nav-link" href="#" v-on:click="backToHome"><i class="fas fa-home"></i>Home Page</a>
                <a class="nav-link" href="#"><i class="fas fa-user-circle"></i>Profile</a>
                <a class="nav-link" href="#" v-on:click="createArticle"><i class="fas fa-upload"></i>Create Article</a>
                <a class="nav-link" href="#"><i class="fas fa-trash"></i>Trash</a>
            </nav>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            username: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            imageUrl: localStorage.getItem('image')
        }
    },
    methods:{
        createArticle(){
            this.$emit('create-article')
        },
        backToHome(){
            this.$emit('home-page')
        }
    }
}
</script>
<style>
.btn{
    width: 10rem;
}

i{
    width: 30px;
    height: 30px;
}
</style>