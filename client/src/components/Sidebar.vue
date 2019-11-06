<template>
  <aside id="sidebar" class="py-4 w-1/6 bg-gray-800 flex justify-center" style="height: 100vh;">
      <div id="sidebar-container" class="flex-column w-full">
        <div class="w-full p-2 my-4 text-white text-center">LOGO</div>
          <div class="sidebar-menu p-2 bg-gray-800 hover:bg-gray-700 cursor-pointer text-center text-white font-bold" @click="myArticles">Home</div>
          <div class="sidebar-menu p-2 bg-gray-800 hover:bg-gray-700 cursor-pointer text-center text-white font-bold" @click="newArticle">Write New</div>
          <div class="sidebar-menu p-2 bg-gray-800 hover:bg-gray-700 cursor-pointer text-center text-white font-bold" @click="myDrafts">Drafts</div>
      </div>
    </aside>
</template>

<script>
export default {
  methods: {
    myArticles () {
      this.$emit('myArticles')
    },
    newArticle () {
      this.$emit('newArticle')
    },
    myDrafts () {
      this.$emit('myDrafts')
    }
  }
}
</script>

<style>

</style>