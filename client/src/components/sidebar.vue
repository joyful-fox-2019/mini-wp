<template>
    <div class="sidebar text-center">
        <img src="./line.png" style="width: 100%;" alt="">
        <h4 @click="changePage('public')" style="cursor: pointer;" class="mt-3">NotWordPress</h4>
        <button @click="changePage('public')">Public</button>
        <button @click="changePage('home')">Home</button>
        <button @click="changePage('create')">Write</button>
        <button @click="changePage('profile')">My Profile</button>
    </div>
</template>

<script>
export default {
    name: 'sidebar-component',
    props: ['page'],
    methods: {
        changePage(page){
            this.$emit('changePage', page)
        }
    }
}
</script>

<style>

.sidebar button{
    text-align: left;
    width: 100%;
}

</style>