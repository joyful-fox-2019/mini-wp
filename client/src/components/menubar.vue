<template>
  <b-menu>
    <b-menu-list label="Menu">
      <b-menu-item icon="account" :label="userLogin"></b-menu-item>
      <b-menu-item @click.prevent="viewcreate" icon="pencil" label="Create Post"></b-menu-item>
    </b-menu-list>
    <b-menu-list label="Actions">
      <b-menu-item label="Logout" @click.prevent="logoutcoy"></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {
  name: 'Menubar',
  data() {
    return {
      isActive: true,
      userLogin: localStorage.getItem('username')
    }
  },
  methods:{
    viewcreate(){
      this.$emit('viewcreateform')
    },
    logoutcoy(){
      this.$emit('backlogout')
    }
  }
}
</script>

<style>
  
</style>