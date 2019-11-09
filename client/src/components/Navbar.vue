<template>
  <nav id="navbar" class="bg-gray-200 shadow-lg flex items-center justify-between w-full" style="height: 10vh;">
    <div class="w-1/4 mx-10">
    <form @submit.prevent="search">
      <input v-model="keyword" type="search" style="border: none; border-bottom: 0.6px rgb(165, 165, 165) solid; background: transparent; outline: none;" class="p-2 w-full" placeholder="Search...">
    </form>
    </div>
    <div id="logout-btn" class="mx-10 flex justify-end">
      <i class="fas fa-door-open cursor-pointer hover:text-red-500 text-lg" @click="logout"></i>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    logout () {
      this.$emit('logout')
    },
    search () {
      this.$emit('search', { keyword: this.keyword })
    },
    emptyInput () {
      this.keyword = ''
    }
  },
  watch: {
    // keyword () {
    //   this.search()
    // } 
  }
}
</script>

<style>

</style>