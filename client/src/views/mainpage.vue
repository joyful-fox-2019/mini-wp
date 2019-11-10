<template>
<div>
    
        <navbar></navbar>
        <section class="main-content columns is-fullheight">

        <sidebar></sidebar>
        <contentpage></contentpage>

        </section>

</div>
   

</template>

<script>

import sidebar from '../components/sidebar'
import navbar from '../components/navbar'
import contentpage from '../components/contentpage'


export default {
    name : 'main-page',
    data(){
        return {


        }
    },
    components:{

        sidebar,
        navbar,
        contentpage

    },
    methods: {

    }

}

</script>

<style>

.main-content{
    background-color: rgb(247, 247, 247);
    height:100vh;
}

</style>