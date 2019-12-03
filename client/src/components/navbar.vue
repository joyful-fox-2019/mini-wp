<template>
    <b-navbar class="is-info">
    <template slot="brand">
        <b-navbar-item @click.prevent="comeback">
            <img
                src="../../assets/B.png"
                alt=""
            >HOME
        </b-navbar-item>
    </template>

    <template slot="end">
        <b-navbar-item tag="div" icon="account">
            <img
                src="../../assets/person.png"
                alt="">
            {{ userlogin }}
        </b-navbar-item>
    </template>
    </b-navbar>
</template>

<script>
export default {
    name: 'Navbar',
    data(){
    return{
        userlogin: localStorage.getItem('username')
        }
    },
    methods: {
        comeback(){
            this.$emit('tohome')
        }
    }

}
</script>

<style>

</style>