<template>
  <div class="sticky-top">
      <!-- gunakan sticky-top untuk navbar -->
        <nav class=" navbar navbar-expand-md navbar-dark bg-dark d-flex justify-content-between h1 p-0">       
            <div class="nav navbar d-flex justify-content-start">
                <div class="">
                    <!-- <img style="cursor: pointer; width : 40px" src="./img/logo.png" alt="">                     -->
                    <span class="navbar-text text-white">Ⓘ-ⓟⓡⓔⓢⓢ</span>
                </div>
            <!-- Ul itu tempat untuk taruh tulisan list -->          
                <!-- <img class="cursor: pointer ml-4" style="cursor: pointer; width : 50px" src="./img/new.png" alt="">           -->
            </div> 
            <ul class="nav justify-content-end navbar-nav">
                <li class="nav-item pr-3">
                    <a @click.prevent="addArticle" class="nav-link" href=""><i class="fa fa-pencil-square-o"></i></a>
                </li>
                <li class="nav-item pr-3">
                    <a class="nav-link" href=""><i class="fa fa-id-badge"></i></a>
                </li>
                <li class="nav-item pr-3">
                    <a @click.prevent='logout' class="nav-link" href=""><i class="fa fa-sign-out"></i></a>
                </li>                              
            </ul>
        </nav>
  </div>
</template>

<script>
export default {
    conmponents : {

    },
    data() {
        return {

        }
    },
    methods : {
        addArticle() {
            console.log('add article')
            this.$emit('add_article')
        },
        logout() {
            console.log('masuk logout')
            this.$emit('log-out')
        }
    }
}
</script>

<style>
.navbar-text {
    font-size: 30px !important
}


</style>