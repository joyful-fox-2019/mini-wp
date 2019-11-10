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
    props: ['article-id', 'edit-article'],
    data(){
        return {
            baseUrl: "http://localhost:3000",
            titleEdit : editArticle.title,
            contentEdit: editArticle.content,
            imageUrl : ""
        }
    },
    methods:{
        fileUploadHandle(){
            Swal.showLoading({
                text: 'Loading'
            })
            const data = new FormData()
            const image = this.$refs.file.files[0]
            data.append('image', image)
            axios({
                method: 'POST',
                url: `${this.baseUrl}/images/uploadgcs`,
                data,
                headers: {
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data})=> {
                console.log(data)
                this.imageUrl = data.location
                console.log("ini adalah image URL",this.imageUrl)
                Swal.close()
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Image upload success!"
                });
            })
            .catch(err=>console.log(err))
        },
        editArticle(){
            axios({
                url: `${this.baseUrl}/articles/${editArticle._id}`,

            })
        }
    },
    created(){

    }
}
</script>
<style scoped>

</style>