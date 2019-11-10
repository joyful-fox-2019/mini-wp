<template>
    <div>
        <form v-on:submit.prevent="createArticle">
            <div class="form-group">
                <label for="exampleInputEmail1">Title</label>
                <input v-model="title" type="text" class="form-control" placeholder="Enter article title">
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Your content here</label>
                <textarea v-model="content" class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
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
import Swal from 'sweetalert2'

export default {
    data(){
        return {
            title: "",
            content: "",
            imageUrl: "",
            baseUrl: "http://localhost:3000"
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
        createArticle(){
            Swal.showLoading()
            axios({
                url: `${this.baseUrl}/articles`,
                method: "POST",
                data:{
                    title: this.title,
                    content: this.content,
                    imageUrl: this.imageUrl
                },
                headers:{
                    access_token: localStorage.getItem('token')
                }
            })
            .then(response => {
                console.log(response)
                Swal.close()
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Success create article!"
                });
                this.$emit('show-article')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
<style scoped>
</style>