<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-custom">
            <a class="navbar-brand" href="/"> <i class="fab fa-wordpress-simple"></i> </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                <a class="nav-link" href="/">
                    Andreas Mini WP
                    <span class="sr-only">(current)</span>
                </a>
                </li>
            </ul>
            <div id="right-navbar">
                <button @click.prevent="addArticle" class="btn btn-outline-success my-2 my-sm-0" type="submit"> <i class="far fa-plus-square"></i> Write </button>
                <div style="font-size: 30px;">
                <a href="#">
                    <i class="far fa-user-circle pl-3"></i>
                </a>
                </div>
                <div>
                <button v-on:click.prevent="logout" class="btn btn-outline-error my-2 my-sm-0" type="submit">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
                </div>
            </div>
            </div>
        </nav>
    </header>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    name: "Navbar",
    methods: {
        logout() {
            localStorage.removeItem('token')
            this.$emit('set-logout')
            Swal.fire({
                icon: 'success',
                title: `Logout Successful`,
                showConfirmButton: false,
                timer: 1500
            })
        },
        addArticle() {
            console.log('masukkkkkk');
            this.$emit('show-add-article-form')
        }
    }
};
</script>

<style>
</style>