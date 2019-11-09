<template>
    <div class="sidebar text-center">
        <img src="./line.png" style="width: 100%;" alt="">
        <h4 class="mt-3">NotWordPress</h4>
        <button @click="changePage('home')" target="_blank" >Home</button>
        <button @click="changePage('create')">Write</button>
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

</style>