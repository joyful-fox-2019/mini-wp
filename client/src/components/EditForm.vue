<template>
    <div>
        <form v-on:submit.prevent="editArticle">
            <div class="form-group">
                <label for="title">Title</label>
                <input v-model="titleEdit" type="text" class="form-control" placeholder="Enter article title">
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Your content here</label>
                <textarea v-model="contentEdit" class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
            </div>
            <div class="form-group">
                <label for="exampleFormControlFile1">Input your article image</label>
                <input v-on:change="fileUploadHandle" type="file" ref="file" class="form-control-file" id="exampleFormControlFile1">
            </div>
            <button type="submit" class="btn btn-primary">Create</button>
        </form>
    </div>
</template>
<script>

import axios from 'axios'

export default {
    props: ['article-id'],
    data(){
        return {
            baseUrl: "http://localhost:3000"
        }
    },
    methods:{
        editArticle(){

        }
    },
    created(){
        
    }
}
</script>
<style scoped>

</style>