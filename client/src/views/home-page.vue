<template>
    <div class="body-container d-flex flex-wrap justify-content-center align-items-start">
        <articleCard @changePage="$emit('changePage', $event)" @articleId="$emit('articleId', $event)"  @searchByTag="$emit('searchByTag', $event)" v-for="article in articles" :key="article._id" :article-item="article"></articleCard>
    </div>
</template>

<script>
import axios from '../config/axios'
import articleCard from '../components/article-card'

export default {
    name: 'home-page',
    components: {
        articleCard
    },
    props: ['page', 'articles'],
    data(){
        return {
            
        }
    }
}
</script>

<style>

.home-container{
    width: 100%;
    height: 100vh;
}

.sidebar{
    width: 18%;
    height: 100vh;
    background-color: rgb(255, 255, 255);
    padding: 10px;
    border: 10px solid whitesmoke;
    border-bottom: none;
}

.sidebar h4 {
    font-family: 'Righteous', cursive;
    text-align: center;
    color: rgb(61, 61, 61);
}

.sidebar button{
    color: rgb(29, 29, 29);
    width: 80%;
    border: none;
    margin: 5px 0;
    padding: 5px 15px;
    transition: 300ms;
    border-radius: 15px ;
    font-family: 'Poppins', sans-serif;
    background-color: rgba(255, 255, 255, 0);
    outline: none;
}

.sidebar button:hover{
    color: rgb(255, 255, 255);
    background-color: rgb(77, 77, 77);
}

.page-container{
    width: 85%;
    height: 100vh;
    background-color: whitesmoke;
}

.navbar{
    width: 100%;
    height: 12vh;
    background-color: white;
    box-shadow: 2px 20px 10px -18px rgba(0, 0, 0, 0.123);
}

.search input:first-child{
    width: 250px;
    border: none;
    background-color: #F1F3FA;
    font-family: 'Poppins', sans-serif;
    padding: 5px 10px;
    outline: none;
}

.search i{
    background-color: #F1F3FA;
    padding: 9px 0 9px 9px;
    color: rgba(0, 0, 0, 0.219);
}

.search .search-btn{
    margin: 10px 0;
    border: none;
    padding: 5px 10px;
    color: white;
    outline: none;
    background-color: rgba(187, 12, 231, 0.404);
    box-shadow: 10px 10px 38px -9px rgba(240,118,240,1);
}

.search .search-btn:hover{
    background-color: rgba(126, 10, 155, 0.404);
}

.body-container{
    width: 100%;
    height: 88vh;
    padding: 20px;
    overflow: auto;
}

.article-card{
    min-height: 300px;
    min-width: 320px;
    background-color: white;
    border-radius: 5px;
    margin: 10px;
    box-shadow: 2px 2px 9px 0px rgba(0,0,0,0.27);
}

.article-card img{
    width: 320px;
    height: auto;
    border-radius: 5px;
}

.article-card p{
    width: 310px;
    margin: 5px;
    font-family: 'Poppins', sans-serif;
}

.article-card .timestap {
    margin: 5px;
    font-size: 10px;
}

.article-card h5 {
    width: 310px;
    margin: 5px;
    /* color: white; */
    font-family: 'Poppins', sans-serif;
}

.article-card-tag{
    padding: 5px;
}

.article-card-tag span{
    color: white;
    cursor: pointer;
    padding: 2px 8px;
    border-radius: 15px;
    display: inline-block;
    margin: 5px;
    background-color: rgba(187, 12, 231, 0.404);
    box-shadow: 10px 10px 38px -9px rgba(240,118,240,1);
}

.article-card-tag span:hover{
    background-color: rgba(187, 12, 231, 0.719);
}

/* width */
::-webkit-scrollbar {
    width: 5px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #ffff; 
  }
   
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #0069ff;
    border-radius: 15px;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
</style>