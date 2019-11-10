<template>
    <div>
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Title</label>
                <input v-model="title" type="text" class="form-control" placeholder="Enter article title">
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Your content here</label>
                <textarea v-model="content" class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
            </div>
            <div>
                <input v-model="date" type="date">
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

export default {
    data(){
        return {
            title: "",
            content: "",
            date: "",
            imageUrl: ""

        }
    },
    methods:{
        fileUploadHandle(){
            this.imageUrl = this.$refs.file.files[0]
        }
    }
}
</script>
<style scoped>
</style>